/*
 *  Preload Class
 */

function PreloaderClass() {

    var _loadPercentage = 0;
    var _speed = 350;
    var _ease = 'easeOutSine';
    var _loading = false;
    var _loadingCallback = function(){};
    var _loadedCallback = function(){};
    this.GetLoadPercentage = GetLoadPercentage;
    this.UpdatePercentage = UpdatePercentage;
    this.SetLoadingCallback = SetLoadingCallback;
    this.SetLoadedCallback = SetLoadedCallback;
    
    function UpdatePercentage( percentage )
    {
        _loadPercentage = percentage;
        
        _loadingCallback(); // run loading callback
        
        if(!_loading) {
            whiteWater();
            _loading = true;
        }
        // Show loader on loading screen
        if(!$('#preloader').is(":visible"))
            $('#preloader').show();
        
		$("#preloader-white-water").stop().animate({
			height: (percentage/100) * 136
		},{
			duration: 100,
			easing: "linear",
			complete: function() {
				if(parseInt($("#preloader-white-water").css("height"),10) > 130) { // If white water is finished animating
					$("#preloader-finish-state").fadeIn(250, function() { // Fade in dark costa logo
                        setTimeout(function(){ // wait 1 second
                        	if(ieVersion < 9 && ieVersion > 0)
                        	{
                        		$('#loading-screen').animate({left:'-100%'},{duration:_speed,easing:_ease,complete:function(){ // slide loading screen off to the left
	                                    setTimeout(function(){
                                            $('#loading-screen').remove();
	                                       _loadedCallback(); // then run the loaded callback ( usually something like appending navigation arrows )
                                        },50);
	                                }
	                            });
                        	}
                        	else
                    		{
                        		$('#loading-screen').transition({x:'-100%'},_speed,_ease,function(){ // slide loading screen off to the left
                                    setTimeout(function(){
                                        $('#loading-screen').remove();
                                        _loadedCallback(); // then run the loaded callback ( usually something like appending navigation arrows )
                                    },50);
                        		});
                    		}
                              
                        },1000);
                    });
				}
			}
		});
    }
    
    function GetLoadPercentage()
    {
        return _loadPercentage;   
    }
    
    function SetLoadingCallback( callback )
    {
        if(typeof callback == 'function')
            _loadingCallback = callback;
    }
    
    function SetLoadedCallback( callback )
    {
        if(typeof callback == 'function')
            _loadedCallback = callback;
    }
	
    function whiteWater() {
        $('#white-water').animate({
            'background-position-x' : '-=20'},{
            easing: "linear",
            duration: "600",
            complete: function(){
                whiteWater();
            }
        });
	}
}