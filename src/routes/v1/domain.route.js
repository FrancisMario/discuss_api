const express = require('express');
const validate = require('../../middlewares/validate');
const { domainValidation } = require('../../validations'); // Import domain validation schemas
const { domainController } = require('../../controllers');

const { grantAccess } = require('../../middlewares/validateAccessControl');
const { resources } = require('../../config/roles');

const router = express.Router();

// Define routes for domains
router.get('/', domainController.getDomains);

// Route to create a domain with validation
router.post('/', domainController.createDomain);

// Route to get a domain by ID with validation
router.get('/:domainId', domainController.getDomain);

// Route to update a domain with validation
// router.patch('/:domainId', validate(domainValidation.updateDomain), domainController.updateDomain);

// Route to delete a domain with validation
router.delete('/:domainId', domainController.deleteDomain);

module.exports = router;
