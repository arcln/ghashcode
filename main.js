"use strict";

const Parser = require('./parser');
const Vehicle = require('./map').Vehicle;
const Solution = require('./solution');
const fs = require('fs');

function evalRun(map, solution) {
	let finalPoints = 0;

	solution.rides.forEach(ride => {
		let points = ride.endTime - ride.startTime;

		if (ride.startTime === 0) {
			points += map.bonus;
		}

		finalPoints += points;
	});

	return finalPoints;
}

function dumpRun(map, solution) {
	let out = "";

	solution.vehicles.forEach(vehicle => {
		vehicle.rides = [];
		vehicle.steps.forEach(step => {
			if (step) {
				vehicle.rides.push(step.id);
			}
		});

		const line = vehicles.rides.length + " " + vehicles.rides.join();
		out += line + '\n';
	});

	fs.delete('response.txt');
	fs.appendFile('response.txt', out);
}

let map = Parser.parse('maps/map.txt');
let solution = new Solution(map);
let vehicles = [];
let runs = [];
for (let i = 0; i < map.vehicles; i++) {
	vehicles.push(new Vehicle);
}

let bestRun = 0;
for (let i = 0;; i++) {
	solution.compute();
	const val = evalRun(map, solution);
	if (val > bestRun) {
		console.log('Found better solution at iteration ' + i + ': ' + val + ' (old: ' + bestRun + ')');
		bestRun = val;
		dumpRun(map, solution);
	}
}