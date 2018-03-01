"use strict";

const Parser = require('./parser');
const Vehicle = require('./map').Vehicle;
const Solution = require('./solution');

function evalRun(map, solution) {
	let finalPoints = 0;

	solution.rides.forEach(ride => {
		let points = ride.endTime - ride.startTime;

		if (ride.startTime === 0) {
			points += map.bonus;
		}

		finalPoints += points;
	});
}

let map = Parser.parse('maps/map.txt');
let solution = new Solution(map);
let vehicles = [];
for (let i = 0; i < map.vehicles; i++) {
	vehicles.push(new Vehicle);
}

solution.compute();
evalRun(map, solution);
