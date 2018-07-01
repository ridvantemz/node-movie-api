const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const DirectorSchema=new Schema({
    
    name:{
        type:String,
        maxlength:[100,'`{PATH}` alanı (`{VALUE}`), ({MAXLENGTH}) karakterden daha az olmalıdır.'],
        minlength:[3,'`{PATH}` alanı (`{VALUE}`), ({MINLENGTH}) karakterden daha fazla olmalıdır.']
    },
    surname:{
        type:String,
        maxlength:[100,'`{PATH}` alanı (`{VALUE}`), ({MAXLENGTH}) karakterden daha az olmalıdır.'],
        minlength:[2,'`{PATH}` alanı (`{VALUE}`), ({MINLENGTH}) karakterden daha fazla olmalıdır.']
    },
    bio:{
        type:String,
        maxlength:[500,'`{PATH}` alanı (`{VALUE}`), ({MAXLENGTH}) karakterden daha az olmalıdır.'],
        minlength:[10,'`{PATH}` alanı (`{VALUE}`), ({MINLENGTH}) karakterden daha fazla olmalıdır.']
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model('director',DirectorSchema);