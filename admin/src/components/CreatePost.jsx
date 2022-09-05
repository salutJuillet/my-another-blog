import React from 'react'
import {ImSpinner11, ImEye, ImFilePicture, ImFileEmpty } from 'react-icons/im'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styled from 'styled-components'

const MyStyle = styled.form`
  .wrapper-class{
    box-sizing: border-box;
    border:1px solid black;
    border-radius:0.375rem;
    width:100%;
    height:600px;
    margin:0.25rem 0;
    /* padding:0.25rem;     */
    background:white;
    overflow: hidden;
    :focus-within{
      border-width:3px;
      box-shadow:1px 1px white, -1px -1px white;
    }
  }
  .editor-class{
    height:calc(100% - 20px);
    padding:0 5px;
  }
`

const mdRules = [
  {titel: 'From h1 to h6', rule:'# Heading -> ###### Heading'},
  {title: 'Blobkquote', rule: '> 인용문'},
  {title: 'Image', rule: '![image alt](http://image_url.com)'},
  {title: 'Link', rule: '[Link Text](http//your_link.com)'},
]

const CreatePost = () => {
  return (
    <MyStyle>
      <div className='flex items-center justify-between px-5'>
        <h1 className='text-xl font-semibold'>
          새 포스트 작성
        </h1>
        <div className='flex items-center space-x-2'>
          <button className='flex items-center px-3 ring-1 ring-black rounded h-10 text-white bg-black hover:text-black hover:bg-white transition'>
            <ImSpinner11 />
          </button>
          <button className='flex flex-col items-center px-3 ring-1 ring-black rounded h-10 text-white bg-black hover:text-black hover:bg-white transition justify-center'>
            <ImEye />
            <span style={{marginTop:-3, fontSize:'0.7rem'}}>View</span>
          </button>
          <button className='flex w-36 items-center space-x-2 px-3 ring-1 ring-black rounded h-10 text-white bg-black hover:text-black hover:bg-white transition justify-center'>Post</button>
        </div>
      </div>

      <div className='px-5'> {/* featured checkbox */}
        <input type='checkbox' id='featured' hidden />
        <label htmlFor='featured' className='flex items-center space-x-2 cursor-pointer group'>
          <div className='w-4 h-4 rounded-full border-2 border-gray-600 flex items-center justify-center group-hover:border-black'>
            <div className='w-2 h-2 rounded-full bg-gray-600 group-hover:bg-black' />
          </div>
          <span className='text-gray-600 group-hover:text-black hover:bg-transparent ring-black transition'>최근글로 등록</span>
        </label>
      </div>
      
      <div className='px-5 bg-black rounded-full py-5 mt-2'>
          <ul className='mt-12'>
            <li> {/* title */}
              <input type='text' name='title' placeholder='제목' className='border border-gray-800 rounded-md w-full my-1 p-1' id='title' />
            </li>
            <li> {/* content */}
              <Editor
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
              />
              {/* <textarea rows='20' name='content' className='border border-gray-800 rounded-md w-full mb-1 p-1 resize-none' id='content'></textarea> */}
            </li>
            <li> {/* image */}
              {/* <div className='flex'>
                <label htmlFor='image-input' className='flex items-center spacex-x-2 px-3 ring-1 ring-black rounded h-10  hover:text-white hover:bg-black transition'>
                  <span>이미지 등록</span>
                  <ImFilePicture />
                </label> */}
                <input type='file' name='thumbnail' className='border border-gray-800 rounded-md w-full my-1 p-1 bg-white text-gray-400' id='image-input'  />
              {/* </div>               */}
            </li>
            <li> {/* tags */}
              <input type='text' name='tags' placeholder='태그' className='border border-gray-800 rounded-md w-full my-1 p-1' id='tags' />
            </li>
            <li> {/* meta description */}
              <textarea rows='2' name='content' placeholder='간단한 설명' className='border border-gray-800 rounded-md w-full my-1 p-1 resize-none' id='meta'></textarea>
              {/* <input type='text' name='meta' placeholder='meta' className='border border-gray-800 rounded-md w-full my-1 p-1' id='meta description' /> */}
            </li>

          </ul>
          
{/* <div className='bg-white absolute top-1/2-translate-y-1/2 px-2 py-4 rounded'>
  <h1 className='font-semibold text-center'>규칙</h1>
  <ul className='space-y-2'>
    {mdRules.map(({title, rule}) => {
      return(
        <li key={title}>
          <p className='font-semibold text-gray-500'>{title}</p>
          <p className='font-semibold text-gray-700 pl-2 font-mono'>{rule}</p>
        </li>
      )
    })}
    <li className='text-center'>
      <a href="https://www.markdownguide.org/basic-syntax" target='_blank'>더보기</a>
    </li>
  </ul>
</div> */}

          <div className='flex flex-row justify-center items-center my-7'>
            <button className='border-2 rounded-full inline-block py-3 px-10 mx-2 hover:bg-white text-white bg-black hover:text-black'>등록</button>
            <button className='border-2 rounded-full inline-block py-3 px-10 mx-2 hover:bg-white text-white bg-black hover:text-black'>취소</button>
          </div>
      </div>

    </MyStyle>
    
  )
}

export default CreatePost