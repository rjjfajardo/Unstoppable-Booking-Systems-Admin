
const express = require('express')
const homePageController = require('../controller/homeController')
const loginController = require('../controller/loginController')
const registerController = require('../controller/registerController')
// const indexController = require('../controller/indexController')
const pagesController = require('../controller/pagesController')

const newCarController = require('../controller/newCarController')

const auth = require('../validation/authValidation')
const passport = require('passport')
const initPassportLocal = require('../controller/passportController')


// Init all passport
initPassportLocal();

let router = express.Router();

let initWebRoutes = (app) => {
    

    // authentication 
    router.get("/", loginController.checkLoggedIn, homePageController.handleHelloWorld);
    router.get("/login",loginController.checkLoggedOut, loginController.getPageLogin);
    router.post("/login", passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        successFlash: true,
        failureFlash: true
    }));

    router.get("/register", registerController.getPageRegister);
    router.post("/register", auth.validateRegister, registerController.createNewUser);
    router.post("/logout", loginController.postLogOut);





    router.get("/profile", pagesController.getProfile)
    router.get("/bookings", pagesController.getBookings)
    router.get("/carlist", pagesController.carListPage)


    router.get("/caredit/:car_id", pagesController.carUpdate)

   
    
    router.get("/carinfo/:car_id", pagesController.carInformation)

    router.post("/carlist/", pagesController.carEditInfo)

    router.post("/bookings", pagesController.bookingConfirmation)

    router.post("/bookings/:booking_id", pagesController.deleteBookings)
    // router.get("/carlist/:car_id", pagesController.carListPage)
  

    router.get("/carform", newCarController.getForm)
    router.post("/carform", newCarController.createListing)



    return app.use("/", router);
};
module.exports = initWebRoutes;
