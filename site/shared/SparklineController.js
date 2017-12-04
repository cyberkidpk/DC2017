/* --------------------------------------------------------
Grid Controller to control Component , Model, View Modules  for DEV CHALLANGE

version: 0.0
last modified: 03.12.2017 by PK
author: Piyush Kanungo
Project Link: https://github.com/cyberkidpk/DevChallenge.git
-------------------------------------------------------
email: piyush.k@hcl.com---*/


export class SparklineController {

    constructor(targetDom, nextRefreshConfig, startTime, EventObj, ModelObj, isEventSubscribed, index) {
        this._interval = 0;
        this._nextRefreshConfig = nextRefreshConfig;
        this._startTime = startTime;
        this._targetDomId = targetDom;
        this.timeLaps = 0; // for checking 30 secs difference
        this._EventObj = EventObj;
        this._ModelObj = ModelObj;
        this.SLSpanElem = null;
        this.self = this;
        this.regenerate = false;
        this.counter = 0;

        this.explainLoginLis = document.getElementById('explainLogic').getElementsByTagName("li");

        /* Ensures Custom Event Subscribe only once */
        this._isEventSubscribed = isEventSubscribed;

        this.midPriceArray = [];
        if (this._ModelObj.model[index]) {
            let midPrice = this.midPriceCalculation(this._ModelObj.model[index])
            this.midPriceArray.push(midPrice);
        }

        this.sparkline = null;


        /*--------------- Initialize Target Sparkline -------------------*/
        this.init();


    }
    generate() {
        if (!document.getElementById(this._targetDomId + "SLSpan")) {
            const createSpan = document.createElement("span"),
                sparkElement = document.getElementsByTagName('body')[0].appendChild(createSpan);
            createSpan.id = this._targetDomId + "SLSpan";
            createSpan.style.position = "absolute";

            this.sparkline = new Sparkline(sparkElement);
            this.draw() //Drawing Sparkline
            this.startInterval();
            this.regenerate = false;
            if(this._targetDomId  === "SLgbpchf"){
                    
                    this.explainLoginLis[1].innerHTML = (this.midPriceArray.length + 1) +"currency pair received"; 
                    this.explainLoginLis[0].innerHTML = this.counter + "seconds for the midprice over the 30 seconds before the most recent update"; 
                }
        }
        if (this.regenerate) {
            this.startInterval();
        }
    };
    placeSparkLine(tObj) {
        //let targetDomGetBound = tObj._targetDom.getBoundingClientRect();

        let dom = null,
            spanObj = document.getElementById(tObj._targetDomId),
            left = spanObj.getBoundingClientRect().left,
            top = spanObj.getBoundingClientRect().top;
        dom = document.getElementById(tObj._targetDomId + "SLSpan");
        dom.style.top = top + "px";
        dom.style.left = left + "px";


    }
    draw(obj) {
        var tObj = this.self;
        tObj.sparkline.draw(tObj.midPriceArray) // Avoiding to reinstantiating sparkline
        tObj.placeSparkLine(tObj)
    };
    midPriceCalculation(dataModel) {
        let midPrice = (dataModel.bestAsk + dataModel.bestBid) / 2;
        return midPrice;
    }
    addNextMidPrice() {
        let args = arguments,
            midPrice = this.midPriceCalculation(args[1]);
        if ((this._targetDomId + "SLSpan") === ("SL" + args[1].name + "SLSpan")) { //checking correct sparkline

            this.midPriceArray.push(midPrice);
            if(this._targetDomId  === "SLgbpchf"){
                    this.explainLoginLis[1].innerHTML = (this.midPriceArray.length) +"currency pair received"; 
                    this.explainLoginLis[2].innerHTML = "mid prices" +":::" + this.midPriceArray.join(": : :");
                }
            
            if (this.regenerate) {
                this.generate();
                this.regenerate = false;
            }
        }

        this.draw(this);
    }
    getCurrentTime() {
        return new Date();
    };

    reInitiateSLEvery30Sec() { /*Reinitiate Sparkline every 30 Secs */
        // this.midPriceArray = [];
        this.counter = 0;
        this.regenerate = true;
        this.midPriceArray = [];
        if(this._targetDomId  === "SLgbpchf"){
            this.explainLoginLis[1].innerHTML = "NO UPDATE"; 
            this.explainLoginLis[0].innerHTML =  "NO COUNTDOWN";
            this.explainLoginLis[2].innerHTML = "mid prices" +":::" + "RESET";
        }
        
        this.clearInterval();
    }
    startInterval() {
        //let self = this.self;
        //document.getElementById("SLgbpeurSLSpan").innerHTML = (this.counter);
        var self = this.self;
        this._interval = setInterval(function() {

                let currentTimeInMSec = self.getCurrentTime().getTime(),
                    startTime = self._startTime.getTime();
                self.counter++;
                document.getElementById("SLgbpchf").parentNode.style.backgroundColor = "green";
                if(self._targetDomId  === "SLgbpchf"){
                
                    self.explainLoginLis[0].innerHTML = self.counter + "seconds for the midprice over the 30 seconds before the most recent update"; 

                }
                if (self.counter >= 30) {
                    self.reInitiateSLEvery30Sec(); //the midprice over the 30 seconds before the most recent update
                
                }
                

            } // Referencing to current object
            , 1000);

    }
    clearInterval() {
        window.clearInterval(this._interval); // clear to restarted interval once again 
    }

    init() {
        if (this._isEventSubscribed) { // Subscribed only once

            this._EventObj.subscribe({
                evtName: "GENERATE_SPARKLINE",
                fn: this.init.bind(this)
            });
            this._EventObj.subscribe({
                evtName: "NEXT_MID_PRICE_MODEL_UPDATE",
                fn: this.addNextMidPrice.bind(this)
            })
            this.generate();
        }


    }
};