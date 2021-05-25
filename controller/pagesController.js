
const connection = require('../config/connectionDB')



let getDashBoard = async (req, res) =>{
   
    connection.query("SELECT fullname, vehicle_brand_model, rent_startDate, rent_endDate, status FROM bookings_tbl INNER JOIN cars ON bookings_tbl.vehicle_id = cars.id INNER JOIN users ON bookings_tbl.user_id = users.id", 
    function (err, row, fields)
    {
        if(err){
            console.log(err)
        }
        else{
          res.render("index.ejs", {bookings : row})
        }
        // res.render("index.ejs", {bookings : bookings})
        // console.log(bookings)
        // res.send(bookings)
    })
};

let getProfile = async (req, res) => {
    return res.render("profile.ejs")
};


let getBookings = async (req, res) => {

    connection.query("SELECT fullname, vehicle_brand_model, rent_startDate, rent_endDate, statusFROM bookings_tbl INNER JOIN cars ON bookings_tbl.vehicle_id = cars.id INNER JOIN users ON bookings_tbl.user_id = users.id;", (req, bookings) => {
        res.render("booking.ejs", {bookings : bookings})
    })
};

let carListPage = async (req, res) => {

    connection.query("SELECT * FROM cars", (req, cars) => {
        return res.render("carlist.ejs", {cars: cars});
    })
};

module.exports = {  
    getDashBoard : getDashBoard,
    carListPage : carListPage,
    getProfile : getProfile,
    getBookings : getBookings
}       