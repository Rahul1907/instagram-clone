import React from 'react'
import Avtar from '@material-ui/core/Avatar';

import '../css/post.css';

function Post({username,caption,imageUrl}) {
  return (
    <div className='post'>
      <div className='post_header'>
        <Avtar
          className='post_avtar'
          alt='Rahul'
          src='https://placeimg.com/640/480/animals'
        />
        <h3>{username}</h3>
      </div>
      {/* header ---- avtar */}

      <img className='post_image' src={imageUrl} alt=''/>
      {/* image */}
      <h4 className='post_text'><strong>{username}</strong> {caption}</h4>
      {/* username + caption */}
    </div>
  )
}

export default Post
