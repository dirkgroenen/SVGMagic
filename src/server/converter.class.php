<?php 
/*  The converter.php script can be used on your own server to create .png images from the .svg images parsed by 
    the client script.
    
    Copyright © 2013-2014 - Authors:
    
    * Dirk Groenen [Bitlabs Development - dirk@bitlabs.nl]            Original author

    Version 3.0.0
    
    ---

    Copyright 2013-2014 Dirk Groenen

	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at

		http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.
*/

class Converter {

    private $origin;
    private $rootdirectory = "../../images/results";
    private $sitedirectory;
    private $publicurl;
    private $imageurls;
    private $domain;
    private $response;
    private $version;

    /*
     * Constructor to set the source
     *
     * @param String $origin 
     * @param Array  $imageurls
     * @param String $domain
     * #param Int   $version
     */
    public function __construct($origin, $imageurls, $domain, $version) 
    {
        $this->origin = $origin;
        $this->imageurls = $imageurls;
        $this->domain = $domain;
        $this->version = $version;

        // Setup default response
        $this->response = array("error" => false, "msg" => "Images succesfully converted", "images" => array());

        $this->initialize(); // Initialize site directory
    }

    /*
     * Initialize the (new) site before converting the images 
     */
    private function initialize() 
    {
        // Set site directory 
        $this->sitedirectory = $this->rootdirectory . "/" . $this->origin;

        // Check if file exists. If not: create directory
        if(!file_exists($this->rootdirectory . "/" . $this->origin)){
            mkdir($this->sitedirectory, 0777);
        }

        $this->publicurl = $this->domain . "/images/results/" . $this->origin;
    }

    /*
     * Start the image conversion
     */
    public function start($dumpcache)
    {
        // Loop through all the images and add the response to the global response
        foreach($this->imageurls as $srcimage){
            $image = $this->convert($srcimage, $dumpcache);

            // Check if response contains an error
            if($image["error"]){
                $this->response["error"] = true;
                $this->response["msg"] = "Not all images have been converted.";
            }

            // Add response to array
            if($this->version >= 3)
                $this->response["images"][] = $image;
            else
                $this->response["results"][] = array("url" => $image["image"]);
        }

        return $this->response;
    }


    /*
     * Start the image conversion
     * @param String $image
     * @param boolean $force
     * @return Array response
     */
    private function convert($srcimage, $force)
    {
        $response = array("image" => $srcimage, "error" => false, "msg" => "Image converted succesfully");

        // Check if image is datauri or url
        if(preg_match("/^data:image\/svg\+xml/", $srcimage) == 1){
            $response["type"]       = "datauri";
            $filename               = md5($srcimage);
            $response["filename"]   = $filename;

            // Prepare the new $srcimage and secode
            $srcimage = str_replace("data:image/svg+xml;base64,", "", $srcimage);
            $srcimage = base64_decode($srcimage);
        }
        else{
            $response["type"] = "url";

            // Get the filename from the url
            $filename = explode('/', $srcimage);
            $filename = array_pop($filename);
            $filename = str_replace('.svg' ,'' , $filename);

            $response["filename"] = $filename;
        }

        // Check if file already exists
        if(file_exists($this->sitedirectory . '/' . $filename . '.png') && $force != "true"){
            $lastmodified = filemtime($this->sitedirectory . '/' . $filename . '.png');

            $response["image"] = $this->publicurl . "/" . $filename . ".png";
            $response["msg"] = "Image retrieved from cache. Saved at: " . date("Y-m-d H:i:s", $lastmodified);
            return $response;  // Kill and return response
        }
        
        // Check if we can reach the provided URL
        // return the response when the image can't be reached
        if($response["type"] == "url"){
            $check = $this->checksrcurl($srcimage);
            
            if($check > 300 || $check == false){
                $response["error"]  = true;
                $response["msg"]    = "Couldn't download image from provided URL";

                return $response;  // Kill and return response
            }
        }

        // download the image if given srcimage is an url
        if($response["type"] == "url")
            $srcimage = file_get_contents($srcimage);

        // Convert $srcimage to PNG
        try{
            $desimage = new Imagick();
            $desimage->setBackgroundColor(new ImagickPixel('transparent'));
            $desimage->readImageBlob( $srcimage );
            $desimage->setImageFormat("png32");
            $desimage->setImageCompressionQuality(100);

            // Remove if dumpcache is enabled
            if($force && file_exists($this->sitedirectory . '/' . $filename . '.png'))
                unlink($this->sitedirectory . '/' . $filename . '.png');

            // Save the file
            file_put_contents($this->sitedirectory . '/' . $filename . '.png', $desimage);

            // Set the URL where the PNG can be viewed from
            $response["image"] = $this->publicurl . "/" . $filename . ".png";
        }
        catch(ImagickException $e){
            $response["error"]  = true;
            $response["msg"]    = $e->getMessage();
        }
        
        // Return response
        return $response;
    }

    /*
     * Return the response code for the give URL. Returns false if url is not available.
     *
     * @param string url
     * @return mixed responsecode
     */
    private function checksrcurl($url) 
    {
        $headers = get_headers($url);
        return substr($headers[0], 9, 3);
    }
    
}

?>