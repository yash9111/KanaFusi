const mongoose = require('mongoose');
require('dotenv').config();


const URI = `mongodb+srv://ypathak188:maggi2-00@kanafusi.80styik.mongodb.net/AllData?retryWrites=true&w=majority`

const connection = () => {
    try {
        mongoose.connect(URI)
            .then(() => { console.log("Database Connected") })
            .catch((e) => { console.log(e.message) })
    } catch (er) {
        console.log(e.error)
    }
}

module.exports = connection;