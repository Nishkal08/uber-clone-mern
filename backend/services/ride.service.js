const { getDistanceT } = require("./map.service")

const getFares = async (pickup, destiantion) => {

    if (!pickup || !destiantion) {
        throw new Error("Pickup and destination are required")
    }
    try {
        const { distance, duration } = await getDistanceT(pickup, destiantion)
        const dist = distance.value
        const time = duration.value

        const prices = {
            moto: {
                baseFare: 20,
                perkm: 5,
                permin: 1,
                fare(dist, time) {
                    return this.baseFare +
                        this.perkm * Math.round(dist / 1000) +
                        this.permin * Math.round(time / 60);
                }
            },
            auto: {
                baseFare: 35,
                perkm: 8,
                permin: 2,
                fare(dist, time) {
                    return this.baseFare +
                        this.perkm * Math.round(dist / 1000) +
                        this.permin * Math.round(time / 60);
                }
            },
            car: {
                baseFare: 75,
                perkm: 12,
                permin: 3,
                fare(dist, time) {
                    return this.baseFare +
                        this.perkm * Math.round(dist / 1000) +
                        this.permin * Math.round(time / 60);
                }
            }
        };

        return {
            moto: prices.moto.fare(dist, time),
            auto: prices.auto.fare(dist, time),
            car: prices.car.fare(dist, time)
        }
    }
    catch (err) {
        throw new Error(err.message)
    }
}

module.exports = {
    getFares
}