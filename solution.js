"use strict";

const {Map, Ride, Pos, Vehicle} = require('./map');

class Solution {
        constructor(map) {
                this.map = map;
                this.vehicles = [];
                for (let it = 0; it < map.vehicles; it += 1) {
                        this.vehicles[it] = new Vehicle();
                }
        }

        skipRide() {
                const pound = Math.random();
                return (Math.random() <= pound);
        }

        hasAvailableCar(step, rideIt) {
                return this.vehicles.some(car => car.isAvailable(step, this.map.rides[rideIt], this.map));
        }

        getAvailableCar(step, rideIt) {
                if (!this.hasAvailableCar(step, rideIt))
                        return null;

                let car;
                do {
                        car = this.vehicles[Math.floor(Math.random() * this.vehicles.length)];
                } while (!car.isAvailable(step, rideIt, this.map));

                return car;
        }

        compute() {
                let step = 0;

                for (let rideIt = 0; rideIt < this.map.ridesNb && step <= this.map.steps; rideIt += 1) {
                        let car;

                        if (this.skipRide())
                                continue;

                        do {
                                car = this.getAvailableCar(step, rideIt);
                                if (!car)
                                        step += 1;
                        } while (!car && step < this.map.steps);

                        if (car) {
							car.assignRide(step, this.map.rides[rideIt]);
						}
                }
        }
}

module.exports = Solution;
