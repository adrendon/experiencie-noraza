/*
 * Sprite Loader Class
 */

var sprites = [];

function SpriteLoaderClass()
{  
    this.DestroySprites = DestroySprites;
    this.InitSprite = InitSprite;
    
    function DestroySprites()
    {
        for (var i = 0; i < sprites.length; i++) {
        	sprites[i].stop();
		}
        sprites = [];
    }
    
    function InitSprite( element,src,width,height,fps,cols,rows,startFrame,interval,loop,startDelay,autoplay )
    {   
        var _options = {
            fps: fps,
            cols: cols,
            startFrame: startFrame,
            interval: interval,
            rows: rows,
            cell_width:width,
            cell_height:height,
            loop: loop,
            src:src,
            spriteElement:element,
            autoplay:autoplay,
            startDelay: startDelay,
            loadCallBack:function(e){ },
            animationCompleteCallback:function(){ }
        };
        
        if(!element.hasClass('sprite-active')) {
        	sprites.push( new spriteClass(_options) );
        	element.addClass('sprite-active');
        } else {
            for(var j=0; j<sprites.length; j++) {
                if( sprites[j].element == element ) {
                	sprites[j].start();
                }
            }
        }
    }
}