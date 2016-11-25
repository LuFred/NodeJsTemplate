/**
 * Created by Fred.Lu on 2016/11/9.
 */
module.exports = {
    index: function (req, res, next) {
         var name=  req.session.userName||'xxxxx';
        console.log('user Session='+ req.session.userName);
        res.locals.testloclas='testloclas';
        res.render('user',{title:'Home User Inde1x',name:name});
    }
};