/**loading dotenv */
const dotenv=require('dotenv').config();
/**express js modules */
const express = require('express')
const app = express();
const port=  process.env.PORT || 8000;
/**styling module node sass middleware */
const expressLayouts= require('express-ejs-layouts'); /**Express ejs layouts */
const sassMiddleware = require('node-sass-middleware');/**for scss styling*/
/**databse modules */
const db=require('./config/mongoose');

/**middlewares */
/**parsing middleware */
app.use(express.urlencoded({extended:true}));

/**Styling middleware */
app.use(express.static('./assets'));/**Setting up the static folder */
app.use(expressLayouts); /**express ejs layout common for multiple pages */
app.set('layout extractStyles',true); /**able to use individual sub pages styling */
app.set('layout extractScripts',true); /**able to use individual sub pages scripts*/
app.use(sassMiddleware({ //node sass middleware
    /* Options */
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'compressed',
    prefix:  '/css'  // Where css is at <link rel="stylesheets" href="/css/style.css"/>
}));


/**setting up the template engine as ejs and the views folder */
app.set('view engine','ejs');
app.set('views','views');




//express router for home page
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log("Error in setting up the server",err);
    }else{
        console.log("Server is listening on the port",port);
    }
});