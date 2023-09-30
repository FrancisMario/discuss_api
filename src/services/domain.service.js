const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const db = require('../db/models');




async function getDomainByLink(link) {
	const domain = await db.domain.findOne({
		where: { link },
	});

	return domain;
}
/**
 * Get a domain by its ID
 * @param {number} domainId - The ID of the domain to retrieve
 * @returns {Promise<Object>} The domain object
 */
async function getDomainById(domainId) {
	const domain = await db.domain.findOne({
		where: { id: domainId },
	});

	if (!domain) {
		throw new ApiError(httpStatus.NOT_FOUND, 'domain not found');
	}

	return domain;
}

/**
 * Create a new domain
 * @param {string} link - The link of the domain
 * @returns {Promise<Object>} The created domain object
 */
async function createDomain(link) {
	const domain = await db.domain.create({ link });

	return domain;
}

/**
 * Get all domains
 * @returns {Promise<Array>} An array of domain objects
 */
async function getAllDomains() {
	const domains = await db.domain.findAll();

	return domains;
}

/**
 * Delete a domain by its ID
 * @param {number} domainId - The ID of the domain to delete
 * @returns {Promise<number>} The number of deleted domains (0 or 1)
 */
async function deleteDomainById(domainId) {
	const deleteddomainCount = await db.domain.destroy({
		where: { id: domainId },
	});

	if (deleteddomainCount === 0) {
		throw new ApiError(httpStatus.NOT_FOUND, 'domain not found');
	}

	return deleteddomainCount;
}

module.exports = {
	getDomainById,
	createDomain,
	getAllDomains,
	deleteDomainById,
	getDomainByLink,
};
