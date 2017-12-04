/* --------------------------------------------------------
Grid Controller to control Component , Model, View Modules  for DEV CHALLANGE
version: 0.0
last modified: 03.12.2017 by PK
author: Piyush Kanungo
Project Link: https://github.com/cyberkidpk/DevChallenge.git
-------------------------------------------------------
email: piyush.k@hcl.com---*/
/* ------------------ Referencing all class objects so that they will not be re-initialize ------------------------------*/

export class GridViewController {
	
constructor(EventControl, targetDom, GridViewComponentMain, ModelController) {
		this._EventControl = EventControl; //Event object reference on GridViewController Instantiation
		this._targetDom = targetDom;
		this._ModelControl = ModelController; //Model Controller object  
		this._GridViewComponentMain = GridViewComponentMain; //Grid Component consist of Header and Rows

		let ModelControllerObj = this._ModelControl.init.bind(this._ModelControl)

		this._EventControl.subscribe({
			evtName: "GENERATE_TABLE_STRUCT",
			fn: this.init.bind(this)
		});
	};
	/*
		getCurrencyPair(dataMessage, model) {
			let modelObj ={
				rowModel:dataMessage,
				gridModel : model
			}
			//this._EventControl.fire("GENERATE_MODEL", modelObj)
			//this._EventControl.subscribe(ModelControllerObj);
		};*/
	convertToObj(stringOrObj) { //Data messages from websocket coming as String converting
		let jsonObj = '{}';
		if (typeof stringOrObj === "string") {
			jsonObj = JSON.parse(stringOrObj);
		}
		return jsonObj;
	};

	generateTable() {
		let args = arguments;
		this.renderDom(args[1]); /* Generating Table */
	};

	renderDom() {
		var args = arguments;
		this._targetDom.innerHTML = this._GridViewComponentMain.render(args[1]); // Rendering on grid-view dom element
	}

	init() {
		let args = arguments;
		//this.getCurrencyPair(args[1], this._ModelControl.model);
		this.generateTable();
	}
}