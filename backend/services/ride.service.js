const crypto = require("crypto");
const { getDistanceT } = require("./map.service");

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

const createRide = async ({user,pickup, destination, vehicleType}) => {
    console.log("Creating ride with user:\n", user, "\npickup:\n", pickup, "\ndestination:\n", destination, "\nvehicleType:\n", vehicleType);
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error("Pickup, user ,destination and vehicle type are required");
    }
    try {
        const fare = await getFares(pickup, destination);
        const distanceTime = await getDistanceT(pickup, destination);
        if (!distanceTime) {
            throw new Error("Unable to get distance and time");
        }
        console.warn("vehicleType", vehicleType);
        if(vehicleType === "motorcycle") {
            vehicleType = "moto";
        }
        if (!fare[vehicleType]) {
            throw new Error("Invalid vehicle type");
        }
        return {
            user,
            pickup,
            destination,
            vehicleType,
            fare: fare[vehicleType],
            distance: distanceTime.distance.value,
            duration: distanceTime.duration.value, 
            otp: getOtp(6)
        };
    } catch (err) {
        throw new Error("Error occured during ride creation: " + err.message);
    }
};

module.exports = {
    getFares,
    createRide
};
