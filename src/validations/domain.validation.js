const Joi = require('@hapi/joi');

// Validation schema for getting domains
const getDomains = {
  query: Joi.object({
    // Define query parameters if needed
    // Example: name: Joi.string().optional(),
  }),
};

// Validation schema for creating a domain
const createDomain = {
  body: Joi.object({
    link: Joi.string().required(), // Assuming 'link' is required for domain creation
    // Add other required fields for domain creation
  }),
};

// Validation schema for getting a domain by ID
const getDomain = {
  params: Joi.object({
    domainId: Joi.string().required(), // Assuming 'domainId' is a required parameter
  }),
};

// Validation schema for updating a domain
const updateDomain = {
  params: Joi.object({
    domainId: Joi.string().required(), // Assuming 'domainId' is a required parameter
  }),
  body: Joi.object({
    // Define fields that can be updated in the request body
    // Example: link: Joi.string().optional(),
  }),
};

// Validation schema for deleting a domain
const deleteDomain = {
  params: Joi.object({
    domainId: Joi.string().required(), // Assuming 'domainId' is a required parameter
  }),
};

module.exports = {
  getDomains,
  createDomain,
  getDomain,
  updateDomain,
  deleteDomain,
};
