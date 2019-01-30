j = require('./../src/libs');

Object.keys(j).map(i => console.log(`${i}:`, j[i](i == 'req-TWO' ? null : 'YO')));
j = require('./../src/libs2');

Object.keys(j).map(i => console.log(`${i}:`, j[i](['Mary', 'Jane', 'Test'])));
