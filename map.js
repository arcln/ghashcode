"use strict";

class Pos {
	constructor() {
		this.x = 0;
		this.y = 0;
	}

	static getDistance(a, b) {
		return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
	}
}

class Ride {
	constructor() {
		this.startPos = new Pos();
		this.endPos = new Pos();
		this.startTime = 0;
		this.endTime = 0;
	}

	getLength() {
		return getDistance(this.startPos, this.endPos);
	}
}

class Map {
	constructor() {
		this.width = 0;
		this.height = 0;
		this.vehicles = 0;
		this.ridesNb = 0;
		this.bonus = 0;
		this.steps = 0;
		this.rides = null;
	}
}

class Vehicle {
	constructor() {
		this.pos = new Pos();
		this.steps = [];
	}

	assignRide(ride, step) {
		this.steps[step] = ride;
	}

	getRideAtStep(step) {
		let i = step;

		while (!this.steps[i] && i >= 0)
			i--;
		return (this.steps[i]);
	}

	getDistance(position) {
		return getDistance(position, this.pos);
	}

	// getPositionAtStep(map, step) {
	// 	let position = new Pos();
	// 	let lastRide = null;
	// 	let distance;
	// 	let i = 0;

	// 	while (i < this.steps.length() && i < step) {
	// 		if (this.steps[i]) {
	// 			if (lastRide) {
	// 				distance = Pos.getDistance(this.pos, position);
	// 				position = this.steps[i].pos;
	// 				i += distance;
	// 			}
	// 			lastRide = this.steps[i];
	// 		} else {
	// 			++i;
	// 		}
	// 	}
	// 	return position;
	// }

	isAvailable(map, step, destination) {
		let ride;
		let maxLength;
		let totalDistance = 0;

		ride = getRideAtStep(step);
		if (ride)
			totalDistance += ride.getLength();
		totalDistance += Pos.getDistance(ride.endPos, destination);
		maxLength = step - ride.startTime;

		if (maxLength < map.steps)
			maxLength = map.steps;

		return (totalDistance > maxLength)
	}
}

module.exports = {
	Vehicle, Map, Ride, Pos
};