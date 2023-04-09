require("dotenv").config();
const bcrypt = require("bcrypt");
const Tourist = require("../models/tourist");
const fs = require("fs");
const fileHelper = require("../utils/file");
const Booked = require("../models/booked");
const { populate } = require("../models/tourist");

exports.getLogin = (req, res, next) => {
  const prevPage = req.get("referer");

  res.render("tourist/touristlogin", {
    pageTitle: "Travel World | Toursit Login",
    path: "/login",
    prevPage: prevPage,
  });
};

exports.postLogin = async (req, res, next) => {
  const temail = req.body.temail;
  const tpass = req.body.tpass;
  const prevPage = req.body.prevPage;

  Tourist.findOne({ touristEmail: temail })
    .then((tourist) => {
      if (!tourist) {
        return res.redirect("/tourist-login");
      }
      bcrypt
        .compare(tpass, tourist.touristPassword)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isTouristLoggedIn = true;
            req.session.tourist = tourist;
            return req.session.save((err) => {
              res.redirect("/tourist-dashboard");
            });
          }
          res.redirect("/tourist-login");
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/tourist-login");
        });
    })
    .catch((err) => console.log(err));
};

exports.getSignup = (req, res, next) => {
  res.render("tourist/touristsignup", {
    pageTitle: "Travel World | Toursit Signup",
    path: "/signup",
  });
};

exports.postSignup = async (req, res, next) => {
  const { tname, temail, tpass, phone, tpassc } = req.body;

  if (await Tourist.findOne({ touristEmail: temail })) {
    return res.redirect("/tourist-signup");
  }

  const hashedPass = await bcrypt.hash(tpassc, 12);
  const tourist = new Tourist({
    touristPassword: hashedPass,
    touristEmail: temail,
    name: tname,
    phone: phone,
  });

  // tourist.save((err, t) => {
  //   if (err) {
  //     console.log(err);
  //     res.redirect("/tourist-signup");
  //   }
  //   res.redirect("/tourist-login");
  // });
  tourist
    .save()
    .then((result) => {
      res.redirect("/tourist-login");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect("/");
  });
};

exports.getDashboard = (req, res, next) => {
  // return console.log(re)
  res.render("tourist/tdashboard", {
    pageTitle: "Travel World | Toursit Dashboard",
    path: "/dashboard",
    tourist: req.tourist,
  });
};

exports.getProfile = (req, res, next) => {
  if (!req.tourist.profileComplete) {
    return res.redirect("/tourist-edit-profile");
  }
  res.render("tourist/profile", {
    pageTitle: "Travel World | Toursit Profile",
    path: "/profile",
    tourist: req.tourist,
    profileImage: req.tourist.touristImage,
  });
};

exports.getEditProfile = (req, res, next) => {
  res.render("tourist/edit-profile", {
    pageTitle: "Travel World | Toursit Edit Profile",
    path: "/tourist/edit-profile",
    tourist: req.tourist,
    profileImage: req.tourist.touristImage,
  });
};
exports.postEditProfile = (req, res, next) => {
  const profileImage = req.file;

  let image = req.tourist.touristImage;
  if (profileImage) {
    const pathImg = "upload/images/" + image;
    if (image && fs.existsSync(pathImg)) {
      fileHelper.deleteFiles(pathImg);
    }
    image = profileImage.filename;
  }
  //   return console.log(profileImage, image);
  const {
    phone,

    address,
    name,
  } = req.body;
  //   return console.log(req.body);

  Tourist.findOne({ _id: req.tourist._id })
    .then((tourist) => {
      tourist.name = name;
      tourist.touristImage = image;

      tourist.phone = phone;

      tourist.touristAddress = address;

      tourist.profileComplete = true;
      return tourist.save();
    })
    .then((result) => {
      res.redirect("/tourist-profile");
    })
    .catch((err) => console.log(err));
};

exports.getBookedPackage = (req, res, next) => {
  const touristId = req.tourist._id;
  Tourist.findById(touristId)
    .populate({
      path: "booked",
      model: "Booked",
      populate: {
        path: "packageId",
        model: "Package",
      },
    })

    .then((tourist) => {
      // console.log(tourist.booked[0].packageId);
      res.render("tourist/booked-package", {
        pageTitle: "Travel World | Toursit Booked Package",

        tourist: tourist,
        profileImage: req.tourist.touristImage,
      });
    });
};

exports.getInvoice = (req, res, next) => {
  let logintype = "none";
  if (req.session.isAdminLoggedIn) {
    logintype = "admin";
  } else if (req.session.isLoggedIn) {
    logintype = "guide";
  } else if (req.session.isTouristLoggedIn) {
    logintype = "tourist";
  }
  const bookedId = req.body.bookedId;
  Booked.findById(bookedId)
    .populate({
      path: "packageId",
      model: "Package",
      populate: {
        path: "packageGuide",
        model: "Guide",
      },
    })

    .then((booked) => {
      res.render("package/invoice", {
        pageTitle: "Travel World | Toursit Invoice",
        booked: booked,
        logintype: logintype,
      });
    });
};
