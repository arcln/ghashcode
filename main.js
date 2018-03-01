"use strict";

const Parser = require('./parser');

let map = Parser.parse('map.txt');
console.log(map);