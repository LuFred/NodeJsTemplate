/**
 * Created by Fred.Lu on 2016/11/9.
 */
var home = require('./routes/home');
var users = require('./routes/users');
var authorization =require('./middlewares/authorization');


module.exports.use=function (app) {
    app.use('/',authorization, home);
    app.use('/users', users);
}