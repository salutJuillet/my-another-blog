import React, { useEffect, useState } from 'react'
import { getPosts } from '../api/post'
import PostCard from './PostCard'


let pageNo = 0;
const POST_LIMIT = 9;

const Home = () => {

  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const {error, posts} = await getPosts(pageNo, POST_LIMIT);
    if(error) return console.log(error);
    // console.log(posts);
    setPosts(posts);
  }

  useEffect(()=>{
    fetchPosts();
  }, [])

  return (
    <div className='grid grid-cols-3 gap-3'>
      {posts.map((post)=>(
        <PostCard post={post} key={post.id} />
      ))}
    </div>
  )
}

export default Home