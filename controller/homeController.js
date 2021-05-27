

const connection = require('../config/connectionDB')


let handleHelloWorld = async (req, res) => {

    connection.query("SELECT fullname, vehicle_brand_model, rent_startDate, rent_endDate, bookings_tbl.createdAt FROM bookings_tbl INNER JOIN cars ON bookings_tbl.vehicle_id = cars.id INNER JOIN users ON bookings_tbl.user_id = users.id ORDER BY `bookings_tbl`.`createdAt` DESC",
    (err, row, fields) => {
        var bookings = row;
    
    connection.query("SELECT fullname, vehicle_brand_model, rent_startDate, rent_endDate, bookings_tbl.createdAt, bookings_tbl.status FROM bookings_tbl INNER JOIN cars ON bookings_tbl.vehicle_id = cars.id INNER JOIN users ON bookings_tbl.user_id = users.id AND bookings_tbl.status ='success'",
    (err, row) => {
        var success = row;    

    connection.query("SELECT fullname, vehicle_brand_model, rent_startDate, rent_endDate, bookings_tbl.createdAt, bookings_tbl.status FROM bookings_tbl INNER JOIN cars ON bookings_tbl.vehicle_id = cars.id INNER JOIN users ON bookings_tbl.user_id = users.id AND bookings_tbl.status ='pending'",
    (err, row) => {
        var pendings = row;
       
        res.render("index.ejs", {bookings : bookings, pendings : pendings, success : success})
            
            })
        })
    })
};




module.exports = {
    handleHelloWorld: handleHelloWorld,
    
};
