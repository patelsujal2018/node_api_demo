module.exports = function(app){

    app.get('/', function(req, res){
        res.send("i am first route of this app");
    });

    app.get('/login', function(req, res){
        res.send("i am login route of this app");
    });

}