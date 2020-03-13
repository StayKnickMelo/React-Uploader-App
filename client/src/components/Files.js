import React, {useState} from 'react';


const Files = ({ upload }) => {

  const { filePath, fileName } = upload;

  const [img, setImg] = useState({
    imgPath: '',
    imgName: ''
  })


  const onDragStart = (e) => {

    e.persist()

    // console.log(e.target)

    console.log(e.target.firstElementChild.getAttribute('src'));
    console.log(e.target.lastElementChild.textContent)

    setImg({ imgPath: e.target.firstElementChild.getAttribute('src'), imgName: e.target.lastElementChild.textContent })

    


    e.target.classList.add('hold');

    setTimeout(() => {
      e.target.classList.add('invisible');

    }, 0)
  }

  const onDragOver = (e) => {
    
    e.preventDefault();

  }

  const onDrop = (e) => {
   
    if(e.target.classList.contains('card')){
      e.target.firstElementChild.setAttribute('src', img.imgPath);
    }

  }

  const onDragEnd = (e) => {

    e.target.classList.remove('hold')
    e.target.classList.remove('invisible');

  }

  const onDragEnter = (e) => {
   
    // console.log(e.target);

    if(e.target.classList.contains('card')){

      e.target.classList.add('hover');

      console.log(e.target)
    }

  }

  const onDragLeave = (e)=> {

    if (e.target.classList.contains('card')) {

      e.target.classList.remove('hover');

      console.log(e.target)
    }

  }



  return (


    <div  className="col my-4 ">
      <div onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onDragEnd={onDragEnd}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        draggable='true' className=" card border-primary" >
        <img draggable='false' src={filePath} style={{ width: '100%' }} />
        <h5 className='card-title text-center' >{fileName}</h5>
      </div>
    </div>




  )
}

export default Files;


{/* <div style={{ border: '1px solid red' }}>
        <h3 className='text-center'>{fileName}</h3>
        <img style={{ width: '100%' }} src={filePath} />
      </div> */}
