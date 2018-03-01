"use strict";

const fs = require('fs');
const {Map, Ride, Pos} = require('./map');

class Parser {
	static parse(filename) {
		const map = new Map();
		const file = fs.readFileSync(filename).toString();

		file.split('\n')
		file.split('\n').map((line, idx) => {
			const tokens = line.split(' ');

			if (!idx) {
				map.height = tokens[0];
				map.width = tokens[1];
				map.vehicles = tokens[2];
				map.ridesNb = tokens[3];
				map.bonus = tokens[4];
				map.steps = tokens[5];
				map.rides = [];
			} else {
				map.rides[idx - 1] = new Ride();
				map.rides[idx - 1].startPos = new Pos(tokens[0], tokens[1]);
				map.rides[idx - 1].endPos = new Pos(tokens[2], tokens[3]);
				map.rides[idx - 1].startTime = parseInt(tokens[4]);
				map.rides[idx - 1].endTime = parseInt(tokens[5]);
			}
		});

		return map;
	}
}

module.exports = Parser;