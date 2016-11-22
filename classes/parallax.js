
/*
 *	Parallax Class
 */
 
function ParallaxClass()
{
	this.BindParallax = BindParallax;
	
	function BindParallax( element )
	{
	    // unbind any existing parallax 
	    $('.parallaxed').parallax('disable').removeClass('parallaxed');
	    
	    // apply parallax settings and initiate
	    $( element ).parallax({
	        calibrateX: true,
	        calibrateY: true,
	        invertX: false,
	        invertY: true,
	        limitX: false,
	        limitY: 0,
	        scalarX: 2,
	        scalarY: 8,
	        frictionX: 0.2,
	        frictionY: 0.8
	    }).addClass('parallaxed').parallax('enable');
	}
}