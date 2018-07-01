var express = require('express');
var router = express.Router();

/*router.post ile gönderilen verinin mongodb'ye kayıt edilmesi*/

//Models
const Movie=require('../models/Movie.js');


/* GET movies listing. */
router.post('/', function(req, res, next) {
    
    /*
    1.***
    const {title,imdb_score,category,country,year}=req.body;
    2.***
    const movie=new Movie({
        title:title,
        imdb_score:imdb_score,
        category:category,
        country:country,
        year:year
    });
    //4.***
    const movie=new Movie(req.body);
    
    //data veri tabanındaki ilgili kayıt neyse onu geri döndüren değerdir
    //3.
    movie.save((err,data)=>{
        if(err)
            res.json(err);
            
        res.json({status:1});
        
    });*/
    //promise yapısı kullanabilmek için helper db.js'de global.Promise tanımlaması yapılmalıdır.
    const movie=new Movie(req.body);
    const promise=movie.save();
    promise.then((data)=>{
        res.json({status:1});
    }).catch((err)=>{
        res.json(err);
    })
    
});

module.exports = router;
