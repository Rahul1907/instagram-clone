import { Button } from '@material-ui/core'
import React,{useState} from 'react'

function ImageUpload() {

  const [image,setImage] = useState(null);
  const [progress,setProgress] = useState(0);
  const [caption,setCaption] = useState('');


  const handleChange = (e) =>{
    if(e.target.files[0])
      setImage(e.target.files[0])
  }

  const handleUpload = (e) =>{
    e.target.preventDeafult();
    
  }

  return (
    <div>
      <h1>abcd</h1>
      <input type='text' placeholder='Enter a caption...' onChange={(e)=>{ setCaption(e.target.value)}} value={caption}/>
      <input type='file' onChange={handleChange}/>
      <Button onClick={handleUpload}>
        Upload
      </Button>
    </div>
  )
}

export default ImageUpload
