/*
 * Main Controller
 */

var _views = new Array(
    '02 Nations Favourite',
    '03 Coffee Origins',
    '04 Helping Communities Grow',
    '05 Protecting the Planet',
    '06 From Crop to Costa',
    '07 The Roastery',
    '08 Roasting Process',
    '09 Perfect Blend',
    '10 Costa to Cup',
    '11 Our Stores',
    '12 Talented Teams',
    '13 Community Spirit',
    '14 Got Milk',
    '15 Wider Menu',
    '16 Environmental Ambitions',
    '17 Costa Express',
    '18 Sign Off'
);

var _viewSlugs = new Array(
    'nations-favourite',
    'coffee-origins',
    'helping-communities-grow',
    'protecting-the-planet',
    'from-crop-to-costa',
    'the-roastery',
    'roasting-process',
    'perfect-blend',
    'costa-to-cup',
    'our-stores',
    'talented-teams',
    'community-spirit',
    'got-milk',
    'wider-menu',
    'environmental-ambitions',
    'costa-express',
    'end-of-the-journey'
);

var ieCheck = new ieCheckClass();
var ieVersion = ieCheck.getInternetExplorerVersion(); 

var currentView;
var progressBar;
var meta = new MetaClass();
var view = new ViewClass();
var preloader = new PreloaderClass();
var imageLoader = new ImagePreloadClass();
var navigationArrows = new NavigationArrowsClass();
var spriteLoader = new SpriteLoaderClass();
var hashChange = new HashChangeClass();
var modal = new ModalClass();
var checkMobile = new CheckIfMobileClass();
var mobile = checkMobile.CheckMobile();
var _viewsInitialised = false;
var initLoad = true;
var i;
var currentViewElem;
var currentViewElemTexts;
var addToUI = new AddToUI;

if(ieVersion > 9 || ieVersion < 0) 
	var parallax = new ParallaxClass();

$(window).load(function() { // Runs everything needed on window load
	
	updateViewSizes();
	$(window).resize(updateViewSizes);

	generateRandomFact();
	
    progressBar = new ProgressBarClass( $('#progress') );

    //tooltip
    $("#progress-bar").tooltip({ show: { easing: 'easeInSine', duration: 100 }, hide: { easing: 'easeOutSine', duration: 100 }, position: { my: "center top", at: "center bottom+15" }});

    // set page meta data
    meta.SetTitle("The Costa Experience");

    // check hash, and initialise the binding of hashchange    
    hashChange.Init();
    
    // set view holders and initiate navigation
    view.SetViewHolders( new Array( '#view_1','#view_2','#view_3','#view_4','#view_5','#view_6','#view_7','#view_8','#view_9','#view_10','#view_11','#view_12','#view_13','#view_14','#view_15','#view_16','#view_17' ) ); 
    view.SetScrollCallback(function(){ 
    	// Original Scroll Callback
    	initMainView();
    });
    view.InitViews(hashChange.GetCurrentSlugIndex());

    navigationArrows.SetLeftArrowClickFunction( function(){view.ScrollLeft();} );
    navigationArrows.SetRightArrowClickFunction( function(){view.ScrollRight();} );
    
    $('#view-container').hide();
    imageLoader.SetLoadedCallback(function() {
        $('#view-container').show();
        preloadInitialViews();
    });
    imageLoader.SetImageArray( convertToSingleObject( images['img']['01 Loading'] ) );
    imageLoader.Preload();

});

function generateRandomFact()
{
	var randomFact  = [
	                   //"In 2012 Costa donated &pound;Xm to developing schools in<br>coffee-growing areas through The Costa Foundation.",
	                   "Costa has stores in over 29 countries worldwide.",
	                   //"Costa employ XX,000 people in the UK and around the world.",
	                  // "XX% of Costa Store managers started work as entry-level Baristas.",
	                   "Costa are the only coffee shop business in the world<br>that source 100% of their beans from Rainforest Alliance certified farms.",
	                   "Our coffee roastery is one of the greenest in the world with year on year,<br>using 100% renewable energy supply and 0% waste to landfill."
	            	];

	$("#preloader-fact").html(randomFact[Math.floor(Math.random()*randomFact.length)]);	
}

