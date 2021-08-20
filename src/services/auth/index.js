// @ts-nocheck
const { createUniqueHash } = require('@helper/auth/index');
const UserService = require('@services/user');
const httpStatus = require('http-status-codes');


const AuthService = {
   
    /**
     * @description Add user service
    //  * @param {string} email
     */
    addNewUser: async ({ 
        email, 
        password, 
        name,
        contact_number, 
        profile_image, 
        gender
    }) => {
        const isUserExist = await UserService.getUserByEmail(email);
        if(!isUserExist) { //Create New user
            const userObj = {
                email,
                password: password ? createUniqueHash(password) : '',
                name,
                contact_number, 
                profile_image, 
                gender,
                roles: ['staff']
            }
            const newUser = await UserService.createNewUser(userObj);
            const user = newUser.toJSON();
            return {
                status: true,
                statusCode: httpStatus.OK,
                result: {
                    ...user
                }
            }
        }
        return {
            status: false,
            statusCode: httpStatus.BAD_REQUEST,
            result: "User already exist"
        }
    },
};

module.exports = AuthService;