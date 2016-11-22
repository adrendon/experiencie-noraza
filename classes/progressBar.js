/*
 *  Progress Bar Class
 */

function ProgressBarClass()
{
    this.AnimateProgressBarAndBeans = AnimateProgressBarAndBeans;
    this.UpdateProgressBarAndBeans = UpdateProgressBarAndBeans;
    this.UpdateBeans = UpdateBeans;
    this.DisableBeans = DisableBeans;
    this.EnableBeans = EnableBeans;
 
    function AnimateProgressBarAndBeans( viewPage, direction, _init ) 
    {
        // allows initMainView to run this function the first time, but never again
        // ie. stops duplicates
        //if(direction == "init" && _init == true)
       //s     return;

        // if initial load or left direction, don't use call back
        if(direction == 'left' || direction == 'init')
        {
            UpdateBeans(viewPage,direction);
            $('#progress').stop().animate({width: (viewPage-1)*40},viewPage*100,'easeOutSine');
        }
        else
        {
        	$('#progress').stop().animate({ width: (viewPage-1)*40 },300,'easeOutSine', function() {
                UpdateBeans(viewPage,direction);
            });
        }

    }
    
    function UpdateProgressBarAndBeans( viewPage )
    {
    	$('#progress').stop().css({width: (viewPage-1)*40});
    	$("#main-ui #progress-beans li").each(function(key,elem) {
			// if first run through, TRY and animate beans up alongside progress bar
    		if(viewPage-1>=key)
                $(this).find('a').css({'color':'#91022e'});
    		 else
	            $(this).find('a').css({'color':'#797979'});
				
    	});
    }
    
    function UpdateBeans( page,init )
	{
		var time;
		var pageSine;
        var width = (page-1)*40;


		$("#main-ui #progress-beans li").each(function(key,elem) {
			// if first run through, TRY and animate beans up alongside progress bar
			if(init == "init" && page>=key)
			{
                // returns the PERCENTAGE in step, easing Out Sine
                // i.e. on first step, will return 0, last step will return 100. will ease up to 100.
				//Math.sin(t/d * (Math.PI/2))
				time = (page*100) * (1 - Math.cos((key*100)/(page*100) * (Math.PI/2)));
                AnimateBeans(page,key,$(this),400,time);
			}
            else
            {
				AnimateBeans(page,key,$(this),400);
			}
		});
	}
    
    function AnimateBeans( page,key,elem,speed,delay )
    {
        if(page-1>=key)
            $(elem).find('a').stop().delay(delay).animate({'color':'#91022e'},speed,"easeOutSine");
        else
            $(elem).find('a').stop().animate({'color':'#797979'},speed,"easeOutSine");
    }
    
    function DisableBeans()
    {
    	$('#progress-beans').find('a').attr("disabled","disabled");
    }

    function EnableBeans()
    {
    	$('#progress-beans').find('a').attr("disabled","");
    }
}