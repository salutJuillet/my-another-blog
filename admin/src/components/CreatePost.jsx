import React, { useState, useEffect } from 'react'
import { createPost } from '../api/post'
import { useValidation } from '../context/ValidationProvider'
import { useNavigate } from 'react-router-dom';

import PostForm, {defaultPost} from './PostForm_copy'

const CreatePost = () => {

  const [postInfo, setPostInfo] = useState(defaultPost);
  const [busy, setBusy] = useState(false);

  const { updateValidation } = useValidation();
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    setBusy(true);
    const {error, post} = await createPost(data);
    setBusy(false);
    if(error) return updateValidation(error);
    navigate(`/update-post/${post.slug}`);
  }

  useEffect(()=>{
    const result = localStorage.getItem('blogPost');
    if(!result) return;

    const oldPost = JSON.parse(result);
    setPostInfo({...defaultPost, ...oldPost});
  }, [])

  return (
    <PostForm onSubmit={handleSubmit} initialPost={postInfo} busy={busy} />
  )
}

export default CreatePost