function updateViewSizes()
{
	var width = $(window).width() < 1920 ? $(window).width() : 1920;
	var height = $(window).height() < 1080 ? $(window).height() : 1080;
	$('#view-container').css({width:width*17,height:height});
	$('#view-container').find('.view').css({width:width,height:height});
	if(ieVersion < 9 && ieVersion > 0)
		$('#view-container').css({left:-(view.GetCurrentView()-1)*width});
	else
		$('#view-container').css({x:-(view.GetCurrentView()-1)*width});
}

function preloadInitialViews() // Runs on initial load
{
    // Grab initial view
    var initView = ~~(view.GetCurrentView());
    
    // Combine image arrays of current view and views either side
    var initImages = new Array();
    
    if(initView == 1)
    {
        initImages = initImages.concat(images['img'][_views[initView-1]],images['img'][_views[initView]]);
        images['img'][_views[initView-1]] = null;
        images['img'][_views[initView]] = null;

    }
    else
    {
        initImages = initImages.concat(images['img'][_views[initView-2]],images['img'][_views[initView-1]],images['img'][_views[initView]]);
        images['img'][_views[initView-2]] = null;
        images['img'][_views[initView-1]] = null;
        images['img'][_views[initView]] = null;
    }
    
    preloader.SetLoadingCallback(function(){
        $('#preloader-percentage').html(Math.floor(preloader.GetLoadPercentage())+"% LOADED");
    });
    
    preloader.SetLoadedCallback(function(){ 
        navigationArrows.ActivateNavigationArrows( function(){
            navigationArrows.BindArrowKeys();
            navigationArrows.ToggleArrows();
        });
        
        $('#progress-beans a').click(function(){
        	view.DeepLinkToView( ~~($('#progress-beans a').index( $(this) ))+1 ); 
        });
        
        initMainView();
    });
    
    var initImgLoader = new ImagePreloadClass();
    initImgLoader.SetLoadingCallback(function(){ preloader.UpdatePercentage(initImgLoader.GetLoadPercentage()); });
    initImgLoader.SetImageArray( convertToSingleObject( initImages ) );
    initImgLoader.Preload();
    
    navigationArrows.DisableLeftArrow();
}

function convertToSingleObject(arr)
{
    var list = {},
        count = 0;

    function process(arr)
    {
        for (var key in arr) {
            if (arr[key] != null && typeof arr[key] === 'object') {
                process(arr[key]);
            } else {
                list[count] = arr[key];
                count++;
            }
        }
    }

    process(arr);
    return list;
}

function initMainView() // Runs every time a user scrolls to a new view
{	
	var currentView = view.GetCurrentView();

    currentViewElem = $('.view').eq(currentView-1);
	
	//$('.view').find('*').stop(true,true); // disable all current animations
	
    navigationArrows.ToggleArrows();
    
    // Delete preloader instance that is used on loading screen
    if(typeof preloader != 'undefined') {
        delete preloader;
        preloader = null;
    }
    
    if(initLoad) {
    	progressBar.AnimateProgressBarAndBeans(currentView,'init');
    	initLoad = false;
    } else {
    	progressBar.AnimateProgressBarAndBeans(currentView);
    }
    
    hashChange.SetCurrentSlug(currentView);
    
    activateSprites();
    
    setTimeout(function(){
    if(ieVersion > 8 || ieVersion < 0) // If not mobile and not IE 7 or 8
    	animateThings(currentView);
    },1000);
	if(ieVersion > 9 || ieVersion < 0) // If not mobile and not IE 7 or 8
		parallax.BindParallax( currentViewElem.find('.scene') );

    currentViewElemTexts = currentViewElem.find('p');

    currentViewElem.find('h2').delay(750).animate({'opacity':1},1000);
    for(i = 0; i < currentViewElemTexts.length; i++)
        currentViewElemTexts.eq(i).delay(750+(200*(i+1))).animate({'opacity':1},1000);

    // modal.SetToPage(_viewSlugs[currentView-1],750+(200*(i+1)));

}

var spritesRunning = false;

