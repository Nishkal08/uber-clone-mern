const { query } = require("express-validator");

const router = require("express").Router();
const mapController = require("../controllers/map.controller");
const { authUser } = require("../middlewares/auth.middleware");

router.get("/get-coordinates",
    query("address").isString().isLength({ min: 3 }),
    authUser, mapController.getCoordinates)

router.get("/get-coords",
    query("address").isString().isLength({ min: 3 }),
    mapController.getCoordinates)

    router.get("/get-distance-time",
    [
        query("origin").isString().isLength({ min: 3 }),
        query("destination").isString().isLength({ min: 3 })
    ],
    authUser, mapController.getDistanceTime)


router.get("/get-suggestions",
    [
        query("location").isString().isLength({min:3}).withMessage("Location must be at least 3 characters."),
        authUser
    ], mapController.getSuggestions
)

module.exports = router