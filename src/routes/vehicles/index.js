/**
 * Vehicles types Routes
 */
 const router = require('express').Router({
    caseSensitive : true,
    strict        : true,
});
const { VehiclesController } = require('@controllers/index');
const { checkError } = require('@helper/validation');
const { addVehicle, deleteVehicle } = require('@validators/vehcile.validators');


//All Route methods

 /**
 * @desscription Add new vehicle
 */ 
router.post('/add',    
    addVehicle,
    checkError,
    VehiclesController.addNewVehicle
);

/**
 * @description Delete Single vehicle
 */
router.delete('/:id', 
    deleteVehicle,
    checkError,
    VehiclesController.deleteVehicle
);

/**
 * @description List all vehicles
 */
router.get('/list', VehiclesController.listAll)

module.exports = router;

