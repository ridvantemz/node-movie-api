const mongoose=require('mongoose');

var express = require('express');
var router = express.Router();


const Director=require('../models/Director');



/* GET home page. */
router.post('/', (req, res, next)=> {
    const director=new Director(req.body);
    const promise=director.save();
    
    promise.then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.json(err);
    })
});

router.get('/',(req,res)=>{
    const promise=Director.aggregate([
        {
            $lookup:{
                from:'movies',
                localField:'id', //directordeki id ile eşleştirilecek
                foreignField:'director_Id',
                as:'movies'
            }
        },
        {
            $unwind:{
                path:'$movies',
                preserveNullAndEmptyArrays:true
            }
        },
        {
            $group:{
                _id:{
                    _id:'$_id',
                    name:'$name',
                    surname:'$surname',
                    bio:'$bio'
                },
                movies:{
                    $push:'$movies'
                }
            }
        },
        {
            $project:{
                _id:'$_id._id',
                name:'$_id.name',
                surname:'$_id.surname',
                movies:'$movies'
            }
        }
    ]);
    
    promise.then((data)=>{
        res.json(data)
    }).catch((err)=>{
        res.json(err)
    })
})


router.get('/:director_id',(req,res)=>{
    const promise=Director.aggregate([
        {
          $match:{
              '_id':mongoose.Types.ObjectId(req.params.director_id)
          }  
        },
        {
            $lookup:{
                from:'movies',
                localField:'id', //directordeki id ile eşleştirilecek
                foreignField:'director_Id',
                as:'movies'
            }
        },
        {
            $unwind:{
                path:'$movies',
                preserveNullAndEmptyArrays:true
            }
        },
        {
            $group:{
                _id:{
                    _id:'$_id',
                    name:'$name',
                    surname:'$surname',
                    bio:'$bio'
                },
                movies:{
                    $push:'$movies'
                }
            }
        },
        {
            $project:{
                _id:'$_id._id',
                name:'$_id.name',
                surname:'$_id.surname',
                movies:'$movies'
            }
        }
    ]);
    
    promise.then((data)=>{
        res.json(data)
    }).catch((err)=>{
        res.json(err)
    })
})




router.put('/:director_id',(req,res,next)=>{
    const promise=Director.findByIdAndUpdate(req.params.director_id,req.body,{new:true}); //eger new true parametre eklemesi yapılırsa 
    promise.then((director)=>{                                                         //yeni veri dondurmesi yapılabilir
        if (!director)
            next({message:'The director was not found.',code: 998});
        res.json(director);
    }).catch((err)=>{
        res.json(err);
        })
})

router.delete('/:director_id',(req,res,next)=>{
    const promise=Director.findByIdAndRemove(req.params.director_id); 
    promise.then((director)=>{
        if (!director)
            next({message:'The director was not found.',code: 998});
        res.json(director);
    }).catch((err)=>{
        res.json(err);
        })
})


module.exports = router;
