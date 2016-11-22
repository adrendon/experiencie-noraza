
/*
 *	View Class
 */
 
var viewImageLoader = new ImagePreloadClass();

function ViewClass()
{ 
	$.ajaxSettings.cache = false; // disable ajax caching before doing any .load()-ing
	
    var _loadingHtml = false;
    var _animatingViews = false;
    var _init = false;
    var _loadedViews = new Array();
    var foregroundAnimSpeed = 700;
    var backgroundAnimSpeed = 350;
    var animEase = 'easeOutSine';
    var _currentView = 1;
    var _viewWidth = $('.view').css('width').replace(/[^-\d\.]/g, '');
	var _viewHolders = new Array();
	var _scrollCallback = function(){};
	var _viewLoadCallback = function(){};
	this.IsAnimating = IsAnimating;
    this.LoadingHtml = LoadingHtml;
    this.DeepLinkToView = DeepLinkToView;
    this.LoadSurroundingViews = LoadSurroundingViews;
	this.GetCurrentView = GetCurrentView;
	this.SetCurrentView = SetCurrentView;
	this.SetViewHolders = SetViewHolders;
	this.InitViews = InitViews;
	this.ScrollLeft = ScrollLeft;
	this.ScrollRight = ScrollRight;
    this.AnimateScrollLeft = AnimateScrollLeft;
    this.AnimateScrollRight = AnimateScrollRight;
	this.SetScrollCallback = SetScrollCallback;
	this.SetViewLoadCallback = SetViewLoadCallback;
	
	function IsAnimating()
	{
		return _animatingViews;
	}
	
    function GetCurrentView() 
    {
        return _currentView;
    }
	
    function SetCurrentView( view ) 
    {
        _currentView = view;
    }
	
	function SetViewHolders( array ) 
    {
        _viewHolders = array;
    }
    
    function LoadingHtml()
    {
        return _loadingHtml;
    }
    
    function GoTo( view )
    {
        if(view > _currentView) {
            ScrollRight();
        } else {
            ScrollLeft();
        }
    }
    
    function DeepLinkToView( viewVal )
    {
    	if (viewVal === undefined) viewVal = 1;
    	
    	if(!_loadingHtml && !_animatingViews)
		{
	    	var _origViewLoadCallback = _viewLoadCallback;
	    	
	    	animate = true;
	        
	    	modal.FadeOutModalButtons();
            addToUI.DestoryActive();
	    	progressBar.DisableBeans();
	        navigationArrows.DisableArrows();
	     
	    	var movement = $('.view').css('width').replace(/[^-\d\.]/g, '');
	    	
	    	SetViewHtml( $(_viewHolders[viewVal-1]),_views[viewVal-1],false,true );
			_currentView = viewVal; // updating _currentView variable
	    	SetViewLoadCallback(function(){
	    		progressBar.UpdateProgressBarAndBeans(_currentView);
	    		setActiveClass();
	    		setTimeout(function(){
	    		if(ieVersion < 9 && ieVersion > 0)
	    			$('#view-container').css({left:-(_currentView-1)*_viewWidth});
	    		else
	    			$('#view-container').css({x:-(_currentView-1)*_viewWidth});
	    		},500);
	    		LoadSurroundingViews();
	    		_viewLoadCallback = _origViewLoadCallback; // ..set view load callback back to original..
	    		_viewLoadCallback();
	    		_scrollCallback();
	    	});
		}
    }
    
    function LoadSurroundingViews()
    {
        SetViewHtml( $(_viewHolders[_currentView-2]),_views[_currentView-2] );
        SetViewHtml( $(_viewHolders[_currentView]),_views[_currentView] );   
    }
	
	function InitViews( view ) // Initiate first 3 views
    {
        _viewValue = ~~(view) || 1;
        _currentView = _viewValue;
        _viewWidth = $('.view').css('width').replace(/[^-\d\.]/g, '');
        
		for(i=_viewValue-1;i<_viewValue+2;i++)
		{
			if(i > 0)
			{
				var active = false;
				var runCallback = false;
				if(i == _viewValue) {
					active = true;
					runCallback = true;
				}
				SetViewHtml( $(_viewHolders[i-1]),_views[i-1],active,runCallback );
	            _loadedViews.push(_views[i-1]);
			}
		}
		if(ieVersion < 9 && ieVersion > 0)
			$('#view-container').css({left:-(_currentView-1)*_viewWidth});
		else
			$('#view-container').css({x:-(_currentView-1)*_viewWidth});
    }
	
	function SetScrollCallback( callback ) // Set scroll callback function
	{
		_scrollCallback = callback;
	}

	function SetViewLoadCallback( callback ) // Set view load callback function
	{
		_viewLoadCallback = callback;
	}
	
	function ScrollLeft()
	{
		if(	_currentView > 1 && !_loadingHtml ) // If current view is more than one and HTML isn't loading
		{
			_currentView--;
			Scroll('left');
		}
	}
	
	function ScrollRight()
	{
		if(	_currentView < _views.length && !_loadingHtml ) // If current view is less than amount of views and HTML isn't loading
		{
			_currentView++;
			Scroll('right');
		}
	}
	
	function Scroll(direction)
	{
        animate = true;
        
        modal.FadeOutModalButtons();
        addToUI.DestoryActive();
        navigationArrows.DisableArrows();
        
        // animate progress bar
        progressBar.AnimateProgressBarAndBeans(_currentView,direction);
		
		if(direction == 'left')
		{
            if(_loadedViews.indexOf(_views[~~(_currentView)]) != -1) {
                AnimateScrollLeft();
            } else {
            	var origViewLoadCallback = _viewLoadCallback;
                viewImageLoader.SetLoadingCallback(function(){ navigationArrows.SetRightArrowPercentage( viewImageLoader.GetLoadPercentage() ); });
                viewImageLoader.SetLoadedCallback(function(){ // Set image loader call back to..
                    if(view.LoadingHtml()) { // If view is still loading HTML...
                        view.SetViewLoadCallback(function() { // Set view callback...
                            view.AnimateScrollLeft(); // to scroll left.
                            _viewLoadCallback = origViewLoadCallback;
                        });
                    } else { // else...
                        view.AnimateScrollLeft(); // Just scroll left.   
                    }
                });
                viewImageLoader.SetImageArray( images['img'][_views[~~(_currentView)]] );
                images['img'][_views[~~(_currentView)]] = null;
                viewImageLoader.Preload();
                _loadedViews.push(_views[~~(_currentView)]);
            }
		}
		else if(direction == 'right')
		{
            if(_loadedViews.indexOf(_views[~~(_currentView)]) != -1) {
                AnimateScrollRight();
            } else {
            	var origViewLoadCallback = _viewLoadCallback;
                viewImageLoader.SetLoadingCallback(function(){ navigationArrows.SetRightArrowPercentage( viewImageLoader.GetLoadPercentage() ); });
                viewImageLoader.SetLoadedCallback(function(){ // Set image loader call back to..
                    if(view.LoadingHtml()) { // If view is still loading HTML...
                        view.SetViewLoadCallback(function() { // Set view callback...
                            view.AnimateScrollRight(); // to scroll right.
                            _viewLoadCallback = origViewLoadCallback;
                        });
                    } else { // else...
                        view.AnimateScrollRight(); // Just scroll right.   
                    }
                });
                viewImageLoader.SetImageArray( images['img'][_views[~~(_currentView)]] );
                images['img'][_views[~~(_currentView)]] = null;
                viewImageLoader.Preload();
                _loadedViews.push(_views[~~(_currentView)]);
            }
		}
	}
    
    function AnimateScrollLeft() // Animate views to scroll left, then in callback, rejig DOM
    {
    	_animatingViews = true;
    	
    	_viewWidth = $('.view').css('width').replace(/[^-\d\.]/g, '');

    	if(ieVersion < 9 && ieVersion > 0)
		{
    		$('#view-container').animate({left:'+='+_viewWidth+'px'},foregroundAnimSpeed,function() {
    			ScrollLeftCallback();
	        });
		}
    	else
    	{
    		$('#view-container').transition({x:'+='+_viewWidth+'px'},foregroundAnimSpeed,'ease',function() {
    			ScrollLeftCallback();
            });
    	}
    	
    	function ScrollLeftCallback()
    	{
    		_animatingViews = false;
            SetViewHtml( $(_viewHolders[~~(_currentView)-2]),_views[~~(_currentView)-2],false );
            setActiveClass();
            _scrollCallback();
    	}
    }
    
    function AnimateScrollRight() // Animate views to scroll right, then in callback, rejig DOM
    {
    	_animatingViews = true;
    	
    	_viewWidth = $('.view').css('width').replace(/[^-\d\.]/g, '');
    	
    	if(ieVersion < 9 && ieVersion > 0)
		{
    		$('#view-container').animate({left:'-='+_viewWidth+'px'},foregroundAnimSpeed,function() {
    			ScrollRightCallback();
            }); 
		}
    	else
    	{
    		$('#view-container').transition({x:'-='+_viewWidth+'px'},foregroundAnimSpeed,'ease',function() {
    			ScrollRightCallback();
		    }); 
    	}
    	
    	function ScrollRightCallback()
    	{
    		_animatingViews = false;
			SetViewHtml( $(_viewHolders[~~(_currentView)]),_views[~~(_currentView)],false );
			setActiveClass();
	        _scrollCallback();
    	}
    }
    
    function setActiveClass()
    {
		$('.active').removeClass('active');
		$('.view').eq(_currentView-1).addClass('active');
    }
	
	function cleanUpDOM()
	{
		$('.view').each(function(){
			if($(this).index() < ~~(_currentView)-2 || $(this).index() > ~~(_currentView))
				$(this).empty();
		});
	}
	
	function SetViewHtml( holder,view,active,runCallback ) 
	{	
        if(view)
        {
        	cleanUpDOM();
            if (active === undefined) active = false;
            if (runCallback === undefined) runCallback = true;
            holder.attr( 'class','view view-' + view.split(' ').join('-') );
            if( view != undefined )
            {
                _loadingHtml = true;
                holder.load( 'views/' + encodeURIComponent(view) + '.php',function() {
                    
                    if(typeof _viewLoadCallback == 'function' && runCallback) { // run callback only if middle view is being loaded
                        _viewLoadCallback();
                    }

                    _loadingHtml = false;
                });
            }
            
            if(active)	
                holder.addClass( 'active' );
        }
	}
}