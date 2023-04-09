const router = require("express").Router();
const touristController = require("../controllers/tourist");
const isTouristAuth = require("../middleware/isTAuth");
const isTouristLoggedIn = require("../middleware/isTLogged");
const upload = require("../utils/uploads");

//auth
router.get("/tourist-login", isTouristAuth, touristController.getLogin);
router.get("/tourist-signup", isTouristAuth, touristController.getSignup);
router.post("/tourist-signup", touristController.postSignup);
router.post("/tourist-login", touristController.postLogin);
router.post("/tourist-logout", touristController.postLogout);

//dashboard
router.get(
  "/tourist-dashboard",
  isTouristLoggedIn,
  touristController.getDashboard
);
router.get("/tourist-profile", isTouristLoggedIn, touristController.getProfile);
router.get(
  "/tourist-edit-profile",
  isTouristLoggedIn,
  touristController.getEditProfile
);
router.post(
  "/tourist-edit-profile",
  upload.single("timage"),
  isTouristLoggedIn,
  touristController.postEditProfile
);

router.get(
  "/tourist-bookedpackage",
  isTouristLoggedIn,
  touristController.getBookedPackage
);
router.post("/invoice", isTouristLoggedIn, touristController.getInvoice);
module.exports = router;
