/*
 *  MobileViewportClass used for comparing screen ratio to scene ratio currently
 */


function MobileViewportClass()
{
    var _screenWidth = $(window).width();
    var _screenHeight = $(window).height();
    var _screenRatio = _screenWidth / _screenHeight;
    var _sceneRatio = 2100 / 1080;
    var _backgroundSizePercentage;
    this.ApplyBestFit = ApplyBestFit;

    function WorkoutBestFit()
    {
        if( _screenRatio > _sceneRatio )
        {
            _backgroundSizePercentage = (_screenWidth / 2100) * 100 * window.devicePixelRatio;
            // adjust width and work out auto height
            return "set width";
        }
        else
        {
            _backgroundSizePercentage = (_screenHeight / 1080) * 100 * window.devicePixelRatio;
            // adjust height and work out auto width
            return "set height";
        }    
    }
    
    function ApplyBestFit( element )
    {
        var instruction = WorkoutBestFit();
        var elem = $( element );
       
        if(instruction == "set width")
        {
            ApplyCSS("/* Setting Width */"+ 
                    ".scene li, .container {" +
                    "width: "+_screenWidth+"px !important;" +
                    "height: "+( _screenWidth / _sceneRatio )+"px !important;" +
                    "margin-top: "+-( _screenWidth / _sceneRatio ) / 2+"px !important;" +
                    "margin-left: "+-_screenWidth / 2+"px !important;" +
                "}" +
                
                ".scene li img.level {" +
                    "width: 100% !important;" +
                    "height: auto !important;" +
                "}" +
                
                "#main-ui {" +
                    "min-height: 0;" +
                    "min-width: 0;" +
                    "height: "+( _screenWidth / _sceneRatio )+"px !important;" +
                    "width: "+_screenWidth+"px !important;" +
                "}"+

                ".dynamic-background {" +
                    "background-size: "+_backgroundSizePercentage + "px" +
                "}" +

                ".dynamic-size {" +
                    "-webkit-transform: scale( "+_backgroundSizePercentage/100+" ) translate(-"+ (100-_backgroundSizePercentage)/2 +"%,-"+ (100-_backgroundSizePercentage)/2 +"%);" +
                    "-moz-transform: scale( "+_backgroundSizePercentage/100+" ) translate(-"+ (100-_backgroundSizePercentage)/2 +"%,-"+ (100-_backgroundSizePercentage)/2 +"%);" +
                    "transform: scale( "+_backgroundSizePercentage/100+" ) translate(-"+ (100-_backgroundSizePercentage)/2 +"%,-"+ (100-_backgroundSizePercentage)/2 +"%);" +
                "}" 

                // add new css here

                );
        }

        else if(instruction == "set height")
        {
            ApplyCSS( "/* Setting Height */"+
                    ".scene li, .container {" +
                    "width: "+( _sceneRatio * _screenHeight )+"px !important;" +
                    "height: "+_screenHeight+"px !important;" +
                    "margin-top: "+-_screenHeight / 2+"px !important;" +
                    "margin-left: "+-( _sceneRatio * _screenHeight ) / 2+"px !important;" +
                "}" +
                
                ".scene li img.level {" +
                    "width: auto !important;" +
                    "height: 100% !important;" +
                "}" +
                
                "#main-ui {" +
                    "min-height: 0 !important;" +
                    "min-width: 0 !important;" +
                    "height: "+_screenHeight+"px !important;" +
                    "width: "+( _sceneRatio * _screenHeight )+"px !important;" +
                "}" +

                ".dynamic-background {" +
                    "background-size: "+_backgroundSizePercentage + "px" +
                "}" +

                ".dynamic-size {" +
                    "-webkit-transform: scale( "+_backgroundSizePercentage/100+" ) translate(-"+ (100-_backgroundSizePercentage)/2 +"%,-"+ (100-_backgroundSizePercentage)/2 +"%);" +
                    "-moz-transform: scale( "+_backgroundSizePercentage/100+" ) translate(-"+ (100-_backgroundSizePercentage)/2 +"%,-"+ (100-_backgroundSizePercentage)/2 +"%);" +
                    "transform: scale( "+_backgroundSizePercentage/100+" ) translate(-"+ (100-_backgroundSizePercentage)/2 +"%,-"+ (100-_backgroundSizePercentage)/2 +"%);" +
                "}" 

                );
        }

    }
    
    function ApplyCSS( css )
    {
        head = document.getElementsByTagName('head')[0],
        style = document.createElement('style');
    
        style.type = 'text/css';
        if (style.styleSheet){
          style.styleSheet.cssText = css;
        } else {
          style.appendChild(document.createTextNode(css));
        }
        
        head.appendChild(style);   
    }

}