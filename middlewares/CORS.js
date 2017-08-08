exports = module.exports = function (app) {
    var allowedMethods = ['GET,POST,OPTIONS'];
    var allowedHosts = 'GET,POST,OPTIONS';
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        next();
    });

    app.options('*', function (req, res) {
        res.status(200).end();
    });
};
