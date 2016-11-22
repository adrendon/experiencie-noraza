/*
 *
 *	Add to UI
 *
 */
 
function AddToUI()
{
	this.SetToPage = SetToPage;
	this.DestoryActive = DestoryActive;
    var content = [],
        items = [],
        container = $("#modal-controller"),
        elem;
    
    function SetToPage(elems)
    {

        content = [];

        for(var i = 0; i < elems.length; i++)
        {
            // assign to variable
            var elemKey = elems[i];
            var playSpriteOnHover = elemKey.playSpriteOnHover;
            var playSpriteOnClick = elemKey.playSpriteOnClick;

            // create element
            elem = $(document.createElement(elems[i].elementType));

            // add attributes
            if(elemKey.elementId)
                elem.attr({'id':elemKey.elementId});

            if(elemKey.html)
                elem.html(elemKey.html);

            if(elemKey.elementClass)
                elem.attr({'class':elemKey.elementClass});

            if(elemKey.playSpriteOnHover)
                elem.attr({'spritehoverkey':playSpriteOnHover});

            if(elemKey.playSpriteOnClick)
                elem.attr({'spriteclickkey':playSpriteOnClick});

            // bind playSpriteOnHover if needed
            if(playSpriteOnHover != undefined) {
                elem.on('mouseover',function() {
                    var spritekey = $(this).attr('spritehoverkey');
                    if(!sprites[spritekey].isPlaying) {
                        sprites[spritekey].reset();
                        sprites[spritekey].start();
                    }
                });
            }

            // bind playSpriteOnClick if needed
            if(playSpriteOnClick != undefined) {
                elem.on('click',function() {
                    var spritekey = $(this).attr('spriteclickkey');
                    if(!sprites[spritekey].isPlaying) {
                        sprites[spritekey].reset();
                        sprites[spritekey].start();
                    }
                });
            }

            // bind click
            if(elemKey.clickTrigger)
                ClickTrigger(elem,elemKey.clickTrigger);
            
            // push to respective arrays
            content.push(elem);
            items.push(elem);
        }

        container.append(content);

	}	

	function DestoryActive()
    {

        for(var i = 0; i < items.length; i++)
            items[i].remove(); //remove() unbinds too

        items = [];

	}	
}

function ClickTrigger(toClick,clickTrigger)
{

    // In HTML4 the click event was defined only for the input element and some browser, most notably FF, strictly followed the specification. However HTML5 the game changed and any modern browser implements this functionality, but jQuery still has a special case for this event
    // https://github.com/jquery/jquery/blob/master/src/event.js
    toClick.click(function() {
        $(clickTrigger).get(0).click();
    });

    toClick.hover(function() {
        $(clickTrigger).focus();
    }, function() {
        $(clickTrigger).blur();
    });
}