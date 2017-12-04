/* --------------------------------------------------------
Entry point of Grid Modules for DEV CHALLANGE

version: 0.0
last modified: 03.03.2017 by Piyush Kanungo
author: Piyush Kanungo
Project Link: https://github.com/cyberkidpk/DevChallenge.git
-------------------------------------------------------
email: piyush.k@hcl.com---*/

// Loading Index.html
require('./site/index.html')

// Apply the styles in style.css to the page.
require('./site/style.css')

//Initialization of GRID Module, taking default to make it require competible
var StartGridModule = require('./site/GridModule.Start').default,
	gridStart = null; // Grid Start variable

//Making it debug true
global.DEBUG = true

const url = "ws://localhost:8011/stomp"
const client = Stomp.client(url)

client.debug = function(msg) {
	if (global.DEBUG) {
		console.info(msg)
	}
}

function connectCallback() {
	let targetDom = document.getElementById("grid-view");  //Initial DOM element to start Grid Module
	gridStart = new StartGridModule(targetDom)             // Instantiate Grid Start Class
	gridStart.start(); 									   //initialize grid

}

/*--------------- Storm subscribe callback --------------*/

function fireUpdate() {
	let args = arguments;
	console.log(args);
	gridStart.fireAddUpdateRow(args[0].body)
}

/* ------------------ Subscribing Stomp-----------------------*/

setTimeout(function() {
	client.subscribe("/fx/prices", fireUpdate);
	client.send("/fx/prices", {
		priority: 9
	}, "Hello, STOMP");
}, 1000)


client.connect({}, connectCallback, function(error) {
	alert(error.headers.message)
})
