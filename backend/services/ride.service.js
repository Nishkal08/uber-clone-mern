const crypto = require("crypto");
const { getDistanceT } = require("./map.service");
const rideModel = require("../models/ride.model")
const getFares = async (pickup, destination) => {
    if (!pickup || !destination) {
        throw new Error("Pickup and destination are required");
    }
    try {
        const { distance, duration } = await getDistanceT(pickup, destination);
        const dist = distance.value;
        const time = duration.value;

        const prices = {
            moto: { baseFare: 15, perkm: 5, permin: 1 },
            auto: { baseFare: 30, perkm: 8, permin: 2 },
            car: { baseFare: 60, perkm: 12, permin: 3 }
        };

        const fareCalc = (baseFare, perkm, permin) =>
            baseFare + perkm * Math.round(dist / 1000) + permin * Math.round(time / 60);

        return {
            moto: fareCalc(prices.moto.baseFare, prices.moto.perkm, prices.moto.permin),
            auto: fareCalc(prices.auto.baseFare, prices.auto.perkm, prices.auto.permin),
            car: fareCalc(prices.car.baseFare, prices.car.perkm, prices.car.permin)
        };
    } catch (err) {
        throw new Error(err.message);
    }
};

const getOtp = (num) => {
    const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
    return otp;
};

const createRide = async ({ user, pickup, destination, vehicleType }) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error("Pickup, user ,destination and vehicle type are required");
    }
    try {
        const fare = await getFares(pickup, destination);
        const distanceTime = await getDistanceT(pickup, destination);
        if (!distanceTime) {
            throw new Error("Unable to get distance and time");
        }
        if (vehicleType === "motorcycle") {
            vehicleType = "moto"; pickup
        }
        if (!fare[vehicleType]) {
            throw new Error("Invalid vehicle type");
        }
        const ride = rideModel.create({
            user,
            pickup,
            destination,
            vehicleType,
            fare: fare[vehicleType],
            distance: distanceTime.distance.value,
            duration: distanceTime.duration.value,
            otp: getOtp(6)
        })
        return ride;
    } catch (err) {
        throw new Error("Error occured during ride creation: " + err.message);
    }
};

const confirmRide = async ({ rideId, captainId }) => {
    if (!rideId || !captainId) {
        throw new Error("Ride id and captain id are required")
    }
    try {
        await rideModel.findOneAndUpdate({ _id: rideId }, {
            status: "accepted",
            captain: captainId
        })
        const ride = await rideModel.findOne({ _id: rideId }).populate("user").populate("captain").select("+otp")
        if (!ride) {
            throw new Error("Ride not found")
        }
        return ride
    }
    catch (err) {
        console.log(err)
        throw new Error("Error occured during ride confirmation: " + err.message);
    }
}

    const startRide = async ({ rideId, otp , captainId }) => {
        if (!rideId || !otp) {
            throw new Error("Ride and otp are required")
        }
        try {
            console.log("RIde id : ",rideId)
            console.log("captain id : ",captainId)
            let ride = await rideModel.findOne(
                { 
                    _id: rideId ,
                    captain: captainId
                }
            ).populate("user").populate("captain").select("+otp")
            if (!ride) {
                throw new Error("Ride not found")
            }
            if (ride.otp !== otp) {
                throw new Error("Invalid otp")
            }
            ride = await rideModel.findOneAndUpdate(
                {
                    _id: ride._id
                },
                {
                    status: "ongoing"
                },
                {
                    new: true
                }
            ).populate("user").populate("captain").select("+otp")
            return ride
        }
        catch (err) {
            throw new Error("Error occured during ride start: " + err.message);
        }

    }
const endRide = async ({ rideId , captainId }) =>
{
    if(!rideId)
    {
    throw new Error("Ride id is required")
    }
    let ride = await rideModel.findOne(
        {
            _id: rideId,
            captain: captainId
        }
    )
    if(!ride)
    {
        throw new Error("Ride not found")
    }
     ride = await rideModel.findOneAndUpdate(
        {
            _id: ride._id
        },
        {
            status: "completed"
        },
        {
            new: true
        }
    ).populate("user").populate("captain").select("+otp")
    return ride
}


module.exports = {
    getFares,
    createRide,
    confirmRide,
    startRide,
    endRide
};
