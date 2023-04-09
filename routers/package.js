const router = require("express").Router();
const packageController = require("../controllers/package");
const isTouristAuth = require("../middleware/isTAuth");
const isTouristLoggedIn = require("../middleware/isTLogged");
router.get("/packages", packageController.getAllPackages);

router.get("/package/:packageId", packageController.getPackage);
router.get("/booking/:id", isTouristLoggedIn, packageController.getBooking);

router.post("/booking", isTouristLoggedIn, packageController.postBooking);

module.exports = router;
