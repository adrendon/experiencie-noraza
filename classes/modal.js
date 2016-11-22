
/*
 *	Modal Class
 *
 *  Example of use:
 *  var modal = new ModalClass();
 *  modal.InitModal('#video-modal','crop-to-costa-video-modal');
 *   *
 */

 /*
  *	Modal Objects
  */


 var _modaljson = {
    "nations-favourite" : {
        "1": { "type" : "info", "x" : "50%", "y" : "45%", "modal" : "nations-favourite-info-ii" },
        "2": { "type" : "info", "x" : "56%", "y" : "61.2%" , "modal" : "nations-favourite-info-i" },
        "3": { "type" : "video", "x" : "31%", "y" : "53%" , "modal" : "nations-favourite-video" }
    },
    "coffee-origins": {
        "1": { "type" : "info", "x" : "49%", "y" : "37%" , "modal" : "coffee-origins-info" },
        "2": { "type" : "photo", "x" : "32%", "y" : "53%" , "modal" : "coffee-origins-photo" }
    },
    "helping-communities-grow": {
        "1": { "type" : "info", "x" : "32%", "y" : "57%", "modal" : "helping-communities-grow-info" },
        "2": { "type" : "gallery", "x" : "57%", "y" : "60%" , "modal" : "helping-communities-grow-gallery" },
        "3": { "type" : "video", "x" : "62%", "y" : "52%" , "modal" : "helping-communities-grow-video-i" },
        "4": { "type" : "video", "x" : "50%", "y" : "39%" , "modal" : "helping-communities-grow-video-ii" }
    },
    "protecting-the-planet": {
        "1": { "type" : "video", "x" : "47%", "y" : "35%" , "modal" : "protecting-the-planet-video" }
    },
    // "from-crop-to-costa": {
    //     "1": { "type" : "info", "x" : "59%", "y" : "30%", "modal" : "from-crop-to-costa-info" },
    //     "2": { "type" : "video", "x" : "31%", "y" : "53%" , "modal" : "from-crop-to-costa-video" },
    //     "3": { "type" : "photo", "x" : "60%", "y" : "61%" , "modal" : "from-crop-to-costa-photo" }
    // },
    "the-roastery": {
        "1": { "type" : "video", "x" : "31%", "y" : "53%" , "modal" : "the-roastery-video" }
    },
    "roasting-process": {
        "1": { "type" : "photo", "x" : "40%", "y" : "49%" , "modal" : "roasting-process-photo" }
    },
   // "perfect-blend": {
   //     "1": { "type" : "video", "x" : "26%", "y" : "62%" , "modal" : "perfect-blend-video" }
   // },
    "costa-to-cup": {
         "1": { "type" : "info", "x" : "33%", "y" : "50%", "modal" : "costa-to-cup-info" }
    //     "2": { "type" : "video", "x" : "29%", "y" : "53%" , "modal" : "costa-to-cup-video" },
    //     "3": { "type" : "photo", "x" : "60%", "y" : "37%" , "modal" : "costa-to-cup-photo" }
    },
    "our-stores": {
        "1": { "type" : "gallery", "x" : "46%", "y" : "38%" , "modal" : "our-stores-gallery-i" },
        "2": { "type" : "info", "x" : "52%", "y" : "62%", "modal" : "our-stores-info" },
        "3": { "type" : "gallery", "x" : "37%", "y" : "57%" , "modal" : "our-stores-gallery-ii" }
    },
    "talented-teams": {
        "1": { "type" : "video", "x" : "46%", "y" : "46%" , "modal" : "talented-teams-video" },
        "2": { "type" : "info", "x" : "26%", "y" : "56%", "modal" : "talented-teams-info" },
        "3": { "type" : "gallery", "x" : "57%", "y" : "53%", "modal" : "talented-teams-gallery" }
    },
    "community-spirit": {
         "1": { "type" : "info", "x" : "50.8703703704%", "y" : "50.1875%", "modal" : "community-spirit-info" }
    //     "2": { "type" : "video", "x" : "31%", "y" : "53%" , "modal" : "community-spirit-video" },
    //     "3": { "type" : "photo", "x" : "60%", "y" : "61%" , "modal" : "community-spirit-photo" }
    },
    "got-milk": {
        "1": { "type" : "info", "x" : "41.8703703704%", "y" : "42.1875%", "modal" : "got-milk-info" }
    },
    "wider-menu": {
        "1": { "type" : "info", "x" : "54%", "y" : "44%", "modal" : "wider-menu-info" },
        "2": { "type" : "video", "x" : "38%", "y" : "53%" , "modal" : "wider-menu-video-i" },
        "3": { "type" : "video", "x" : "61%", "y" : "36%" , "modal" : "wider-menu-video-ii" },
        "4": { "type" : "video", "x" : "42%", "y" : "34%" , "modal" : "wider-menu-video-iii" }
    },
    "environmental-ambitions": {
        "1": { "type" : "info", "x" : "49%", "y" : "60%", "modal" : "environmental-ambitions-info-i" },
        "2": { "type" : "info", "x" : "49%", "y" : "39%", "modal" : "environmental-ambitions-info-ii" }

    },
    "costa-express": {
        "1": { "type" : "info", "x" : "34%", "y" : "36%", "modal" : "costa-express-info" },
        "2": { "type" : "video", "x" : "39%", "y" : "52%" , "modal" : "costa-express-video" }
    }
    //"sign-off": {
        //"1": { "type" : "info", "x" : "37.8703703704%", "y" : "72.1875%", "modal" : "sign-off-info" }
    //     "2": { "type" : "video", "x" : "31%", "y" : "53%" , "modal" : "sign-off-video" },
    //     "3": { "type" : "photo", "x" : "60%", "y" : "61%" , "modal" : "sign-off-photo" }
   // }
};
 
