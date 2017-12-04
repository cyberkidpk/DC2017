/* --------------------------------------------------------
Generate Sparkline Component for DEV CHALLANGE

version: 0.0
last modified: 03.12.2017 by PK
author: Piyush Kanungo
Project Link: https://github.com/cyberkidpk/DevChallenge.git
-------------------------------------------------------
email: piyush.k@hcl.com---*/

/* ----------------Grid Header Initialize only once --------------------------*/

export class GridViewHEADER {
	constructor(props) {
		this.props = props;                    //Passed on config properties
	}
	render(){
		var props = this.props;
		var outPutTemp = `<thead id="gridHeader">\
						<th>${props.name}</th>\
						<th>${props.bestBid}</th>\
						<th>${props.bestAsk}</th>\
						<th>${props.lastChangeBid}</th>\
						<th>${props.lastChangeAsk}</th>\	
						<th></th>\
					 </thead>`;
		return  outPutTemp;
	}

}
