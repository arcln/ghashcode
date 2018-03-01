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
		this.id = -1;
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

	getRideFinalStep(step) {
		let position = new Pos();
		let lastRide = null;
		let lastRideStep = 0;
		let distance;
		let offset = 0;
		let i = 0;

		while (i < this.steps.length() && i < step) {
			if (this.steps[i]) {
				if (lastRide) {
					distance = lastRide.getLength() + Pos.getDistance(lastRide.endPos, position) + offset;
					offset = lastRide.endTime - lastRide.startTime;
					position = this.steps[i].pos;
					i += distance;
				}
				lastRide = this.steps[i];
				lastRideStep = i;
			} else {
				++i;
			}
		}
		return i + offset;
	}

	isAvailable(map, step, destination) {
		let ride;
		let maxLength = 0;
		let totalDistance = 0;
		let finalStep;


		finalStep = getRideFinalStep(step);
		if (finalStep >= step)
			return (false);

		ride = getRideAtStep(step);
		if (ride) {
			totalDistance = ride.getLength() + Pos.getDistance(ride.endPos, destination);
			maxLength = step - ride.startTime;
		}

		if (maxLength < map.steps)
			maxLength = map.steps;

		return (totalDistance > maxLength)
	}
}

module.exports = {
	Vehicle, Map, Ride, Pos
};