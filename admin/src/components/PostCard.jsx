import React from 'react'
import dateFormat from 'dateformat'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const PostCard = ({post}) => {

  if(!post) return null;
  const { title, content, meta, tags, thumbnail, slug, createdAt} = post;

  return (
    <div className='border-2 border-black rounded-md overflow-hidden p-3 space-y-1.5'>
        {
            thumbnail ? (
                // <img src={`/server/uploads/${thumbnail}`} alt={title} className="aspect-video" />
                <img src={`uploads/${thumbnail}`} alt={title} className="aspect-square object-cover" />
            ) : (
                <img src='images/no_image_available.png' alt='No image' />
            )
        }
        <h1 className="text-lg font-semibold text-gray-700">
          { title.length > 40 ? (title.substring(0, 40) +'...') : title}
        </h1>
        <div className='border border-dashed p-1 border-black  rounded-md overflow-hidden'>
          <p className='text-gray-500'>
            { content.length > 72 ? (content.substring(0, 72) +'...') : content}
          </p>
        </div>
        <p>{dateFormat(createdAt, "mediumDate")}</p>
        <p>{tags.map(tag => `#${tag}`).join(', ')}</p>

        <div className="flex space-x-3">
          <Link to={`/update-post/${slug}`} className='w-8 h-8 rounded-full border-black bg-black hover:bg-white hover:border hover:text-blue-600 flex justify-center items-center text-white'>
            <AiOutlineEdit />
          </Link>
          <Link to='delete-post' className='w-8 h-8 rounded-full border-black bg-black hover:bg-white  hover:border hover:text-red-600 flex justify-center items-center text-white'>
            <AiOutlineDelete />
          </Link>
        </div>
    </div>
  )
}

export default PostCard