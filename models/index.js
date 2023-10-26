//import users and thoughts
const Users = require('./users');
const Thoughts = require('./thoughts');

//export users and thoughts 
module.exports = { Users, Thoughts };

//I combined both in index.js to make it easier to access Users and Thoughts in other code where you can just import index.js {Users and Thoughts}     
// Path: models/index.js
