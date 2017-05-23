exports.notFound = (req, res, next) => {
    res.status(404);
    res.render('errors/not-found');
};

exports.serverError = (error, req, res, next) => {
    res.status(500);
    res.render('errors/server-error', {error: error});
};