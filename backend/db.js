const mongoose = require("mongoose");
mongoose.connect('mongodb://0.0.0.0:27017/tutorialApp', (err) => {

    if (!err) {
    console.log(' mongo database  connection  is succesful');
}
    else {
        console.log('erroe in connectiom' + err);
    }
})
module.exports  = mongoose;

