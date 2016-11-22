function BackgroundLoopElementClass()
{
	var element;
	this.destroy = destroy;
	this.BackgroundLoopElement = BackgroundLoopElement;

	function destroy()
	{
		element.stop();
	}
	
	function BackgroundLoopElement( elem,dur,width )
	{
		element = $(elem);
		var duration = dur || 5000;
        var imageWidth = width;
        
		function BackgroundLoopElementStep() 
		{
			element.animate({'background-position-x' : '+='+imageWidth+'px'},{duration:duration,easing:'linear',queue:false,complete:function(){
				    BackgroundLoopElementStep();
                }
            });
		} BackgroundLoopElementStep();
	}
}