/* --------------------------------------------------------
Generate Sparkline Component for DEV CHALLANGE

version: 0.0
last modified: 03.12.2017 by PK
author: Piyush Kanungo
Project Link: https://github.com/cyberkidpk/DevChallenge.git
-------------------------------------------------------
email: piyush.k@hcl.com---*/

/* ----------------Grid Header and Grid View Row Initialize only once --------------------------*/
import {
	GridViewHEADER
} from "./Grid-View-HEADER";

import {
	GridViewROW
} from "./Grid-View-ROW";

export class GridViewComponentMain {
	constructor(EventController, ModelController) {
		// Grid config passed to generate one time header
		let headerConfig = {
			name: "Name",
			bestBid: "Best Bid",
			bestAsk: "Best Ask",
			lastChangeBid: "Last Changed Bid",
			lastChangeAsk: "Last Changed Ask"
		}

		this.model = ModelController.model;
		this.GridViewHEADER = new GridViewHEADER(headerConfig); //Grid Header
		this.GridViewROW = new GridViewROW(EventController, ModelController); //Grid Row
		this.render(this.model)

	}

rowGenerator(model) {
		let finalSegment = "";
		if (model && model.length) {
			for (let [index, props] of model.entries()) {

				finalSegment += this.GridViewROW.render(props,index); //Row generation
			}
			return finalSegment; //All sorted rows
		}
	}

render(model) {
		let props = model ? model : this.model;
		let outPutTemp = "";
		outPutTemp += "<table id='cpGrid'>";
		outPutTemp += this.GridViewHEADER.render(); //one time header
		outPutTemp += this.rowGenerator(props); // all Rows
		outPutTemp += "</table>";
		return outPutTemp; // Complete grid commonent
	}

}