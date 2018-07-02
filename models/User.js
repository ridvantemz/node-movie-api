const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const UserSchema=new Schema({
    
    username:{
        type:String,
        maxlength:[100,'`{PATH}` alanı (`{VALUE}`), ({MAXLENGTH}) karakterden daha az olmalıdır.'],
        minlength:[3,'`{PATH}` alanı (`{VALUE}`), ({MINLENGTH}) karakterden daha fazla olmalıdır.'],
        required:true,
        unique:true
    },
    password:{
        type:String,
        maxlength:[200,'`{PATH}` alanı (`{VALUE}`), ({MAXLENGTH}) karakterden daha az olmalıdır.'],
        minlength:[5,'`{PATH}` alanı (`{VALUE}`), ({MINLENGTH}) karakterden daha fazla olmalıdır.']
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model('user',UserSchema);