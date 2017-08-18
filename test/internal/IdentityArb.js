'use strict';

var Identity = require('sanctuary-identity');
var Z = require('sanctuary-type-classes');

//  IdentityArb :: Arbitrary a -> Arbitrary (Identity a)
module.exports = function IdentityArb(arb) {
  return arb.smap(Identity, function (a) { return a.value; }, Z.toString);
};
