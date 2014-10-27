<?php 
/*  The converter.php script can be used on your own server to create .png images from the .svg images parsed by 
    the client script.
    
    Copyright © 2013-2014 - Authors:
    
    * Dirk Groenen [Bitlabs Development - dirk@bitlabs.nl]            Original author

    Version 2.5
    
    ---

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
?>
<?php 
    /*
     * Require the converter class
    */
    require_once("converter.class.php");

    /* 
     * Set correct headers for the requests 
     */
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
    header('Access-Control-Allow-Methods: GET, POST');
    header('Access-Control-Max-Age: 1000');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

    /* 
     * Get the HTTP vars
     */
    $svgsources = (isset($_REQUEST["svgsources"])) ? $_REQUEST["svgsources"] : null;
    $dumpcache = (isset($_REQUEST["dumpcache"])) ? $_REQUEST["dumpcache"] : false;
    $serverdomain = ($_REQUEST["secure"] == 'false') ? 'http://bitlabs.nl/svgmagic' : 'https://bitlabs.nl/svgmagic';
    $version = (!isset($_REQUEST["version"])) ? 2.4 : $_REQUEST["version"];
    $origin = (isset($_REQUEST["origin"])) ? isset($_REQUEST["origin"]) : "undefined";

    /* 
     * Init converter 
     */
    $converter = new Converter($origin, $svgsources, $serverdomain, $version);
    $result = $converter->start($dumpcache);

    /*
     * Set status code if needed
     */
    if($result["error"] == true)
        http_response_code(413);

    /*
     * Show results
     * Wrap the $result in a callback if provided
     */
    if(isset($_GET['callback']))
        echo $_GET['callback'] . '('. json_encode($result) . ')';
    else
        echo json_encode($result);

?>