function ModalClass()
{
	this.BindButtonAndModal = BindButtonAndModal;
	this.SetToPage = SetToPage;
	this.FadeOutModalButtons = FadeOutModalButtons;
    var contentToAdd = [],
        modalButtons = [],
        modalController = $("#modal-controller"),
        modalContainer = $('#modal-container'),
        i,
        waitTime;

    function Gallery()
    {

        var container = $("ul#gallery"),
            width = $("ul#gallery li img").width(),
            height = $("ul#gallery li img").height(),
            num = container.children().length,
            index = 1,
            moving = false;
            //content = [];

        // float the lis and give them widths
        for(var i=0; i<num; i++)
             container.children().eq(i).css({'float':'left','width':width,'height':'auto'});           

        // left button
        var leftBtn = $(document.createElement('a'))
                        .addClass('slideshow-next icon-left-arrow stopped icomoon')
                        .attr('href','#')
                        .css({'top':((height/2)-20)+'px'})
                        .on('click',function(e){e.preventDefault();move('left');});

        // right button
        var rightBtn = $(document.createElement('a'))
                        .addClass('slideshow-prev icon-right-arrow icomoon')
                        .attr('href','#')
                        .css({'top':((height/2)-20)+'px'})
                        .on('click',function(e){e.preventDefault();move('right');});

        // content.push(leftBtn);
        // content.push(rightBtn);

        container.css({'width':width*num,'height':height});

        // content.push(
        //     $(document.createElement('div')).attr('id','slideshow-wrap').css({'width':width,'position':'relative','overflow':'hidden','height':height}).html(container)
        // );

        // var slideWrap = $(document.createElement('div')).attr('id','slideshow-wrap').css({'width':width,'position':'relative','overflow':'hidden','height':height}).html(container);
        
        //$('.modal-content').find('h2').after($(document.createElement('div')).attr('id','slideshow').css({'position':'relative','height':height,'width':width}).html(content));

        $('.modal-content').find('h2').after($(document.createElement('div')).attr('id','slideshow')
            .css({'position':'relative','height':height,'width':width})
            .html([
                leftBtn,
                rightBtn,
                $(document.createElement('div')).attr('id','slideshow-wrap').css({'width':width,'position':'relative','overflow':'hidden','height':height}).html(container)
            ])
        );

        function move(direction)
        {

            if(moving)
                return true;
            else
                moving = true;

            // if we're going left..
            if(direction == 'left') {
                // if on page 1, stop
                if(index==1) {
                    moving = false;
                    return true;
                }
                // if we are on the last page, active rightBtn
                if(index==num)
                    rightBtn.removeClass('stopped');
                // else you're okay, we're moving.. minus one from index, now we are going to this page..
                index--;
                // now index is page we're going to..
                // if we're going to 1, deactiive left btn
                if(index==1)
                    leftBtn.addClass('stopped');
                // move left
                var val = "+="+width;
            // else we're going right
            } else {
                // if on last page, stop
                if(index==num) {
                    moving = false;
                    return true;
                }
                // if we were on the first page, active leftBtn
                if(index==1)
                    leftBtn.removeClass('stopped');
                // else you're okay, we're moving.. add one from index, since we're moving up..
                index++;
                // now index is page we're going to..
                // if we're going to the last page, deactiive left btn
                if(index==num)
                    rightBtn.addClass('stopped');
                // move right
                var val = "-="+width;
            }

            // do the moving
            container.stop().transition({'x':val},200,'easeOutSine',function(){
                moving = false;
            });

        }

    }
	
	function BindButtonAndModal( button,modal,page,type )
	{

    	button.hover(function(){
                    $(this).stop().animate({scale:1.2},{duration:450,easing:'easeOutElastic'});
                },function(){
                    $(this).stop().animate({scale:1},{duration:450,easing:'easeOutElastic'});
                })
            .unbind('click')
            .on('click',function(e) {
		
                e.preventDefault();

                $.ajax({
                    url: 'modals/'+page+'/'+modal+'.html',
                    dataType: 'html',
                    success: function(html) {

                        contentToAdd = [];
                        contentToAdd.push(
                            $(document.createElement('div')).addClass('close')
                                                            .html('<a class=\"icomoon icon-cross\"></a>')
                                                            .hover(function(){
                                                                $(this).stop().animate({'scale':'1.2'},{duration:450,easing:'easeOutElastic'});
                                                            },function(){
                                                                $(this).stop().animate({'scale':'1'},{duration:450,easing:'easeOutElastic'});
                                                            })
                        );
                        contentToAdd.push(html);
                        modalContainer.html(contentToAdd);

                        if(type == "gallery")
                            Gallery();

                        $('#mask').stop().fadeTo(100,0.6);    

                        modalContainer.addClass('active').css('margin-top',-modalContainer.height()/2-(33)).show().stop().transition({ 'scale': '1', 'opacity' : '1' }).fadeIn(500);
                        
                        $('#mask,#modal-container .close a').click(function(e) {
                            e.preventDefault();
                            $('#mask').stop().fadeOut(200);
                            modalContainer.stop().transition({ 'scale': '0.7', 'opacity': '0' },200,function(){
                                modalContainer.empty().removeClass('active');
                            });
                        });

                    }

                });

            });

    }
    
    function SetToPage(page,waitTime)
    {

		var _modal,
            type;

        modalButtons = [];

        for(a in _modaljson[page])
        {
            type = _modaljson[page][a].type;
            _modal = $(document.createElement("a"))
                    .addClass("modal modal-"+type)
                    .css({  'top':_modaljson[page][a].x,
                            'left':_modaljson[page][a].y,
                            'scale':'0.7',
                            'opacity':'0'})
                    .html("<div class=\"icomoon inner icon-"+type+"\"></div>");
            modalButtons.push(_modal);
            BindButtonAndModal(_modal,_modaljson[page][a].modal,page,type);
        }

        // append so it doesn't conflict with ADDING TO THE UI
        modalController.append(modalButtons);

        for(i = 0; i < modalButtons.length; i++)
            modalButtons[i].stop().delay(waitTime+200+(i*200)).animate({'opacity':'1','scale':'1'},500,'easeOutElastic');

	}	

	function FadeOutModalButtons() {

        for(i = 0; i < modalButtons.length; i++)
            modalButtons[i].unbind('click').remove();

	}	

}