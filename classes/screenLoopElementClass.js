function ScreenLoopElementClass()
{
	var windowWidth = $(window).width();
	var duration;
	var element
	var active = true;
	this.timeout = null;
	this.destroy = destroy;
	this.ScreenLoopElement = ScreenLoopElement;

	function destroy()
	{
		active = false;
		element.stop();
	}
	
	function ScreenLoopElement( elem,direction,duration )
	{
		element = $(elem);
		var duration = duration;
		if(element.attr('style') != undefined) {
			//return;
		}
		var elementWidth = element.width();
		var elementPos;
		
		if(typeof element != 'undefined' && active)
		{			
			elementPos = element.position().left;
	
			if(direction == 'left')
			{
				if(ieVersion < 10 && ieVersion > 0) {
					element.animate({left:-elementWidth},duration*((elementPos+elementWidth)/windowWidth),'linear',function(){
						loopLeft();
					});
				} else {
					element.transition({x:(-elementPos-elementWidth)},Math.round(duration*((elementPos+elementWidth)/windowWidth)),'linear',function(){
						loopLeft();
					});
				}
			}
		}
		
		function loopLeft() 
		{
			if(typeof element != 'undefined' && active)
			{
				if(ieVersion < 10 && ieVersion > 0) {
					element.css('left',windowWidth).animate({left:-elementWidth},duration,'linear',function(){
						loopLeft();
					});
				} else {
					element.css({x:((windowWidth - elementPos)+elementWidth)});
					element.transition({x:(-elementPos-elementWidth)},duration,'linear',function(){
						loopLeft();
					});
				}
			}
		}
	}
}