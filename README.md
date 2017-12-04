#DevChallenge	

GRID OVERVIEW

You should request the topic /fx/prices, to receive update messages with a body that looks like this:
{
  "name": "usdjpy",
  "bestBid": 106.7297012204255,
  "bestAsk": 107.25199883791178,
  "openBid": 107.22827132623534,
  "openAsk": 109.78172867376465,
  "lastChangeAsk": -4.862314256927661,
  "lastChangeBid": -2.8769211401569663
}

Idea is to show  currency pairs in a table with rows for each currency pair, which includes columns for at least the name, the current best bid price, current best ask price, the amount that the best bid last changed, and the amount the best ask price last changed. This data can be read out of the price updates that are sent via stomp. There are a limited number of currency pairs, and multiple updates will be sent for each one. 


The table should be sorted (and remain sorted) by the column that indicates how much the best bid price last changed (lastChangeBid in the response data).
Classes
Classes all written in ES6, to taken advantage of modular approach made Grid Module a standalone component initiate on starting DOM element “grid-view” at index.html.

#There are start Class “GridModuleStart” below classes

Model
-	ModelController : Model Creation Class Controller
Views
-	GridViewComponentMain: Main Component consists of both one time Header and dynamic Table Rows
-	GridViewHEADER
-	GridViewROW
Controller
-	GridViewController :  Grid View Controller, controllers model, view and controller

Shared 
EventController- Event subscription and firing of event on observer pattern
SparklineController  - Sparkline controller


Grid Module tries to use all the available code techniques so some places it is just unconsistent, Idea is to show all values in different style.

#Sparkline

As Currency pair data is dynamically changing so as view to keep persisted Sparkline is bit of challenge as not dynamic changes DOM got lost and attach sparkline as well. To make it work I added corresponding absolute standalone sparkline dom element each row and appended it to body and positioned it to respective last cell of each row. As it is standalone so it does not matter how data is getting populated and if table row is on dom or not. Whenever currency pair row available sparkline will be shown.  

#Unit Testing
Additionally Install Dev Dependencies
- npm install --only=dev
- npm test
