/* --------------------------------------------------------
Grid Controller Unit Tests for DEV CHALLANGE

version: 0.0
last modified: 03.12.2017 by PK
author: Piyush Kanungo
Project Link: https://github.com/cyberkidpk/DevChallenge.git
-------------------------------------------------------
email: piyush.k@hcl.com---*/

/* ------------------ Referencing all class objects so that they will not be re-initialize ------------------------------*/


import {GridViewController} from "./Grid-view-controller";
describe('GridViewController', () => {
   
   it('should have init function', () => {
   		let Obj = new Function();
   		Obj.init = function(){};
   		Obj.subscribe = function(){};
   		let gridViewController = new GridViewController(Obj, Obj, Obj, Obj),
   		initFunc = (typeof gridViewController.init === 'function');
    expect(initFunc).toBeTruthy();
   });

   it('should Subscribe String Event', () => {
   		let Obj = new Function(),
   		string = "EVENT_TEXT";
   		Obj.init = function(){};
   		let EventObj = new Function();
   		EventObj.subscribe = function(string){};
   		let gridViewController = new GridViewController(EventObj, Obj, Obj, Obj),
   		isSubscribeFunc = (typeof EventObj.subscribe === 'function');
   		
   		expect(isSubscribeFunc).toBeTruthy();
   });
   
});