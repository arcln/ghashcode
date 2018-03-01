"use strict";

const Parser = require('./parser');

let map = Parser.parse('./maps/map.txt');
console.log(map);
