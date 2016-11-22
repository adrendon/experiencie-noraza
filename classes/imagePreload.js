
/*
 *	Image Preload Class
 */
 
function ImagePreloadClass()
{
	var inst = this;
	inst._imageArray = new Array();
	var _images;
	var _loadPercentage = 0;
	var _loadingCallback = function(){};
	var _loadedCallback = function(){};
    this.Preload = Preload;
    this.SetImageArray = SetImageArray;
    this.SetLoadPercentage = SetLoadPercentage;
	this.GetLoadPercentage = GetLoadPercentage;
	this.SetLoadingCallback = SetLoadingCallback;
	this.SetLoadedCallback = SetLoadedCallback;

    function Preload()
    {              
        function loaded()
        {
            _loadPercentage = 100 / inst._imageArray.length*(index);
            
            _loadingCallback();
            
            var i = ~~(inst._imageArray.length-1);
            
            if( index == i )
            {
                _loadPercentage = 100;
                _loadingCallback();
                _loadedCallback();
                inst._imageArray = null;
                _images = null;
            }
        }
        
        if(inst._imageArray != "" && inst._imageArray != undefined && inst._imageArray != null)
        {
        	SetImageArray( inst._imageArray );
        	
            var index = 0;
            _images = new Array();
            
            for (i = 0; i < inst._imageArray.length; i++) { 
                if(inst._imageArray[i] != null)
                {
                	_images[i] = new Image();
                	_images[i].onload = function() {
                        loaded();
                        index++;
                    };
                    _images[i].src = inst._imageArray[i] ? inst._imageArray[i] : "";
                }
                else
                {
                	_images[i] = new Image();
                    loaded();
                    index++;
                }
            }
        }
        else
        {
            _loadedCallback();
        }
    }
    
	function SetImageArray( imageArray )
	{
        if(typeof imageArray === 'object') {
            var arrayFromObject = [];
            for( var i in imageArray ) {
                arrayFromObject.push(imageArray[i]);
            }
            inst._imageArray = arrayFromObject;
        } else {
        	inst._imageArray = imageArray;
        }
    }
	
	function SetLoadPercentage( percentage )
	{
		_loadPercentage = percentage;
	}
	
	function GetLoadPercentage()
	{
		return _loadPercentage;
	}
	
	function SetLoadingCallback( callback )
	{
		if(typeof callback == 'function') {
			_loadingCallback = callback;
        }
	}
	
	function SetLoadedCallback( callback )
	{
		if(typeof callback == 'function') {
			_loadedCallback = callback;
        }
	}
}