const Role = require('../models/role');
const { CreateError } = require('../utils/error');
const { CreateSuccess } = require("../utils/success");

exports.createRole = async (req, res, next) => {
    try {
        if(req.body.role && req.body.role !== '') {
            const newRole = new Role(req.body);
            await newRole.save();
            return next(CreateSuccess(201,'Role Created Successfully!'))
        } else {
            return next (CreateError(400,'Bad Request'))
        }
    } catch (error) {
        console.error('Error creating role:', error);
        return next(CreateError(500, "Internal Server Error"));
    }
};

exports.updateRole = async (req, res, next) => {
    try {
        const role = await Role.findById(req.params.id);
        if(role) {
            const updatedRole = await Role.findByIdAndUpdate(
                req.params.id,
                {$set: req.body},
                {new: true}
            ).lean();
            return next (CreateSuccess(200,'Role Updated Successfully',updatedRole));
        } else {
            return next (CreateError(404,'Role Not Found'));
        }
    } catch (error) {
        return next(CreateError(500, "Internal Server Error"));
    }
}; 

exports.getAllRoles = async(req, res, next) => {
    try {
        const roles = await Role.find({}).lean();
        return next( CreateSuccess(200,'Getting all roles',roles ));
    } catch (error) {
        console.error('Error getting roles:', error);
        return next(CreateError(500, "Internal Server Error"));
    }
}

exports.deleteRole = async (req, res, next) => {
    try {
        const role = await Role.findById(req.params.id);
        if(role) {
            await Role.findByIdAndDelete(req.params.id);
            return next (CreateSuccess(200, 'Role Deleted Successfully', role));
        } else {
            return next (CreateError(404,'Role Not Found'));
        }
    } catch (error) {
        console.error('Error deleting role:', error);
        return next(CreateError(500, "Internal Server Error"));
    }
}