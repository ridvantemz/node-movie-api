var express = require('express');
var router = express.Router();

/*router.post ile gönderilen verinin mongodb'ye kayıt edilmesi*/

//Models
const Movie=require('../models/Movie.js');

router.get('/',(req,res)=>{
    //const promise=Movie.find({});
    const promise=Movie.aggregate([
        {
            $lookup:{
              from:'directors',
                localField:'director_id',
                foreignField:'_id',
                as:'director'
            }
        },
        {
            $unwind:'$director'
        }
    ])
    promise.then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.json(err)
    })
})


//   .../:movie_id ile eğer api/movies/asjdaskjdhasjd yazıldığında :movie_id yerine yazılan değer ne ise o bizim
//  movie_id parametremiz olacaktır. movie_id=asjdaskjdhasjd oldu. o değere de req altındaki params ile erişiriz.
//      res.send(req.params.movie_id);






// router.get('/.....') şeklinde 2 durum mevcut ancak bunlar birbiriyle çakışma yaşamaktadır
// top10 route movie_id'den sonrayazılırsa mongodb'de önce tıop10 id-si aranacağı için 
//  daha önceden bu route tanımlanmadır


// Top 10 list
router.get('/top10',(req,res)=>{
    const promise=Movie.find({ }).limit(10).sort({imdb_score:1});
    promise.then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.json(err)
    })
})


router.get('/:movie_id',(req,res,next)=>{
    const promise=Movie.findById(req.params.movie_id);
    promise.then((movie)=>{
        if (!movie)
            next({message:'The movie was not found.',code: 999});
        res.json(movie);
    }).catch((err)=>{
        res.json(err);
        })
})












router.put('/:movie_id',(req,res,next)=>{
    const promise=Movie.findByIdAndUpdate(req.params.movie_id,req.body,{new:true}); //eger new true parametre eklemesi yapılırsa 
    promise.then((movie)=>{                                                         //yeni veri dondurmesi yapılabilir
        if (!movie)
            next({message:'The movie was not found.',code: 999});
        res.json(movie);
    }).catch((err)=>{
        res.json(err);
        })
})

router.delete('/:movie_id',(req,res,next)=>{
    const promise=Movie.findByIdAndRemove(req.params.movie_id); 
    promise.then((movie)=>{
        if (!movie)
            next({message:'The movie was not found.',code: 999});
        res.json(movie);
    }).catch((err)=>{
        res.json(err);
        })
})


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


// between end_point'i


router.get('/between/:start_year/:end_year',(req,res)=>{
    const {start_year,end_year}=req.params;
    const promise=Movie.find(
        {
            year:{'$gte': parseInt(start_year), '$lte': parseInt(end_year)}
        }
    );
    promise.then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.json(err)
    })
})




module.exports = router;
