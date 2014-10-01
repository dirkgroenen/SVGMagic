<?php
	header('Content-Type: application/json');
	header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
    header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
    header('Access-Control-Max-Age: 1000');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

    $inputimages = ($_REQUEST["svgsources"]);
    $dumpcache = ($_REQUEST["dumpcache"]);
    $urlprefix = ($_REQUEST["secure"] == 'false') ? 'http://' : 'https://';
	$result = array('error' => '1', 'errormsg' => 'No images given');

	if(isset($inputimages) && is_array($inputimages)){

		// Create empty array with images to return
		$imageurls = array();

        $error = 0;
		// Loop through given image urls
		foreach($inputimages as $input){
            $datauri = false;
            
            // Check if the file is a datauri
            if(preg_match("/^data:image\/svg\+xml/", $input) == 1){
                $datauri = true;
                $filename = (rand(1,1000) * time()) . ".datauri.svg";
            }
            else{
                // Get the file name from the input
                $filename = explode('/',$input);
                $filename = array_pop($filename);
                $filename = str_replace('.svg' ,'' , $filename);
            }
			
			// Create folder
            if($datauri){
                // Create folder for datauris if it doesn't exist yet
                if(!file_exists("images/results/datauris")){
                    mkdir("images/results/datauris", 0777);
                }
                $imagefolder = "images/results/datauris";
            }
            else{
                // Check the domain and create a folder if needed
                $url = parse_url($input);
                $domain = $url['host'];
                if(!file_exists("images/results/" . $domain)){
                    mkdir("images/results/" . $domain, 0777);
                }
                $imagefolder = "images/results/" . $domain;

                // Check if we need to dump the cache
                if($dumpcache == "true"){
                    if(file_exists($imagefolder . '/'.$filename.'.png')){
                        unlink($imagefolder . '/'.$filename.'.png');
                    }
                }
            }

			// Check if the file already exists
			if(!file_exists($imagefolder . '/'.$filename.'.png') || $datauri){
                
				// Get the image
                if(get_http_response_code($input) != "404" || $datauri){
                    $inputimage = file_get_contents($input);
                    convertImage($inputimage, $imagefolder, $filename);
                }
                
			}
            
            $imageurls[] = array('url'	=> $urlprefix."bitlabs.nl/svgmagic/" . $imagefolder . '/'.$filename.'.png');

		}

		$result = array('results' => $imageurls, 'error' => $error);
	}

	// Return the images, since version 2.3 we use cross-domain requests via post, so the callback has been removed
	if(isset($_GET['callback'])){
		echo $_GET['callback'] . '('. json_encode($result) . ')';
	}
	else{
		echo json_encode($result);
	}
    
    function get_http_response_code($url) {
        $headers = get_headers($url);
        return substr($headers[0], 9, 3);
    }
	
    function convertImage($inputimage, $imagefolder, $filename){
        // Convert the given image to PNG and store it in the custom directory
        $image = new Imagick();
        $image->setBackgroundColor(new ImagickPixel('transparent'));
        $image->readImageBlob( $inputimage );
        $image->setImageFormat("png32");
        $image->setImageCompressionQuality(100);
        //$image->writeImage($imagefolder . '/'.$filename.'.png');                    
        file_put_contents($imagefolder . '/'.$filename.'.png', $image); 
    }
?>
