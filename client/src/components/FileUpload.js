import React, { useState, Fragment } from 'react';

import axios from 'axios';

import Alert from './Alert';
import ProgressBar from './ProgressBar';
// import Files from './Files';

import { v4 as uuidv4 } from 'uuid';


const FileUpload = () => {

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('Choose File');
  const [alert, setAlert] = useState({
    msg: '',
    type: '',
    show: false
  });
  const [uploatP, setUploadP] = useState({
    uploaded: false,
    percentage: 0
  });

  const [img, setImg] = useState({
    imgPath: '',
    imgName: ''
  });

  const [replace, setReplace] = useState({
    replacePath: '',
    replaceName: ''
  });


  const [uploads, setUploads] = useState([
    // {
    //   filePath: '/uploads/213eef28-ca16-420d-8ce2-a8330e4cebcf_lt9KD2lt_400x400.jpg',
    //   fileName: 'Pic one',
    //   id: '3342343'
    // },
    // {
    //   filePath: "/uploads/49d2fc04-a2d1-471f-894a-eab95e0bb646_pIMG_3758.jpg",
    //   fileName: 'Pic Two',
    //   id: 'fdsfdf'
    // },
    // {
    //   filePath: "/uploads/719941c0-aeac-4cb1-b456-9e0da1c1049d_IMG_3999.JPG",
    //   fileName: 'Pic Three',
    //   id: 'cvcv'
    // },
    // {
    //   filePath: "/uploads/fd505cf1-abff-4d6b-b781-430d389065cb_lt9KD2lt_400x400.jpg",
    //   fileName: 'Pic Three',
    //   id: 'zzz'
    // },
    // {
    //   filePath: "/uploads/3fab9322-776b-493b-ad31-8ac0dfa77937_Patrick_Star.png",
    //   fileName: 'Pic Four',
    //   id: 'qqqq'
    // }

  ]);

  const onChange = (e) => {

    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);

  };



  const onSubmit = async (e) => {

    console.log(file)

    e.preventDefault();

    const formData = new FormData();

    formData.append('file', file);

    try {
      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          setUploadP({ ...uploatP, percentage: parseInt(Math.round(progressEvent.loaded * 100) / progressEvent.total) })


          setTimeout(() => {
            // Clear progress bar
            setUploadP({ uploaded: true, percentage: 0 });
          }, 2000);
        }

        


      });

      const id = uuidv4()

      const { fileName, filePath } = res.data;

      setUploads([...uploads, { fileName, filePath, id }]);

      setAlert({ msg: 'File Uploaded', type: 'success', show: true });

      setTimeout(() => {
        setAlert({ msg: '', type: '', show: false })
        setUploadP({ uploaded: false, percentage: 0 });
      }, 4000);


      setFileName('Choose File');
      setFile(null)


    } catch (err) {

      if (err.response.status === 500) {

        setAlert({ msg: 'There Was a Problem With a Server', type: 'danger', show: true });

        setTimeout(() => {
          setAlert({ msg: '', type: '', show: false });
          setUploadP({ uploaded: false, percentage: 0 });
        }, 3000)

      } else {

        setAlert({ msg: err.response.data.msg, type: 'danger', show: true })

        setTimeout(() => {
          setAlert({ msg: '', type: '', show: false });
          setUploadP({ uploaded: false, percentage: 0 });
        }, 3000)
      }

    }

  }

  const onDragStart = (e) => {

    e.persist()

    setImg({ imgPath: e.target.getAttribute('src'), imgName: e.target.nextElementSibling.textContent })


    e.target.classList.add('hold');

    setTimeout(() => {
      e.target.parentElement.classList.add('invisible');

    }, 0)
  }

  const onDragOver = (e) => {

    e.preventDefault();

  }

  const onDrop = (e) => {


    setReplace({ replaceName: e.target.nextElementSibling.textContent, replacePath: e.target.getAttribute('src') });

    e.target.setAttribute('src', img.imgPath);

    e.target.nextElementSibling.textContent = img.imgName;

    e.target.parentElement.classList.remove('enter');

  }

  const onDragEnd = (e) => {

    e.target.classList.remove('hold')
    e.target.parentElement.classList.remove('invisible');


    if (replace.replaceName !== '' && replace.replacePath !== '') {
      e.target.setAttribute('src', replace.replacePath);

      e.target.nextElementSibling.textContent = replace.replaceName;

    }

    setTimeout(() => {
      setReplace({ replaceName: '', replacePath: '' });
    }, 0);



  }

  const onDragEnter = (e) => {

    e.target.parentElement.classList.add('enter')

  }

  const onDragLeave = (e) => {


    e.target.parentElement.classList.remove('enter');

  }



  return (
    <Fragment>

      {alert.show && uploatP.uploaded && <Alert message={alert} />}



      <form onSubmit={onSubmit}>
        <div className="custom-file mb-4">
          <input type="file" className='custom-file-input' id='customFile' onChange={onChange} />
          <label htmlFor="customFile" className="custom-file-label" data-browse="Browse">{fileName}</label>
        </div>

        <ProgressBar percentage={uploatP.percentage} display={alert.type} />

        <input type="submit" value="Upload" className='btn btn-primary btn-block mt-4' />
      </form>

      <div className="grid">
        {uploads.length > 0 && uploads.map(upload => (
          <div
            style={{ width: '200px' }} key={upload.id} className=" card cardItem" >
            <img onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={onDrop}
              onDragEnd={onDragEnd}
              onDragEnter={onDragEnter}
              onDragLeave={onDragLeave} draggable='true' src={upload.filePath} alt='img' style={{ width: '100%' }} />
            <h5 className='card-title text-center' >{upload.fileName}</h5>
          </div>
        ))}

      </div>

    </Fragment>
  )
}

export default FileUpload
