/*
 *  Animate Element Class
 */

function AnimateElem( elem )
{
    var _init = false; 
    var _rotating = false;
    var _onClickRotate;
    var _elem = $(elem);
    this.destroy = destroy;
    this.Rotate = Rotate;
    this.ProduceBeans = ProduceBeans;
    this.FloatBeanDown = FloatBeanDown;
    this.GoOverHill = GoOverHill;
    this.RussleTreeAndMakeLeaves = RussleTreeAndMakeLeaves;
    this.RussleHedgeAndMakeLeaves = RussleHedgeAndMakeLeaves;
    this.CreateFallingLeaf = CreateFallingLeaf;
    this.FloatLeafDown = FloatLeafDown;
    this.OnClickRotate = OnClickRotate;
    this.SlideUpAndDown = SlideUpAndDown;

    function destroy()
    {
    	_elem.stop();
    }
    
    function _randomNum( min,max )
    {
        var randomNum = (Math.random() * (~~(max) - ~~(min) ) + ~~(min));
        return randomNum;
    }

    function Rotate( speed )
    {
        var angle = 0;
        var elem = $(_elem);
        _Rotate = setInterval(function(){
            angle+=speed;
            elem.rotate(angle);
        },25);
    }

    function ProduceBeans() {

        newBean = $(document.createElement("div")).css({'left':(Math.round(_randomNum(1410,1452)))}).addClass("falling-bean icon-bean icomoon").insertAfter(_elem);
        FloatBeanDown( $(newBean) );            

        setTimeout(function() {
            ProduceBeans();
        }, Math.round(_randomNum(100,200)));

    }

    function FloatBeanDown( element )
    {

        $(element).animate({
            'top' : 625
        },Math.round(_randomNum(1250,1750)), 'easeInExpoCustom', function() {
            $(element).stop().remove();
        });

        $(element).rotate(Math.round(_randomNum(-100,100)));

    }

    function GoOverHill()
    {

        var path = {
            start: {
              x: 1364,
              y: 680,
              angle: 42.5,
              length: 0.441
            },
            end: {
              x: 504,
              y: 680,
              angle: 320.5,
              length: 0.410
            }
        };

        var angle = 0;
        var elem = $(_elem);  
        
        var _GoOverHillAgain;
        
        GoOverHillAgain();
        
        function GoOverHillAgain()
        {

            elem.animate({path : new $.path.bezier(path)},20000,'linear');

            elem.rotate({
                angle: 42,
                animateTo: -42,
                duration: 20000,
                easing: function(x, t, b, c, d) { return b+(t/d)*c ; } // linear
            });
            
            _GoOverHillAgain = setTimeout(GoOverHillAgain,25000);

        };
    }

    function RussleTreeAndMakeLeaves( amount,dur,pause,manyTimes,leafxMin,leafxMax,leafyMin,leafyMax,innerElement )
    {


        var innerElement = innerElement || ".tree-foilage";
        var manyTimes = manyTimes || 7;
        var repeating;
        var index = 0;
        var amountSave = amount;
        var RussleTreeAndMakeLeavesMainStep;
        var RussleTreeStep;

        function RussleTreeAndMakeLeavesMain() {

            index = 0;
            amount = amountSave;
            repeating = true;

           // if(_randomNum(0,10) < 1)  
            //    CreateFallingLeaf(1, leafxMin,leafxMax, leafyMin,leafyMax, 40,70,4,6,3,10);

            RussleTree();
            RussleTreeAndMakeLeavesMainStep = setTimeout(RussleTreeAndMakeLeavesMain,pause);

        } RussleTreeAndMakeLeavesMain();

        function RussleTree() {
                    
            //before anytihng, if index is to big stop

            if(repeating == true) {

                // half of pi gives us a nice quarter curve, use this and plot "where we are" between index and manyTimes, then times it by the totalAmount to give us a percentage of what we need
                // then take that away from amountSave so we are left with the inverse, so it smooths down and not up.. 
                amount = amountSave - ((Math.sin((Math.PI/2)*(index/manyTimes))) * amountSave);

                //odd or even, whether to animate back or forth
                if(index%2==0)
                    to = amount;
                else
                    to = -amount;

                // find the inner element, if not found use main element
                if(_elem.find(innerElement).length)
                    elem = _elem.find(innerElement);
                else
                    elem = _elem;

                //rotate it
                elem.stop().rotate({
                    animateTo: to,
                    duration: dur,
                    easing: $.easing.easeInOutSine
                });

                //var alpha = manyTimes / Math.log(manyTimes);
                // visits = manyTimes show 100%
                // visits = 0 show 0%
                //var percentVisible = alpha * Math.log(index);


                // goal is amount to 0
                // in manyTimes step
                // easing out

                //amount = amount * (1-(1/manyTimes));

                RussleTreeStep = setTimeout(RussleTree,dur);

            }

            if(index == manyTimes) {
                repeating = false;
                return true;
            }

            index++;

        }
    }

    function RussleHedgeAndMakeLeaves( movement,duration,pause,manyTimes,innerElement )
    {

        var innerElement = innerElement || ".hedge";
        var duration = duration || 75;
        var manyTimes = manyTimes || 7;
        var _RussleHedgeAndMakeLeavesStep;
        var _ShakeElemStep;
        var index;
        var _ShakeElemRepeat = false;
        var amount;
        var originalPos = parseInt(_elem.css('left'));
        var to;
        var elem;

        function RussleHedgeAndMakeLeavesMain()
        {
            index = 0;
            _ShakeElemRepeat = true;
            ShakeElem();
            _RussleHedgeAndMakeLeavesStep = setTimeout(RussleHedgeAndMakeLeavesMain,pause);
        } RussleHedgeAndMakeLeavesMain();

        function ShakeElem()
        {

            // elem.stop().transition({ x: movement },duration,'easeInOutSine',function(){
            //     elem.stop().transition({ x: -movement },duration,'easeInOutSine',function(){
            //         movement = movement * (1-(1/manyTimes));
            //         if(index < manyTimes) {
            //             move();
            //         } else {
            //             elem.transition({ x: 0 },duration,'easeInOutSine');
            //         }
            //         index++;
            //     });
            // });

            if(_ShakeElemRepeat == true) {

                // half of pi gives us a nice quarter curve, use this and plot "where we are" between index and manyTimes, then times it by the totalAmount to give us a percentage of what we need
                // then take that away from amountSave so we are left with the inverse, so it smooths down and not up.. 
                //amount = movement - ((Math.sin((Math.PI/2)*(index/manyTimes))) * movement);

                amount = movement - ((Math.sin((Math.PI/2)*(index/manyTimes))) * movement);

                //odd or even, whether to animate back or forth
                if(index%2==0)
                    to = originalPos+amount;
                else
                    to = originalPos-amount;

                // find the inner element, if not found use main element
                if(_elem.find(innerElement).length)
                    elem = _elem.find(innerElement);
                else
                    elem = _elem;

                elem.stop().transition({
                    'left' : to
                },duration,'easeOutSine');


            }

            if(index == manyTimes) {
                _ShakeElemRepeat = false;
                return true;
            }

            index++;

            _ShakeElemStep = setTimeout(ShakeElem,duration);

        }

    }

    function CreateFallingLeaf( number, xMin,xMax,yMin,yMax, horizontalSwingMin,horizontalSwingMax, speedMin,speedMax, fallingSpeedMin,fallingSpeedMax )
    {
        for(var i = 0; i<number; i++) {
            var newLeaf = $(document.createElement("div")).css({"position":"absolute","top":_randomNum(xMin,xMax),"left":_randomNum(yMin,yMax),"opacity":0}).addClass("falling-leaf icon-leaf icomoon").appendTo(_elem);
            FloatLeafDown( _randomNum(horizontalSwingMin,horizontalSwingMax),(_randomNum(speedMin,speedMax)/100),(_randomNum(fallingSpeedMin,fallingSpeedMax)/10),$(newLeaf) );            
        }
    }

    function FloatLeafDown( horizontal,speed,vertical,element )
    {
        
        element = element || _elem;

        var begin = 0,
            floatDownStep;

        function floatDown(){

            var russleAmount = horizontal * Math.sin( begin );

            element.animate({
                'margin-left' : -russleAmount,
                'top' : '+='+vertical,
                'opacity' : '+=0.1'
            },50);      
            begin += speed;

            element.rotate((russleAmount/2)+50);
            
            if( element.offset().top > _elem.height() && _elem.hasClass('tree')) {
                element.stop().remove();
            } else if (element.offset().top > 750) {
                element.stop().remove();
                floatDownStep = undefined;
            }
            
            floatDownStep = setTimeout(floatDown,50);

        } floatDown();
        
    }

    function OnClickRotate( speed )
    {
        var angle = 0;
        _elem.on("click", function() {
            if(_rotating) { //check if already has been clicked, if clear and set rotating variable then exit (exit prevents deplicate rotates happening)
                clearInterval(_onClickRotate);
                _onClickRotate = undefined;
                _rotating = false;
                return;
            }
            _rotating = true;  
            _onClickRotate = (setInterval(function(){
                angle+=speed;
                _elem.rotate(angle);
            },25));
        });
    }

    function SlideUpAndDown( up, down, speed )
    {
        speed = speed || 1000;
        var _UpAndDown;
        
        function animate() {
            if(typeof elem != "undefined") {
                _elem.transition({ y: up },speed,'easeInOutSine').transition({ y: down },speed,'easeInOutSine');
            }
            _UpAndDown = setTimeout(animate,speed*2);
        } animate();
    }

}