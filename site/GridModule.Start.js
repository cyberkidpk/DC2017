/* --------------------------------------------------------
Grid Modules Start Class for DEV CHALLANGE

version: 0.0
last modified: 03.12.2017 by PK
author: Piyush Kanungo
Project Link: https://github.com/cyberkidpk/DC2017.git
-------------------------------------------------------
email: piyush.k@hcl.com---*/


import {
  EventController
} from "./shared/EventController"; //Event Controller to subscribe and fire event on observer pattern

import {
  GridViewController
} from "./gridModule/Grid-view-controller"; //Grid view controller

import {
  GridViewComponentMain
} from "./gridModule/components/Grid-View-COMPONENT"; // Main grid component consists od Header and grid Row Component

import {
  ModelController
} from "./gridModule/model/ModelController"; // Model Controller

/* ---------------------------- Instantiating all classes at once so that will not be re initiate ----------------------*/

export default class GridModuleStart {
  constructor(targetDom) {
    this.targetDom = targetDom; // Starting DOM point element
  };

  gridModuleStart() { // Initializing all to controllers and components
    this.EventController = new EventController();
    this.ModelController = new ModelController(this.EventController);
    this.GridViewComponentMain = new GridViewComponentMain(this.EventController, this.ModelController);
    this.GridViewController = new GridViewController(this.EventController, this.targetDom, this.GridViewComponentMain, this.ModelController);

  }

  fireAddUpdateRow(dataMessages) { //Getting datamessages from the websocket

    let modelObj = {
      rowModel: dataMessages,
      gridModel: this.ModelController.model
    }
    this.EventController.fire("GENERATE_MODEL", modelObj)
  }

  start() {
    this.gridModuleStart()
  }
}

export var __useDefault = true;