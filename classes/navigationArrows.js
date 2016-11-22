/*
 *	Navigation Arrows Class
 */    

function NavigationArrowsClass()
{
    var _disabled = true;
    var _leftArrow = $('#left-arrow');
    var _rightArrow = $('#right-arrow');
    var _leftArrowClickFunction = function(){};
    var _rightArrowClickFunction = function(){};
    var _rotDuration = 10;
    var _hoverAnimDuration = 600;
    this.ActivateNavigationArrows = ActivateNavigationArrows;
    this.SetLeftArrowPercentage = SetLeftArrowPercentage;
    this.SetRightArrowPercentage = SetRightArrowPercentage;
    this.SetLeftArrowClickFunction = SetLeftArrowClickFunction;
    this.SetRightArrowClickFunction = SetRightArrowClickFunction;
    this.BindLeftArrowHoverClickState = BindLeftArrowHoverClickState;
    this.BindRightArrowHoverClickState = BindRightArrowHoverClickState;
    this.UnbindLeftArrowHoverClickState = UnbindLeftArrowHoverClickState;
    this.UnbindRightArrowHoverClickState = UnbindRightArrowHoverClickState;
    this.DisableArrows = DisableArrows;
    this.DisableLeftArrow = DisableLeftArrow;
    this.DisableRightArrow = DisableRightArrow;
    this.EnableArrows = EnableArrows;
    this.EnableLeftArrow = EnableLeftArrow;
    this.EnableRightArrow = EnableRightArrow;
    this.ToggleArrows = ToggleArrows;
    
    function ActivateNavigationArrows( callback )
    {
        var duration = 50;
        _leftArrow.show().animate({width:120,height:120,marginTop:-60,left:51,lineHeight:120},{duration:duration,easing:'easeOutSine',complete:function(){
                _leftArrow.animate({width:102,height:102,marginTop:-51,left:60,lineHeight:102},{duration:duration,easing:'easeOutElastic'});
            }
        });
        _rightArrow.show().animate({width:120,height:120,marginTop:-60,right:51,lineHeight:120},{duration:duration,easing:'easeOutSine',complete:function(){
                _rightArrow.animate({width:102,height:102,marginTop:-51,right:60,lineHeight:102},{duration:duration,easing:'easeOutElastic',complete: function(){
                        if(typeof callback == 'function')
                            callback();
                    
                        ToggleArrows();
                    }
                });
            }
        });
    }
    
    function SetLeftArrowPercentage( percentage ) 
    {
        percentage = percentage / 100 * 360;
        var circle1 = _leftArrow.find('.circle1');
        var circle2 = _leftArrow.find('.circle2');
        
        if(percentage <= 180) {
            circle1.rotate(percentage);
        } else if(percentage <= 359) {
            circle1.rotate(180);
            circle2.rotate(percentage);
        } else {
            circle1.rotate(0);
            circle2.rotate(180);
        }
    }
    
    function SetRightArrowPercentage( percentage ) 
    {
        if(!_disabled) {
            _disabled = true;  
            $('.arrow .progress').show();
            UnbindLeftArrowHoverClickState();
            UnbindRightArrowHoverClickState();
        }
            
        percentage = percentage / 100 * 360;
        var circle1 = _rightArrow.find('.circle1');
        var circle2 = _rightArrow.find('.circle2');
        
        if(percentage <= 180) {
            circle1.rotate(percentage);
        } else if(percentage <= 359) {
            circle1.rotate(180);
            circle2.rotate(percentage);
        } else {
            circle1.rotate(0);
            circle2.rotate(180);
            _disabled = false;  
            $('.arrow .progress').hide();
            ToggleArrows();
        }
    }
    
    function SetLeftArrowClickFunction( callback )
    {
        if(typeof callback == 'function')
            _leftArrowClickFunction = callback;
    }
    
    function SetRightArrowClickFunction( callback )
    {
        if(typeof callback == 'function')
            _rightArrowClickFunction = callback;
    }
    
    function BindLeftArrowHoverClickState()
    {
        UnbindLeftArrowHoverClickState();
        
        _disabled = false;
        _leftArrow.hover(function(){
            $(this).stop().animate({scale:1.2},{duration:_hoverAnimDuration,easing:'easeOutElastic'});
        },function(){
            $(this).stop().animate({scale:1},{duration:_hoverAnimDuration,easing:'easeOutElastic'});
        }).click(function(){
            UnbindLeftArrowHoverClickState();
            UnbindRightArrowHoverClickState();
            _leftArrowClickFunction();
        });
        
        
    }
    
    function BindRightArrowHoverClickState()
    {
        UnbindRightArrowHoverClickState();
        
        _disabled = false;
        _rightArrow.hover(function(){
            $(this).stop().animate({scale:1.2},{duration:_hoverAnimDuration,easing:'easeOutElastic'});
        },function(){
            $(this).stop().animate({scale:1},{duration:_hoverAnimDuration,easing:'easeOutElastic'});
        }).click(function(){
            UnbindLeftArrowHoverClickState();
            UnbindRightArrowHoverClickState();
            _rightArrowClickFunction();
        });

    }
    
    function UnbindLeftArrowHoverClickState()
    {
        _leftArrow.unbind('mouseenter mouseleave click').stop().animate({scale:1},{duration:10,easing:'easeOutElastic'});
    }
    
    function UnbindRightArrowHoverClickState()
    {
        _rightArrow.unbind('mouseenter mouseleave click').stop().animate({scale:1},{duration:10,easing:'easeOutElastic'});
    }
    
    function DisableArrows()
    {
        DisableLeftArrow();
        DisableRightArrow();
    }
    
    function DisableLeftArrow()
    {
        _leftArrow.addClass('disabled');
        UnbindLeftArrowHoverClickState();
    }

    function DisableRightArrow()
    {
        _rightArrow.addClass('disabled');
        UnbindRightArrowHoverClickState();
    }
    
    function EnableArrows()
    {
        EnableLeftArrow();
        EnableRightArrow();
    }
    
    function EnableLeftArrow()
    {
        _leftArrow.removeClass('disabled');
        BindLeftArrowHoverClickState();
    }
    
    function EnableRightArrow()
    {
        _rightArrow.removeClass('disabled');
        BindRightArrowHoverClickState();
    }
    
    function ToggleArrows()
    {   
        if(view.GetCurrentView() < 2)
            navigationArrows.EnableRightArrow();
        else if(view.GetCurrentView() == _views.length)
            navigationArrows.EnableLeftArrow();
        else
            navigationArrows.EnableArrows();   
    }
    
    $(document).keydown(function(e){
        if (e.keyCode == 37) {
        	_leftArrow.trigger('click');
            return false;
        }
        else if (e.keyCode == 39) { 
        	_rightArrow.trigger('click');
            return false;
        }
    });   
    
}