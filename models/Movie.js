const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const MovieSchema=new Schema({
    
    director_id:Schema.Types.ObjectId,
    title:{
        type:String,
        required:[true,'`{PATH}` alanı zorunludur.'],
        maxlength:[15,'`{PATH}` alanı (`{VALUE}`), ({MAXLENGTH}) karakterden daha az olmalıdır.'],
        minlength:[4,'`{PATH}` alanı (`{VALUE}`), ({MINLENGTH}) karakterden daha fazla olmalıdır.']
    },
    category:String,
    country:String,
    year:{
        type:Number,
        max:2040,
        min:1800
    },
    imdb_score:{
        type:Number,
        max:10,
        min:0
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model('movie',MovieSchema);