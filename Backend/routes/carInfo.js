const express = require('express');
const bodyParser = require('body-parser');
const db = require('../models/UsersDB');

const router = express.Router();

router.get("/car-details/:CarRegistrationNumber" , function(req,res){
    // console.log("HELLO WORLD");
    var carRegistrationNumber = req.params.CarRegistrationNumber;
    var sql = "SELECT * FROM VEHICLESDB WHERE Car_Registration_Number='" + carRegistrationNumber + "';";
    db.query(sql , function(err,result){
        if (err){
            throw(err);
        }
        else {
            // console.log(result);
            res.send(result);
        }
    });
});

router.post("/car-details/:CarRegistrationNumber" , function(request,response){
    const recievedInfo = request.body;
    const driverRollNo = recievedInfo.rollNo;
    const driverName = recievedInfo.driver;
    const pickup = recievedInfo.pickup;
    const dropoff = recievedInfo.dropoff;
    const carType = recievedInfo.carType;
    const leavingtime = recievedInfo.leavingTime;
    const availableSeats = recievedInfo.seats;
    const carRegistrationNumber = recievedInfo.CarRegistrationNumber;
    console.log("HELO WORLD" +carRegistrationNumber );

    // recievedInfo.carRegistrationNumber; 
    const date = recievedInfo.Date;
    const fare = recievedInfo.Fare;
    const value = 0;

    const carName = recievedInfo.carName;
    const carModel = recievedInfo.carModel;
    const carMake = recievedInfo.carMake;
    const carColor = recievedInfo.carColor.background;

    // const carColor = recievedInfo.carColor.background;

    console.log(driverRollNo + " " + carType + " " + carRegistrationNumber + " " + fare);
    console.log(carName + " " + carModel + " " + carMake + " " + carColor);
    
    var sql1 = "INSERT INTO VEHICLESDB VALUES ('" + carRegistrationNumber + "','" + carMake + "','" + carModel + "','" + carName + "','" + carColor + "')";
    db.query(sql1 , function(err,result){
        if (err){
            console.log(err);
            response.status(200).json({carAdded: "false" , rideAdded : "false"});
        }
        else {
            var sql2 = "INSERT INTO RIDESDB VALUES ("  + value + ",'"  + driverRollNo + "','" + driverName + "','" + pickup.address + "','" + dropoff.address + "','" + carType + "','" + leavingtime + "'," + availableSeats + ",'" + carRegistrationNumber + "','" + date + "'," + fare + ")";
            // var sql2 = "INSERT INTO RIDESDB VALUES ("  + value + ",'"  + driverRollNo + "','" + driverName + "','" + pickup + "','" + dropoff + "','" + carType + "','" + leavingtime + "'," + availableSeats + ",'" + carRegistrationNumber + "','" + date + "'," + fare + ")";

            db.query(sql2 , function(error , res){
                if (error){
                    console.log(error);
                    return response.status(200).json({carAdded: "true" , rideAdded : "false"});
                } else {
                    return response.status(200).json({carAdded: "true" , rideAdded : "true"});
                }
            })
        }
    });
});

module.exports = router;