// Import the AccessControl module for role-based access control (RBAC).
const AccessControl = require('accesscontrol');

// Define a set of permissions that grant full access to all actions on any resource.
const allrights = {
    "create:any": ["*"],
    "read:any": ["*"],
    "update:any": ["*"],
    "delete:any": ["*"],
}

// Define the access control configuration using grantsObject.
let grantsObject = {
    // The 'admin' role has full access to all actions on the 'profile' resource.
    admin: {
        profile: allrights,
        brand: allrights,
        product: allrights,
        site: allrights
    },
    // The 'user' role has read and update access to their own 'profile'.
    user: {
        profile: {
            'read:own': ['*', "!password", "!_id"],
            'update:own': ['*', "!password", "!_id"],
        },
        brand: { "read:any": ["*"] },
        products: { "read:any": ["*"] }
    }
}

// Create an instance of AccessControl using the defined grantsObject.
const roles = new AccessControl(grantsObject);

// Export the roles configuration for use in other parts of the application.
module.exports = { roles };
