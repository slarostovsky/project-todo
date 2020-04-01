const Product = require('../models/product.model');


exports.test = function (req, res) { 
    res.send ('Привет от тестового контроллера!'); 
};


exports.task_create = function (req, res ,next) {
    let product = new Product(
        {
            text: req.body.text,
            completed: req.body.completed
        }
    );
    product.save(function (err ,val) {
        if (err) {
            return next(err)
        }
        res.send(val)
    })
};

exports.task_details = function (req, res,next) {
    Product.findById(req.params.id, function (err, value) {
        if (err) return next(err);
        res.send(value);
    })
};

exports.task_all = function (req , res) {
    Product.find({}).then(function (value) {
    res.send(value);
    })
}


exports.task_completed = function(req,res,next) {
        Product.findByIdAndUpdate(req.params.id, {"$set": {"completed": !req.body.completed} },function (err, value) {
            if (err) return next(err);
            console.log(value)
            res.send(value);
            });
}

exports.task_update = function (req, res,next) {
    Product.findByIdAndUpdate(req.params.id, {"$set": req.body}, function (err, product) {
        if (err) return next(err);
        res.send(product);
    });
};

exports.task_update_all = function (req, res,next) {
    Product.updateMany({}, {"$set":{"completed": req.body.completed}} , (err, value) => {
        if(err) return next(err)
        res.send(value)
    });
};

exports.task_delete = function (req, res,next) {
    Product.findByIdAndRemove(req.params.id, function (err,value) {
        if (err) return next(err);
        res.send(value);
    })
};

exports.task_delete_all_completed = function (req, res , next) {
    Product.remove( {"completed" : true}, (err,value) => {
        if(err) return next(err)
        res.send(value)
    })
}