const mongoose=require('mongoose');
//mlab sitesinde oluşturduğumuz database bağlantı gerçekleştirdik
//roboto'da address kısmına ds125181.mlab.com port kısmına 25181  ve 
//authencantion kısmına db movie-api ve user bilgileri girildi
module.exports=()=>{
    mongoose.connect('mongodb://movie_user:123456rt@ds125181.mlab.com:25181/movie-api');
    mongoose.connection.on('open',()=>{
        console.log('MongoDB:Connected');
    })
mongoose.connection.on('error',(err)=>{
        console.log('MongoDB:ERROR',err);
    })
    
mongoose.Promise=global.Promise;
}