// Middleware to control the header in the files.

const setDefaultValues = (req, res, next) => {
    res.locals.showHeader = true; // Default value for showHeader
    next();
};

module.exports = setDefaultValues;