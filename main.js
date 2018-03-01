"use strict";

const Parser = require('./parser');
const Vehicle = require('./map').Vehicle;
const Pos = require('./map').Pos;

let map = Parser.parse('./maps/map.txt');
console.log(map);

let vehicles = [];
for (let i = 0; i < map.vehicles; i++) {
	vehicles.push(new Vehicle);
}
