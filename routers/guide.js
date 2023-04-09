const router = require("express").Router();
const guideController = require("../controllers/guide");
const isTAuth = require("../middleware/isGAuth");
const isGLoggedin = require("../middleware/isGLoggedin");

// const touristController = require("../controller/tourist");

const upload = require("../utils/uploads");

router.get("/guide-dashboard", isGLoggedin, guideController.getGuideDashboard);
router.get(
  "/add-package",
  isGLoggedin,

  guideController.getAddPackage
);
router.post(
  "/add-package",
  isGLoggedin,
  upload.single("pimage"),
  guideController.postAddPackage
);
router.get("/guide-packagelist", isGLoggedin, guideController.getPackageList);
router.post("/guide-delete", isGLoggedin, guideController.deletePackage);

// router.get("/profile", isLoggedin, guideController.getProfile);
// router.get("/edit-profile", isLoggedin, guideController.getEditProfile);
// router.post(
//   "/edit-profile",
//   upload.single("gimage"),
//   isLoggedin,
//   guideController.postEditProfile
// );

router.get("/guide-login", isTAuth, guideController.getLogin);
router.post("/guide-login", isTAuth, guideController.postLogin);
router.get("/guide-register", isTAuth, guideController.getRegister);
router.post("/guide-register", isTAuth, guideController.postRegister);
router.post("/guide-logout", guideController.postLogout);
//blogs
router.get("/guide-addblog", isGLoggedin, guideController.getAddBlog);
router.get("/guide-bloglist", isGLoggedin, guideController.getBlogList);
router.post("/guide-blog/view", isGLoggedin, guideController.viewBlog);

//package

// router.get("/booking/:id", isLoggedin, guideController.getBookingList);
// router.post("/invoice", isLoggedin, touristController.getInvoice);

module.exports = router;
