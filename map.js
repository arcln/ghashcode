"use strict";

class Pos {
	constructor() {
		this.x = 0;
		this.y = 0;
	}
}

class Ride {
	constructor() {
		this.startPos = new Pos();
		this.endPos = new Pos();
		this.startTime = 0;
		this.endTime = 0;
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

module.exports = {
	Map, Ride, Pos
};