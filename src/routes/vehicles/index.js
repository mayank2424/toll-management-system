/**
 * Vehicles types Routes
 */
 const router = require('express').Router({
    caseSensitive : true,
    strict        : true,
});
const { VehiclesController } = require('@controllers/index');
const { checkError } = require('@helper/validation');


//All Route methods

 /**
 * @desscription Add new vehicle
 */
router.post('/add', VehiclesController.addNewVehicle);

/**
 * @description Delete Single vehicle
 */
router.delete('/delete/:id', VehiclesController.deleteVehicle);

/**
 * @description List all vehicles
 */
router.get('/list', VehiclesController.listAll)

module.exports = router;

