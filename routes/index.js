const router = require("express").Router();
const userRoutes = require("./userRoutes");
const streamerRoutes = require("./streamerRoutes");

router.use("/", userRoutes);
router.use("/streamer", streamerRoutes);


module.exports = router;


