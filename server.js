const express = require('express');
const fileUpload = require('express-fileupload');

const path = require('path'); 

const uuid = require('uuid');


const app = express();

app.use(fileUpload());

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));


  app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

// Upload Endpoind
app.post('/upload', (req,res)=> {
  if(req.files === null){
    return res.status(400).json({msg: 'No file uploaded'});
  }

  const file = req.files.file;

  file.id = uuid.v4()

  // const id = uuid.v4();

  file.mv(`${__dirname}/client/public/uploads/${file.id}_${file.name}`, err => {
    if(err){
      console.error(err);
      return res.status(500).send(err);
    }

    

    res.json({ fileName: file.name, filePath: `/uploads/${file.id}_${file.name}` });
  })


  
})

app.listen(6001, ()=> console.log(`Server Started on PORT 6000`));