function activateSprites()
{
	if(spritesRunning)
		spriteLoader.DestroySprites(); // Clear DOM of current sprites
	
	spritesRunning = true;
	
    // Find and activate sprites on new view
    $('.active .sprite').each(function(key){
        var sprite = $(this),
            delay = sprite.data('delay') ? sprite.data('delay') : 0,
            start = sprite.data('start') ? sprite.data('start') : 1,
            autoplay = sprite.data('autoplay') == false ? sprite.data('autoplay') : true,
            framerate = sprite.data('framerate') ? sprite.data('framerate') : 12,
            rows = sprite.data('rows') ? sprite.data('rows') : 1,
            imagePath = "https://costa-experience.s3.amazonaws.com/img/"+encodeURIComponent(_views[view.GetCurrentView()-1])+"/"+sprite.data('src'),
            loop = sprite.data('loop') == false ? sprite.data('loop') : true,
            startDelay = sprite.data('startdelay') || 0;

		initSprite(sprite,imagePath,sprite.data('width'),sprite.data('height'),framerate,sprite.data('cols'),rows,start,delay,loop,startDelay,autoplay);
    });
    
    function initSprite(element,imagePath,width,height,fps,cols,rows,start,delay,loop,startDelay,autoplay)
    {
    	//if(!element.hasClass('sprite-active')) {
    	//	element.addClass('sprite-active');
    		spriteLoader.InitSprite(element,imagePath,width,height,fps,cols,rows,start,delay,loop,startDelay,autoplay);
    	//}
    }
}

