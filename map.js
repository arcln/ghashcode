"use strict";

class Pos {
	constructor() {
		this.x = 0;
		this.y = 0;
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
		return Math.abs(this.startPos.x - this.endPos.x) +
			Math.abs(this.startPos.y - this.endPos.y);
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

	isAvailable(map, step, destination) {
		let i = step;

		while (!this.steps[i] && i >= 0)
			i--;

		let ride = this.steps[i];
		if (!ride)
			return (true);
		let maxLength = step - i;

		if (maxLength < map.steps)
			maxLength = map.steps;
		return (ride.getLength() <= maxLength);
	}
}

module.exports = {
	Vehicle, Map, Ride, Pos
};