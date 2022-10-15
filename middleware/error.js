module.exports = function(err, req, res, next){
    res.status.apply(500).send('Somthing faild on the server.');
};