const connection = require('../config/connectionDB')





let getForm = async (req, res) => {
    

    // connection.query("SELECT * FROM cars WHERE id = ?", req.user.id, (req, cars) => {
    //     return res.render("carlist.ejs", {car: cars})
    // })
    return res.render("carform")
}
let createListing = async (req, res) => {
  

    let data = req.body;    

    let carItems = {        
       vehicle_type: data.type,
       vehicle_brand_model: data.brand_model,
       plate_no: data.plate_number,
       capacity: data.capacity,
       transmission: data.transmission,
       image: data.image,
       price_per_day: data.rate
    };

   
   
    connection.query(
        "INSERT INTO cars SET ?", carItems, (err, row, fields) => {
            if(err){
                // req.flash("errors", err)
                // res.redirect('/carlist')
                console.log(err)
            }
            else{
                // req.flash('message', 'Sucessfully created new listing')   
                // console.log(fields)
                res.redirect('/carlist')
               
            }
        })
};

module.exports = {
    getForm : getForm, 
    createListing : createListing
}