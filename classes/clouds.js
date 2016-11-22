
/*
 *	Cloud class controls active clouds
 */

function CloudsClass()
{
	this.destroy = destroy;
	this.MoveClouds = MoveClouds;
	var cloud1 = new ScreenLoopElementClass();
	var cloud2 = new ScreenLoopElementClass();
	var cloud3 = new ScreenLoopElementClass();
	var cloud4 = new ScreenLoopElementClass();
	var cloud5 = new ScreenLoopElementClass();
	var cloud6 = new ScreenLoopElementClass();

	function destroy()
	{
		cloud1.destroy();
		cloud2.destroy();
		cloud3.destroy();
		cloud4.destroy();
		cloud5.destroy();
		cloud6.destroy();  
	}
	
	function MoveClouds()
    {
		cloud1.ScreenLoopElement($('.active').find('.cloud-1-164x61'),'left',85000);
		cloud2.ScreenLoopElement($('.active').find('.cloud-1-320x118'),'left',90000);
		cloud3.ScreenLoopElement($('.active').find('.cloud-1-85x32'),'left',80000);
		cloud4.ScreenLoopElement($('.active').find('.cloud-2-101x56'),'left',110000);
		cloud5.ScreenLoopElement($('.active').find('.cloud-2-138x77'),'left',120000);
		cloud6.ScreenLoopElement($('.active').find('.cloud-2-176x98'),'left',130000);  
    }	
}