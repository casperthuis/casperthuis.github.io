
// Least squares test

var lsq = require('least-squares')

//(1, 6), (2,5), (3,7), (4,10)
var X = [1,2,3,4]
var Y = [6,5,7,10]

 var ret = {}
 var f = lsq(X, Y, ret)
console.dir(ret) //{ m: 1.4, b: 3.5 }
	console.log(f(3.6)) //8.54

	var f = lsq(X, Y, true, ret)
	console.dir(ret) //{ m: 1.4, b: 3.5, bErr: 1.7748239349298847, mErr: 0.648074069840786 }

