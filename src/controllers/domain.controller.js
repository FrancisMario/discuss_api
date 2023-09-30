const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const { domainService } = require('../services');
const { URL } = require('url');

const getDomains = catchAsync(async (req, res) => {
	const domains = await domainService.getAllDomains();
	res.send({ domains });
});

const getDomain = catchAsync(async (req, res) => {
	const link = req.params.domainId; // Assuming 'link' represents the domain name

	// normalise link and only get domain or subdomain, remove protocol and resource locations
	// Parse the URL to extract the domain name and resource location
	const parsedUrl = new URL(link);
	console.log(parsedUrl)
	// Extract the domain name (hostname) and resource location (pathname)
	const normalizedLink = parsedUrl.href.replace(parsedUrl.protocol, '');
	// Attempt to retrieve the domain by the provided link (domain name)
	let domain = await domainService.getDomainByLink(normalizedLink);

	// If the domain doesn't exist, create a new one with the provided link
	if (!domain) {
		const newDomain = await domainService.createDomain(normalizedLink); // Assuming 'link' is the domain name
		res.status(httpStatus.CREATED).send({ domain: newDomain });
		return;
	}

	// Domain exists, return it
	res.send({ domain });
});

const createDomain = catchAsync(async (req, res) => {
	const { link } = req.body;
	const createdDomain = await domainService.createDomain(link);
	res.status(httpStatus.CREATED).send({ domain: createdDomain });
});

const deleteDomain = catchAsync(async (req, res) => {
	const domainId = req.params.domainId;
	await domainService.deleteDomainById(domainId);
	res.send({ success: true });
});

module.exports = {
	getDomains,
	getDomain,
	createDomain,
	deleteDomain,
};