function animateThings(view) // main controller for animations of each view
{
	if(typeof animObjects != 'undefined') {
		for (var i = 0; i < animObjects.length; i++) {
			animObjects[i].destroy();
			animObjects[i] = null;
		}
	}
	
	animObjects = [];
	
	switch(~~(view))
	{
		case 1:
			animObjects[0] = new CloudsClass();
			animObjects[0].MoveClouds();
//			
			animObjects[1] = new ScreenLoopElementClass();
			animObjects[1].ScreenLoopElement($('.active .lorry'),'left',15000);
			
			animObjects[2] = new ScreenLoopElementClass();
			animObjects[2].ScreenLoopElement($('.active').find('.car-1'),'left',12500);
			
			animObjects[3] = new ScreenLoopElementClass();
			animObjects[3].ScreenLoopElement($('.active').find('.car-2'),'left',11500);
			
			animObjects[4] = new ScreenLoopElementClass();
			animObjects[4].ScreenLoopElement($('.active').find('.car-3'),'left',13000);

  //          animObjects[5] = new AnimateElem(".tree");
 //           animObjects[5].RussleTreeAndMakeLeaves(1,75,7500,7,50,400,79,469);

			break;
        case 2:
            addToUI.SetToPage(
                [
                    {
                        elementType: 'div',
                        elementId: 'light-1',
                        elementClass: 'view-03-Coffee-Origins-light-hover',
                        playSpriteOnHover: 1
                    },
                    {
                        elementType: 'div',
                        elementId: 'light-2',
                        elementClass: 'view-03-Coffee-Origins-light-hover',
                        playSpriteOnHover: 2
                    },
                    {
                        elementType: 'div',
                        elementId: 'light-3',
                        elementClass: 'view-03-Coffee-Origins-light-hover',
                        playSpriteOnHover: 3
                    },
                    {
                        elementType: 'div',
                        elementId: 'light-4',
                        elementClass: 'view-03-Coffee-Origins-light-hover',
                        playSpriteOnHover: 4
                    }
                ]
            );
            break;
		case 3:

			animObjects[0] = new AnimateElem(".hedge");
			animObjects[0].RussleHedgeAndMakeLeaves(2,100,7500,4); // movement,duration,pause,manyTimes,innerElement
			
			animObjects[1] = new CloudsClass();
			animObjects[1].MoveClouds();
            
			break;
        case 4:
        	animObjects[0] = new CloudsClass();
        	animObjects[0].MoveClouds();
            addToUI.SetToPage(
                [
                    {
                        elementType: 'div',
                        elementId: 'rainforest-link',
                        clickTrigger: '.view-05-Protecting-the-Planet .text-holder a'
                    }
                ]
            );  
            		
            break;
        case 5:
        	animObjects[0] = new CloudsClass();
        	animObjects[0].MoveClouds();
            
            break;
		case 7:
			animObjects[0] = new AnimateElem(".machine-details-back");
			animObjects[0].ProduceBeans();
					
			animObjects[1] = new BackgroundLoopElementClass();
			animObjects[1].BackgroundLoopElement($('.beans'),6000,312);
					
			break;
		case 9:
			animObjects[0] = new BackgroundLoopElementClass();
			animObjects[0].BackgroundLoopElement($('.view-10-Costa-to-Cup .grass'),5000,2100);
					
			animObjects[1] = new BackgroundLoopElementClass();
			animObjects[1].BackgroundLoopElement($('.view-10-Costa-to-Cup .box2'),2000,688);
					
			animObjects[2] = new CloudsClass();
			animObjects[2].MoveClouds();
            		
			break;
        case 10:
            addToUI.SetToPage(
                [
                    {
                        elementType: 'div',
                        elementId: 'light-1',
                        elementClass: 'view-12-Talented-Teams-light-hover',
                        playSpriteOnHover: 3
                    },
                    {
                        elementType: 'div',
                        elementId: 'light-2',
                        elementClass: 'view-12-Talented-Teams-light-hover',
                        playSpriteOnHover: 4
                    },
                    {
                        elementType: 'div',
                        elementId: 'light-3',
                        elementClass: 'view-12-Talented-Teams-light-hover',
                        playSpriteOnHover: 5
                    },
                    {
                        elementType: 'div',
                        elementId: 'light-4',
                        elementClass: 'view-12-Talented-Teams-light-hover',
                        playSpriteOnHover: 6
                    }
                ]
            );

            break;
        case 11:
            addToUI.SetToPage(
                [
                    {
                        elementType: 'div',
                        elementId: 'light-1',
                        elementClass: 'view-12-Talented-Teams-light-hover',
                        playSpriteOnHover: 11
                    },
                    {
                        elementType: 'div',
                        elementId: 'light-2',
                        elementClass: 'view-12-Talented-Teams-light-hover',
                        playSpriteOnHover: 12
                    },
                    {
                        elementType: 'div',
                        elementId: 'light-3',
                        elementClass: 'view-12-Talented-Teams-light-hover',
                        playSpriteOnHover: 13
                    },
                    {
                        elementType: 'div',
                        elementId: 'light-4',
                        elementClass: 'view-12-Talented-Teams-light-hover',
                        playSpriteOnHover: 14
                    }
                ]
            );

            break;
        case 12:
        	animObjects[0] = new CloudsClass();
        	animObjects[0].MoveClouds();
            		
            break;
		case 13:
			animObjects[0] = new AnimateElem(".cow-head");
			animObjects[0].SlideUpAndDown(-2,2,2000);
					
			animObjects[1] = new AnimateElem(".tree");
            //  amount,dur,pause,manyTimes,leafxMin,leafxMax,leafyMin,leafyMax,innerElement
			animObjects[1].RussleTreeAndMakeLeaves(1.5,75,7500,7,50,400,79,469);
					
			animObjects[2] = new AnimateElem(".tractor");
			animObjects[2].GoOverHill();
					
			animObjects[3] = new CloudsClass();
			animObjects[3].MoveClouds();
            		
		  	break;
        case 14:
        	animObjects[0] = new CloudsClass();
        	animObjects[0].MoveClouds();
            		
            break;
        case 15:
			animObjects[0] = new CloudsClass();
			animObjects[0].MoveClouds();

            animObjects[1] = new ScreenLoopElementClass();
            animObjects[1].ScreenLoopElement($('.active .lorry'),'left',16000);
            
            animObjects[2] = new ScreenLoopElementClass();
            animObjects[2].ScreenLoopElement($('.active').find('.car-1'),'left',14500);
            
            animObjects[3] = new ScreenLoopElementClass();
            animObjects[3].ScreenLoopElement($('.active').find('.car-2'),'left',13500);
            
            animObjects[4] = new ScreenLoopElementClass();
            animObjects[4].ScreenLoopElement($('.active').find('.car-3'),'left',14000);
                    
            break;
        case 16:
            		
            break;
        case 17:
            addToUI.SetToPage(
                [
                    {
                        elementType: 'div',
                        elementId: 'get-in-touch',
                        playSpriteOnHover: 1,
                        clickTrigger: '.get-in-touch a'
                    },
                    {
                        elementType: 'div',
                        elementId: 'light-1',
                        elementClass: 'view-18-Sign-Off-light-hover',
                        playSpriteOnHover: 4
                    },
                    {
                        elementType: 'div',
                        elementId: 'light-2',
                        elementClass: 'view-18-Sign-Off-light-hover',
                        playSpriteOnHover: 5
                    },
                    {
                        elementType: 'div',
                        elementId: 'light-3',
                        elementClass: 'view-18-Sign-Off-light-hover',
                        playSpriteOnHover: 6
                    },
                    {
                        elementType: 'div',
                        elementId: 'light-4',
                        elementClass: 'view-18-Sign-Off-light-hover',
                        playSpriteOnHover: 7
                    }
                ]
            );    
        	animObjects[0] = new CloudsClass();
        	animObjects[0].MoveClouds();
            		
            break;
	}

}