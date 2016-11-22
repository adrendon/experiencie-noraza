/*
 * Simple Animation c.sa.sprite:
 */
;var spriteClass = function(_options, callback){
	
	////////////////////
	/////GLOBAL VARIABLES
	////////////////////
	var _inst = this;
	var Element;
	var Current_Frame = 1;
	var Current_Row = 1;
	_inst.animationInterval = null;
	_inst.animationPlayTimeout = null;
	var Reverse = "false";
	var _options = _options || {};
	_inst.isPlaying = false;

	mergeObjects=function(e,t){var n={};if("object"!=typeof e||"object"!=typeof t)return sa_debug?alert("both items passed into mergeObjects must be objects"):null;for(k in e)n[k]=t[k]?t[k]:e[k]?e[k]:null;for(k in t)n[k]||(n[k]=t[k]);return n};
	
	var spriteIinitialize = function(_options, callback) {
		
		var defaults = { 
			fps: 12,  
			cols: 10, 
			rows: 2,
			startFrame: 1,
			interval: 0,
			stopAt:null,
			cell_width:250,
			cell_height:250,
			loop:false,
			src:"images/sprite.png",
			spriteElement:null,
			endFrame:null,
			loadingVisible:true,
			loadingElement:null,
			loadCallBack:null,
			autoplay:true,
			startDelay: 0,
			loadCallBack:function(e) {},
			animationCompleteCallback:function() {}
		};
		
		_inst.options = mergeObjects(defaults, _options);
		if(callback) {
			_inst.options.loadCallBack = callback;
		}
		
		Current_Frame = _options.startFrame;
		_inst.animationInterval = _options.interval;

		// log(options.spriteElement)
		
		Element = _inst.options.spriteElement;
		 if(_options.loadingElement!=null) {
		 	Element.append($(_options.loadingElement));
		 }
		
		Element.spriteAnimation = _inst;
		
		//var BGImage = new Image();
		//var BGImage = $("<img />");
		//BGImage.src = _options.src;
		
		setTimeout(function(){
			//$(BGImage).load(loadComplete).attr("src", _options.src);
			loadComplete();
			if(_options.loadingElement!=null) {
				_options.loadingElement.show();
			};
			if(Element) {
				//Element.style.backgroundImage = "url("+_inst.options.src+")";
				//Element.css('background-image',"url("+_inst.options.src+")");
			}
		}, _inst.options.startDelay);

	};
	
			
	var animate = function() {

		if(_options.endFrame!=null) {
			Element.find(".end_frame").hide()
		}
		
    	var xPos = -( (Current_Frame-1) * _inst.options.cell_width );
    	var yPos = -( (Current_Row-1) * _inst.options.cell_height );
    	var el = Element;
    	//el.style['backgroundPosition'] = xPos + 'px ' + yPos + 'px';
    	el.css('background-position',xPos + 'px ' + yPos + 'px');
    	
    	if(Reverse != "true") { // Play forwards
	    	if( Current_Frame < _inst.options.cols ) { // If current col (frame) is less than max cols
	    		Current_Frame++; // Add a frame
	    	} else if(_inst.options.loop==true) { // Else if loop is true
	    		clearInterval(_inst.animationInterval);
	    		clearTimeout(_inst.animationPlayTimeout);
	    		_inst.animationPlayTimeout = setTimeout(function(){ // Reset and start again
	    			if(!_inst.isPlaying) {
	    				setTimeout(function(){ // Reset and start again
	    					_inst.isPlaying = true;
	    					_inst.animationInterval=setInterval( function(){animate(); } , parseInt(1000 / _inst.options.fps) );
	    					Current_Frame = 1;
	    				},_options.interval);
	    			}

	    		},_options.interval);
	    		_inst.isPlaying = false;	
	    	} else { // Else at last col and loop is false
	    		if(_inst.options.endFrame!=null) { // If end frame is not null then set to end frame
	    			el.style['background-position'] = _inst.options.cell_width + 'px';
					//$(".end_frame", Element).style.display = "block"
				}
	    		clearInterval(_inst.animationInterval);
	    		_inst.isPlaying = false;
	    	};

	    	if(_inst.options.stopAt && Current_Frame >= _inst.options.stopAt) { // If stopAt is set and frame is stopAt frame
	    		clearInterval(_inst.animationInterval);
	    		_inst.isPlaying = false;
	    	}
	    } else { // Play in reverse
	    	if( Current_Frame > 1 ) {
	    		Current_Frame--;
	    	} else if(_inst.options.loop==true) {
	    		Current_Frame = _inst.options.cols
	    	} else {
	     		if(_inst.options.endFrame!=null) {
	     			el.style['background-position'] = _inst.options.cell_width + 'px';
				 	$(".end_frame", Element).style.display = "block"
				 }
	    		clearInterval(_inst.animationInterval);
	    		_inst.isPlaying = false;
	    	};

	    	if(_inst.options.stopAt && Current_Frame <= _inst.options.stopAt) {
	    		clearInterval(_inst.animationInterval);
	    		_inst.isPlaying = false;
	    	}
	    }
	};

	
	var addListener = function(element, type, expression, bubbling, context) {
		bubbling = bubbling || false;
		if(window.addEventListener)	{ // Standard
			element.addEventListener(type, function() { expression(context) }, bubbling);
			return true;
		} else if(window.attachEvent) { // IE
			element.attachEvent('on' + type, function() { expression(context) });
			return true;
		} else {
			return false;
		}
	};

	var loadComplete = function(e) {
		//Element.css("background-image", "url("+_options.src+")");
		if(_options.loadingElement!=null) {
			_options.loadingElement.style.display = "none";
		};
		if(_options.endFrame!=null) {
			Element.append("<img src='"+_options.endFrame+"' style='display:none' class='end_frame' />")
		}

		setTimeout(function() {
			_options.loadCallBack(_inst)
		}, 200)

		if(_options.autoplay==true){
			_inst.start();
		}
	};
	
	//this.isPlaying = false;
	
	spriteIinitialize(_options, callback);
	
	////PUBLIC METHODS
	this.model = function() {
		return options;
	}
	
	this.instructions = function() {
		return instructions;
	}
	
	this.image = function(){
		return options.src;
	};
		
	this.start = function() {
		clearInterval(_inst.animationInterval);

		_inst.isPlaying = true;
		_inst.animationInterval=setInterval( function(){animate(); } , parseInt(1000 / _inst.options.fps) );
	};	
	this.pause = function() {
		clearInterval(_inst.animationInterval);
	};
	this.stop = function() {
		_inst.options.loop = false;
		clearInterval(_inst.animationInterval);
	};
	this.reset = function() {
    	Current_Frame = 1;
    	var xPos = -( (Current_Frame-1) * _inst.options.cell_width );
    	var yPos = -( (Current_Row-1) * _inst.options.cell_height );
    	//Element.style['background-position'] = xPos + 'px ' + yPos + 'px';
    	Element.css('background-position', '0 0');
	};	
	this.reverse = function(bool, autoplay) {
		Reverse = bool;
		if(autoplay == "true") {
			clearInterval(_inst.animationInterval);

			_inst.isPlaying = true;
			_inst.animationInterval=setInterval( function(){animate(); } , parseInt(1000 / _inst.options.fps) );
		}
	};
	this.element = function() {
		return Element;
	};
	this.changeRow = function(num) {
		Current_Row = num
	};
	this.goToFrame = function(num) {
		if(num<1) { num = 1 };
		if(num>_inst.options.cols) { num = _inst.options.cols}
		Current_Frame = parseInt(num);
		animate()
		return Element;
	};
	this.step = function() {
		if(_inst.options.cols>Current_Frame+1) {
			Current_Frame++;
			animate()
		}
		return Element;
	};
	  
};