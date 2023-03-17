const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const UploadSchema = require('./models/Upload')
const cors = require('cors')
const imageCompression = require('browser-image-compression');

const dbConnection = require('./database/dbConnection');
dbConnection();

const app = express();
const port = process.env.PORT || 3000;

// configure body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage })

app.post('/upload', upload.single('image'), async (req, res) => {

  try {


    const newImage = new UploadSchema({
      title: req.body.title,
      description: req.body.description,
      pic: {
       data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
        contentType: req.file.mimetype
      }
    })

    await newImage.save();
    res.status(200).json(newImage);

  } catch (e) {
    res.status(500).json({ 'message': "Internal Error" })
    console.log(e.message)
  }
})

const getImages = require('./routes/getImage')

app.use('/getimages', getImages)

app.get('/', (req, res) => {
  res.json({})
})

app.delete('/upload',async (req, res) => {
  
  try {
    const deleteImages = await UploadSchema.deleteMany({'image':"image"});
    console.log("deleted")

  } catch (error) {
    console.log(error.message)
  }

})

// define API endpoint for handling POST requests


app.listen(port, function () {
  console.log('Server started on port ' + port);
});
