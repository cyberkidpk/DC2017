/* --------------------------------------------------------
Grid Controller to control Component , Model, View Modules  for DEV CHALLANGE

version: 0.0
last modified: 03.12.2017 by PK
author: Piyush Kanungo
Project Link: https://github.com/cyberkidpk/DevChallenge.git
-------------------------------------------------------
email: piyush.k@hcl.com---*/

/* ------------------ Observer pattern event controller ------------------------------*/

export class EventController {
    constructor() {
        this.handlers = [];
    }
    subscribe(eventObj) {
        // alert(JSON.stringify(eventObj));
        this.handlers.push(eventObj);
    };
    unsubscribe(fn) {
        this.handlers = this.handlers.filter(
            item => {
                if (item.fn !== fn) {
                    return item;
                }
            }
        );
    };
    fire(evtName, arg, thisObj) {
        var scope = thisObj || window;
        this.handlers.forEach((item) => {
            if (item.evtName === evtName) {
                //         console.log(item.fn);
                item.fn.call(item.fn, evtName, arg); //Modified observer pattern to server grid module need
            } else if (item.evtName === "All") { // Never used
                item.fn.call(scope, evtName, arg);
            }
        });
    }
};