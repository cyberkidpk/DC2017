/* --------------------------------------------------------
Grid Controller to control Component , Model, View Modules  for DEV CHALLANGE

version: 0.0
last modified: 03.12.2017 by PK
author: Piyush Kanungo
Project Link: https://github.com/cyberkidpk/DevChallenge.git
-------------------------------------------------------
email: piyush.k@hcl.com---*/

/* ------------------ Referencing required class objects so that they will not be re-initialize ------------------------------*/

export class ModelController {
    constructor(EventControl, GridViewController) {
        this._EventControl = EventControl;
        this._GridViewController = GridViewController;
        this.model = [];

        this.isUnique = (modelSegment, model) => { // Class method so that accessible to other class methods
            let unique = {
                notUnique: false,
                index: -1
            };
            let index = -1;
            for (let [ArrIndex, m] of model.entries()) {

                if (m.name === modelSegment.name) {
                    index = ArrIndex; // Getting index so that correct model will be updated
                    break;
                } else {
                    unique.notUnique = false;                 //Takes unique names

                }
            }

            unique.index = index;
            return unique;
        }
        this.init();
    };
    convertToObj(stringOrObj) { //Websocket data message conversion to JSOM object if string                                  
        let jsonObj = '{}';
        if (typeof stringOrObj === "string") {
            jsonObj = JSON.parse(stringOrObj);
        }
        return jsonObj;
    };
    getDataMessage() { //Get data messages with event firing
        let args = arguments; // argument got passed from the event GENERATE_MODEL
        let dataMessage = this.convertToObj(args[1].rowModel);
        if (this.model.length){
              this.sortModel(); //Model Sorting
            }
        if (dataMessage.hasOwnProperty('bestBid')) {
            let unique = this.isUnique(dataMessage, this.model);

            if (unique.index === -1) {
                this.model.push(dataMessage);

            } else {
                this.model[unique.index] = dataMessage; //populating updating value only
                let self = this;
                setTimeout(function() {
                    self._EventControl.fire("NEXT_MID_PRICE_MODEL_UPDATE", dataMessage); // update Sparkline midprice
                }.bind(self), 100)
            }

            if (this.model.length){
              this.sortModel(); //Model Sorting
            }

            this._EventControl.fire("GENERATE_TABLE_STRUCT", this.model)
        }
    }
    sortModel(model) { //Model Sorting
        this.model.sort(function(a, b) {
            return parseFloat(a.lastChangeBid) - parseFloat(b.lastChangeBid) ; // If anyways lastChangeBid coming in string
        })
       // return this.model;
    }

    init() {
        let modelObj = {
            rowModel: "",
            gridModel: this.model
        }

        this._EventControl.subscribe({ //GENERATE_MODEL event subscribe
            "evtName": "GENERATE_MODEL",
            "fn": this.getDataMessage.bind(this)
        });

    }

}