/* --------------------------------------------------------
Generate Sparkline Component for DEV CHALLANGE

version: 0.0
last modified: 03.12.2017 by PK
author: Piyush Kanungo
Project Link: https://github.com/cyberkidpk/DevChallenge.git
-------------------------------------------------------
email: piyush.k@hcl.com---*/

/* ----------------Sparkline Controller added --------------------------*/

import {
	SparklineController
} from "../../shared/SparklineController";

/* ------------------ Referencing rquired class objects so that they will not be re-initialize ------------------------------*/

export class GridViewROW {
	constructor(EventController, ModelController) {
		// code
		this.props = {};
		this.SparklineController = SparklineController;

		this._EventController = EventController;
		this._ModelController = ModelController;

	}

	generateSparkLine(domId, index) { //Prepare to generate sparkline
		let targetDom = document.getElementById(domId),
			nextRefreshConfig = 30,
			startTime = new Date(),
			EventObj = this._EventController,
			ModelObj = this._ModelController,
			isEventSubscribed = ModelObj.model.length //if model length then Sparkline is subscribed

		/*------------------Skip initiation if sparkline already applied -----------------------------*/

		if (!document.getElementById(targetDom.id + "SLSpan")) {
			new this.SparklineController(targetDom.id, nextRefreshConfig, startTime, EventObj, ModelObj, isEventSubscribed, index)

		}

	};
	render(propsParam, index) {

		/* ----------------------Render HTML Template ------------------------*/
		let props = propsParam ? propsParam : this.props,
			domId = "SL" + props.name,
			isTR = document.getElementById("TR" + domId),
			outPutTemp = `<tr id="TR${domId}">\
						<td>${props.name}</td>\
						<td>${props.bestBid}</td>\
						<td>${props.bestAsk}</td>\
						<td>${props.lastChangeBid}</td>\
						<td>${props.lastChangeAsk}</td>\
						<td id="${domId}"></td>\				
					 </tr>`;
		let self = this;

		/*-------------Given pasuse so that dom will be ready for sparkline -----------------*/

		setTimeout(function() {
			self.generateSparkLine(domId, index);
		}.bind(self), 90)

		return outPutTemp;
	}

}