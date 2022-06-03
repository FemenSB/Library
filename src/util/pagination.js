function getPagination(query) { // Calculate 'limit' and 'skip' for the paginated query
  const limit = Math.abs(query.limit) || 0; // MongoDB will return all documents if limit is set to zero
  const page = Math.abs(query.page) || 1; // Default page = 1

  const skip = (page - 1) * limit;

  return {skip, limit};
}

module.exports = getPagination;
