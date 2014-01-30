<?php

    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    
    $inputimages = ($_REQUEST["svgsources"]);
    $dumpcache = ($_REQUEST["dumpcache"]);
    $urlprefix   = ($_REQUEST["secure"] == 'false') ? 'http://' : 'https://';
    $result      = array(
        'error' => '1',
        'errormsg' => 'No images given'
    );
    
    if (isset($inputimages) && is_array($inputimages)) {
        
        // Create empty array with images to return
        $imageurls = array();
        
        // Loop through given image urls
        foreach ($inputimages as $input) {
            
            // Get the file name
            $filename = explode('/', $input);
            $filename = array_pop($filename);
            $filename = str_replace('.svg', '', $filename);
            
            // Check the domain and create a folder if needed
            $url    = parse_url($input);
            $domain = $url['host'];
            
            if (!file_exists("images/results/" . $domain)) {
                mkdir("images/results/" . $domain, 0777);
            }
            
            $imagefolder = "images/results/" . $domain;
            
            // Check if we need to dump the cache
            if($dumpcache == "true"){
                if(file_exists($imagefolder . '/'.$filename.'.png')){
                    unlink($imagefolder . '/'.$filename.'.png');
                }
            }

            // Check if the file already exists
            if (!file_exists($imagefolder . '/' . $filename . '.png')) {
                // Get the image
                $inputimage = file_get_contents($input);
                
                // Convert the given image to PNG and store it in the custom directory
                $image = new Imagick();
                $image->setBackgroundColor(new ImagickPixel('transparent'));
                $image->readImageBlob(($inputimage));
                $image->setImageFormat("png32");
                $image->setImageCompressionQuality(100);
                $image->writeImage($imagefolder . '/' . $filename . '.png');
            }
            
            $imageurls[] = array(
                'url' => $urlprefix . "bitlabs.nl/svgmagic/" . $imagefolder . '/' . $filename . '.png'
            );
        }
        
        $result = array(
            'results' => $imageurls,
            'error' => '0'
        );
    }
    echo $_GET['callback'] . '(' . json_encode($result) . ')';
?>
