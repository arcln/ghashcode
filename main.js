"use strict";

const Parser = require('./parser');
const Vehicle = require('./map').Vehicle;
const Solution = require('./solution');
const fs = require('fs');

function evalRun(map, solution) {
	let finalPoints = 0;

	solution.vehicles.forEach(vehicle => {
		vehicle.steps.forEach(step => {
			if (step) {
				let points = step.endTime - step.startTime;
				if (step.startTime === 0) {
					points += parseInt(map.bonus);
				}
				finalPoints += points;
			}
		});

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

		const line = vehicle.rides.length + " " + vehicle.rides.join();
		out += line + '\n';
	});

	fs.writeFile(process.argv[2] + '.out', out, err => {
		if (err)
			throw err;
		else
			console.log('ok')
	});
}

let map = Parser.parse(process.argv[2]);
let vehicles = [];
let runs = [];
for (let i = 0; i < map.vehicles; i++) {
	vehicles.push(new Vehicle);
}

let bestRun = 0;
for (let i = 0;; i++) {
	let solution = new Solution(map);
	solution.compute();
	const val = evalRun(map, solution);
	if (val > bestRun) {
		console.log('Found better solution at iteration ' + i + ': ' + val + ' (old: ' + bestRun + ')');
		bestRun = val;
		dumpRun(map, solution);
	}
}