
/*
 *	HashChangeClass
 */
 
function HashChangeClass()
{
	var _url = "";
	var _number = 1; 
	var	_slug = "";
	var _hashChangeCallback = function(){};
    this.HashChange = HashChange;
    this.Init = Init;
    this.GetCurrentSlugIndex = GetCurrentSlugIndex;
    this.SetCurrentSlug = SetCurrentSlug;
    this.SetHashChangeCallback = SetHashChangeCallback; 

    $('#progress-beans li a').click(function(e){
    	e.preventDefault();
    	_hashChangeCallback = function(){};
    	window.location.href = $(this).attr('href');
    	location.reload();
    });
    
    function HashChange()
    {
    	_url = window.location.hash.split("/");
    	_number = _url[1];
    	_slug = ~~(_url[2]);
    	
    	//SetFacebookLink();
    	
    	_hashChangeCallback();
    	    	
    }

    function Init()
    {
    	HashChange();
    }
    
    function GetCurrentSlugIndex()
    {
    	_url = window.location.hash.split("/");
    	
    	if(_url[1] > 0)
    		return _url[1];
    	else 
    		return "";
    }
    
    function SetCurrentSlug( index )
    {
    	if(_viewSlugs.indexOf(index-1))
    		window.location.hash = "/" + index + "/" + _viewSlugs[index-1];
    }
    
    function SetHashChangeCallback( callback )
    {
    	if(typeof callback == 'function')
    		_hashChangeCallback = callback;
    }
    
	function SetFacebookLink() {
		$('fb\\:like').attr('href','http://costa.co.uk/experience/#' + '/' + _number + '/' + _viewSlugs[_number-1]);
		// keep the box down below
		$("#main-ui .fb_send_button_form_widget.fb_iframe_widget > span").css("cssText","height: auto !important;");
		FB.XFBML.parse();
	}
}