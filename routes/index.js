// Imports
const router = require('express').Router();
const userRoutes = require('./userRoutes'); 
// Import userRoutes directly
const thoughtRoutes = require('./thoughtRoutes'); 
// Import thoughtRoutes directly

// Middleware
router.use('/users', userRoutes); 
// Use userRoutes directly
router.use('/thoughts', thoughtRoutes); 
// Use thoughtRoutes directly

router.use((req, res) => res.send("You're lost. This route doesn't exist."));

// Exports
module.exports = router;
