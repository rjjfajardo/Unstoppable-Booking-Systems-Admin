
const connection = require('../config/connectionDB')





let getProfile = async (req, res) => {
    return res.render("profile.ejs")
};


let getBookings = async (req, res) => {

    connection.query("SELECT bookings_tbl.booking_id, fullname, vehicle_brand_model, plate_no, rent_startDate, rent_endDate, status FROM bookings_tbl INNER JOIN cars ON bookings_tbl.vehicle_id = cars.id INNER JOIN users ON bookings_tbl.user_id = users.id AND bookings_tbl.status = 'success'", (req, success) => {
        
        connection.query("SELECT bookings_tbl.booking_id, fullname, vehicle_brand_model, plate_no, rent_startDate, rent_endDate, status FROM bookings_tbl INNER JOIN cars ON bookings_tbl.vehicle_id = cars.id INNER JOIN users ON bookings_tbl.user_id = users.id AND bookings_tbl.status = 'pending'", (req, pending) => {
        
        res.render("booking.ejs", { success : success, pending : pending })
        })
    })
};

let carListPage = async (req, res) => {

    connection.query("SELECT * FROM cars", (req, cars) => {

    // connection.query("SELECT * FROM cars WHERE id = ?", req.params.car_id, (req, cars) => {
        return res.render("carlist.ejs", {cars: cars});
        
        })
    
};

let carUpdate = async (req, res) => {

    connection.query('SELECT * FROM cars WHERE id = ?', req.params.car_id, (req, cars) => {

         return res.render("caredit.ejs", { cars : cars })
  
    })
}

let carEditInfo = async (req, res) => {

    let data = req.body;

    let sql = 'UPDATE cars SET vehicle_type = ? , vehicle_brand_model = ? , plate_no = ?, capacity = ?, transmission = ?, price_per_day = ? WHERE id = ?'
    
        connection.query(sql, [data.type, data.brand_model, data.plate_number, data.capacity, data.transmission, data.rate, data.id], (err, row) => {
            if(err){
                throw err;
            }
            else{
                res.redirect('/carlist');
            }
        })
}

let carInformation = async (req, res) => {

    connection.query('SELECT *  FROM cars LEFT JOIN bookings_tbl ON cars.id = bookings_tbl.vehicle_id LEFT JOIN users on users.id = bookings_tbl.user_id  WHERE cars.id = ?', req.params.car_id, (req, cars) => {

        return res.render("carinfo.ejs", { cars : cars })
 
   })
}


let bookingConfirmation = async (req, res) => {
    let sql = 'UPDATE bookings_tbl SET status = ? WHERE booking_id = ?'

    connection.query(sql, ['success', req.query.id], (err, row) => {
        if(err){
            throw err;
        }
        else{
            res.redirect('/bookings');
        }
    })
}

let deleteBookings = async (req, res) => {
    let sql = "DELETE FROM bookings_tbl WHERE booking_id = ?"

    connection.query(sql, req.params.booking_id, (err, row) => {
        if(err){
            throw err;
        }
        else{
            res.redirect('/bookings');
        }
    })
}

module.exports = {  
    carListPage : carListPage,  
    getProfile : getProfile,
    getBookings : getBookings,
    carUpdate : carUpdate,
    carInformation : carInformation,
    carEditInfo : carEditInfo,
    bookingConfirmation : bookingConfirmation,
    deleteBookings : deleteBookings
}       