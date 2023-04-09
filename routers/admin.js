const router = require("express").Router();
const adminConroller = require("../controllers/admin");
const isAdminLoggedin = require("../middleware/isALogged");
const isAmdinAuth = require("../middleware/isALogged");
const upload = require("../utils/uploads");
router.get("/admin-login", adminConroller.getLogin);
router.post("/admin-login", adminConroller.postLogin);

router.get("/admin-dashboard", isAdminLoggedin, adminConroller.getDashboard);

router.post("/admin-logout", adminConroller.postLogout);
//blogs

router.get("/admin-blogs", isAdminLoggedin, adminConroller.getBlogs);
router.post("/admin-blog/approve", isAdminLoggedin, adminConroller.approveBlog);
router.post("/admin-blog/abort", isAdminLoggedin, adminConroller.abortBlog);
router.post("/admin-blog/view", isAdminLoggedin, adminConroller.viewBlog);

//packages
router.get("/admin-packages", isAdminLoggedin, adminConroller.getPackages);
router.post(
  "/admin-package/action",
  isAdminLoggedin,
  adminConroller.actionPackage
);

//users
router.get("/admin-guides", isAdminLoggedin, adminConroller.getGuides);
router.get("/admin-tourists", isAdminLoggedin, adminConroller.getTourists);
router.post("/admin-guide/action", isAdminLoggedin, adminConroller.guideAction);
module.exports = router;
