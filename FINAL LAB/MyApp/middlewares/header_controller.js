// Middleware to control the header in the files.

const setDefaultValues = (req, res, next) => {
    res.locals.showHeader = true;
    next();
};

module.exports = setDefaultValues;