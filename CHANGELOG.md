Craigfowler's fork has been merged which brings some changes in how we should use SVGmagic. Below you can find a list of all changes.

###V2.3.2 > V2.4.0
    New features: 
        - Add extra post data to the ajax request
        - Now also finds data:image SVGs
        
    New options:
        - temporaryHoldingImage:    replacement for preloader
        - forceReplacements:        replacement for testmode
        - handleBackgroundImages:   replacement for backgroundimage
        - additionalRequestData:    send extra data to the server that replaces the SVGs for PNGs
        - postReplacementCallback:  callback function that will be executed before replacement
        - remoteServerUri:          the URI of the remote server that converts the images to PNG
        - remoteRequestType:        set the type of the ajax request (post/get)
        - remoteDataType:           the datatype sent to and received from the remote server
        
    Deprecated options:
        - preloader         > temporaryHoldingImage
        - testmode          > forceReplacements
        - backgroundimage   > handleBackgroundImages
        - secure            > additionalRequestData
        - callback          > postReplacementCallback
        - dumpcache         > additionalRequestData
        
Read the README or comment in the source file for more information about the new options/functionalities