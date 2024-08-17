const sequelize = require('../config/database');
const Borrower = require('../models/borrower')(sequelize, require('sequelize').DataTypes);
const { sendResponse } = require('../utils/responseHelper')


exports.createBorrower = async (req, res) => {
    try {
        const { name, email, registeredDate } = req.body;

        const existingBorrower = await Borrower.findOne({ where: { email } });

        if (existingBorrower) {
            return sendResponse(res, 400, null, 'Email already exists');
        }

        const borrower = await Borrower.create({ name, email, registeredDate });
        return sendResponse(res, 201, borrower, 'Borrower created successfully');
    } catch (error) {
        console.error('Error creating borrower:', error);
        return sendResponse(res, 500, null, 'Internal Server Error');
    }
};

exports.getBorrowers = async (req, res) => {
    try {
        const borrowers = await Borrower.findAll();

        if (borrowers.length) {
            return sendResponse(res, 200, borrowers, 'Borrowers retrieved successfully');
        }

        return sendResponse(res, 404, null, 'No borrowers found');
    } catch (error) {
        console.log(error);
        return sendResponse(res, 500, null, 'Error while fetching borrowers');
    }
};

exports.getBorrowerById = async (req, res) => {
    try {
        const borrower = await Borrower.findByPk(req.params.id);

        if (borrower) {
            return sendResponse(res, 200, borrower, 'Borrower retrieved successfully');
        }

        return sendResponse(res, 404, null, 'Borrower not found');
    } catch (error) {
        console.log(error);
        return sendResponse(res, 500, null, 'Error while fetching borrower');
    }
};

exports.updateBorrowerById = async (req, res) => {
    try {
        const borrower = await Borrower.findByPk(req.params.id);

        if (!borrower) {
            return sendResponse(res, 404, null, 'Borrower not found');
        }

        if (req.body.email) {
            const existingBorrower = await Borrower.findOne({ where: { email: req.body.email } });

            if (existingBorrower && existingBorrower.id !== borrower.id) {
                return sendResponse(res, 400, null, 'Email already exists');
            }
        }

        borrower.name = req.body.name || borrower.name;
        borrower.email = req.body.email || borrower.email;
        borrower.registeredDate = req.body.registeredDate || borrower.registeredDate;

        await borrower.save();

        return sendResponse(res, 200, borrower, 'Borrower updated successfully');
    } catch (error) {
        console.log(error);
        return sendResponse(res, 500, null, 'Error while updating borrower');
    }
};

exports.deleteBorrowerById = async (req, res) => {
    try {
        const result = await Borrower.destroy({ where: { id: req.params.id } });

        if (result) {
            return sendResponse(res, 200, null, 'Borrower deleted successfully');
        }

        return sendResponse(res, 404, null, 'Borrower not found');
    } catch (error) {
        console.log(error);
        return sendResponse(res, 500, null, 'Error while deleting borrower');
    }
};
