require("dotenv").config();
const Blog = require("../models/blog");
const Package = require("../models/package");

const Guide = require("../models/guide");
const Tourist = require("../models/tourist");
const fs = require("fs");
const fileHelper = require("../utils/file");

exports.getDashboard = async (req, res, next) => {
  const blogs = await Blog.find({ status: "approved" }).limit(5);
  const blogLabels = blogs.map((b) => b.blogTitle);
  const blogLikes = blogs.map((b) => b.likes);

  const blogDislikes = blogs.map((b) => b.dislikes);
  res.render("admin/dashboard", {
    admin: req.admin,
    blogLabels: blogLabels,
    blogLikes: blogLikes,
    blogDislikes: blogDislikes,
    profileImage: false,
  });
};

exports.getLogin = (req, res, next) => {
  res.render("admin/adminlogin");
};

exports.postLogin = (req, res, next) => {
  const { aname, apass } = req.body;
  // if (req.session.isTouristLoggedIn || req.session.isAdminLoggedIn) {
  //   req.session.destroy((err) => {
  //     // console.log(err);
  //   });
  // }
  if (aname === process.env.ADMIN_ID && apass === process.env.ADMIN_PASS) {
    req.session.isAdminLoggedIn = true;
    req.session.admin = {
      adminname: process.env.ADMIN_ID,
      adminpass: process.env.ADMIN_PASS,
    };
    res.redirect("/admin-dashboard");
  } else {
    res.redirect("/admin-login");
  }
};
exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect("/");
  });
};

//blogs
exports.getBlogs = (req, res, next) => {
  Blog.find()
    .populate("author")
    .exec()
    .then((blogs) => {
      // return console.log(blogs);
      res.render("admin/blogs", {
        admin: req.admin,
        blogs: blogs,
        profileImage: false,
      });
    });
};

//packages
exports.getPackages = (req, res, next) => {
  Package.find()
    .populate("packageGuide")
    .exec()
    .then((packages) => {
      res.render("admin/packages", {
        admin: req.admin,
        packages: packages,
        profileImage: false,
      });
    });
};
exports.approveBlog = (req, res, next) => {
  const blogId = req.body.blogId;
  Blog.findByIdAndUpdate(blogId)
    .then((blog) => {
      blog.status = "approved";
      return blog.save();
    })
    .then((result) => {
      res.redirect("/admin-blogs");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.abortBlog = (req, res, next) => {
  const blogId = req.body.blogId;
  Blog.findByIdAndUpdate(blogId)
    .then((blog) => {
      blog.status = "disapproved";
      return blog.save();
    })
    .then((result) => {
      res.redirect("/admin-blogs");
    })
    .catch((err) => {
      console.log(err);
    });
};

//packages
exports.actionPackage = (req, res, next) => {
  const packageId = req.body.packageId;
  const action = req.body.action;
  Package.findByIdAndUpdate(packageId)
    .then((pack) => {
      pack.status = action;
      return pack.save();
    })
    .then((result) => {
      res.redirect("/admin-packages");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.viewBlog = (req, res, next) => {
  const blogId = req.body.blogId;
  Blog.findById(blogId)

    .populate("author")
    .exec()
    .then((blog) => {
      if (blog.status === "approved") {
        return res.redirect("/blog/" + blogId);
      }
      res.render("viewblog", {
        admin: req.admin,
        blog: blog,
        isview: true,
        isTouristAuth: false,
        profileImage: false,
      });
    });
};

exports.getGuides = (req, res, next) => {
  Guide.find()
    .populate("packages")
    .exec()
    .then((guides) => {
      res.render("admin/allGuideList", {
        admin: req.admin,
        guides: guides,
        profileImage: false,
      });
    });
};

exports.getTourists = (req, res, next) => {
  Tourist.find().then((tourists) => {
    res.render("admin/allTourist", {
      admin: req.admin,
      tourists: tourists,
      profileImage: false,
    });
  });
};

//actions
exports.guideAction = (req, res, next) => {
  const guideId = req.body.guideId;
  const action = req.body.action;
  let status = false;
  if (action === "approved") {
    status = true;
  }
  Guide.findById(guideId)
    .then((guide) => {
      guide.guideAccepted = status;
      return guide.save();
    })
    .then((result) => {
      res.redirect("/admin-guides");
    })
    .catch((err) => {
      console.log(err);
    });
};
