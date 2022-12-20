const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// (node:6792) [MONGOOSE] DeprecationWarning: Mongoose: the `strictQuery` option will be switched back to `false` by default
// in Mongoose 7. Use `mongoose.set('strictQuery', false);` if you want to prepare for this change. Or use `mongoose.set('s
//  trictQuery', true);` to suppress this warning. 
// mongoose.set('strictQuery', true);
// Load models
const Message = require('./models/message');
const app = express();
// load keys file
const Keys = require('./config/keys');
// use body parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// connect to mLab MongoDB
mongoose.connect(Keys.MongoDB).then(() => {
    console.log("Server is connected to MongooseDB");
}).catch((err) => {
    console.log(err);
})
// environment var for port
const port = process.env.PORT || 3000;
// setup view engine
app.engine('handlebars', exphbs.engine({defaultLayout:'main'}));
app.set('view engine','handlebars');

app.get('/',(req,res) => {
    res.render('home',{
        title: 'Home'
    });
});

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About'
    });
})

app.get('/contact',(req,res) => {
    res.render('contact',{
        title: 'Contact'
    });
})

app.post('/contactUs',(req,res) => {
    console.log(req.body);
    const newMessage = {
        fullname: req.body.fullname,
        email: req.body.email,
        message: req.body.message,
        date: new Date()
    }
    new Message(newMessage).save((err,message) => {
        if (err) {
            throw err;
        }else{
            Message.find({}).then((messages) => {
                if (messages) {
                    res.render('newmessage', {
                        title: 'Sent',
                        messages:messages
                    });
                }else{
                    res.render('noMessage',{
                        title: 'Not found'
                    });
                }
            });
        }
    });
});

app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
})