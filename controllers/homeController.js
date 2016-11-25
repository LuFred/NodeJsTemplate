/**
 * Created by Fred.Lu on 2016/11/9.
 */

var promise=require('bluebird');
var requestClient=require('../lib/common/requestClient');
module.exports = {//
    index: function (req, res, next) {

        var url='http://cc.vidahouse.com/api/Helper/GetP360s';


        //并行代码
        var t1=requestClient.get('Helper/GetP360s',null);
        var t2=requestClient.get('Helper/GetP360s',null);

        promise.all([t1,t2]).then(function (datas) {
                 //console.log(datas.length);
             }).catch(function (err) {
                // console.log(err+"---------------");
             });

        //
        var t3=requestClient.get('Helper/GetP360s',null).then(function (data) {
            //console.log("result==="+JSON.stringify(data));
        });

        req.session.userName='hello session1';
        console.log("session----------------"+req.session.userName);

        res.render('index',{title:'Home Index'});

    }
};