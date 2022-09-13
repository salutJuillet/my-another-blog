import React, {useState, useRef, useEffect} from 'react'
import {ImSpinner11, ImEye, ImFilePicture, ImFileEmpty } from 'react-icons/im'
import { EditorState, convertToRaw } from 'draft-js'
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from 'draft-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styled from 'styled-components'
import post from '../api/post'

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

// const mdRules = [
//   {titel: 'From h1 to h6', rule:'# Heading -> ###### Heading'},
//   {title: 'Blobkquote', rule: '> 인용문'},
//   {title: 'Image', rule: '![image alt](http://image_url.com)'},
//   {title: 'Link', rule: '[Link Text](http//your_link.com)'},
// ]

const PostForm = () => {
  const [myForm, setMyForm] = useState({
    title: '',
    meta: '',
    tags: [],
    author: 'juillet',
    file: null,
    filename: ''
  });

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [featured, setFeatured] = useState(false);
  const handleFile = (e) => {
    setMyForm({
      ...myForm,
      file: e.target.files[0],
      filename: e.target.value
    })
    // console.dir(e.target.files);
  }

  const titleRef = useRef();
  const metaRef = useRef();
  const tagRef = useRef();

  // useEffect(()=>{
  //   titleRef.current.focus(); //제목 input을 focused
  // }, [])

  const handleMyForm = (e) => {
    setMyForm({
      ...myForm,
      [e.target.name]: e.target.value
    })
  }

  const handleFeatured = () => {
    setFeatured(!featured);
  }

  const enterComma = (e) => {
    const {value} = e.target;
    if(e.keyCode === 32){ //태그 작성 시 스페이스바를 눌렀을 때 자동으로 ,가 생성됨
      setMyForm({
        ...myForm,
        tags: value + ','
      })
    }else{
      return false;
    }
  }
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { title, meta, tags, author } = myForm; //이 값들은 useState에서 들어온 값이므로 새로 FormData로 만들어서 보내줘야 한다. -> 105번째 줄
    if(!title.trim()) return titleRef.current.focus();
    if(!tags.trim()) return tagRef.current.focus();
    if(!meta.trim()) return metaRef.current.focus();

    const arrTags = myForm.tags.split(', ');
    const slug = title.replace(/[^a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣 ]/g, ' ')
                .split(" ")
                .filter(item => item.trim())
                .join('-'); //slug 자동 제작됨
    const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('meta', meta);
    formData.append('tags', arrTags);
    formData.append('slug', slug);
    formData.append('featured', featured);
    formData.append('author', author);
    const config = {
      headers:{
        'content-type':'multipart/form-data'
      }
    }
  }

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState)
  }
  // console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));

  return (
    <MyStyle onSubmit={handleFormSubmit}>
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
        <input type='checkbox' id='featured' hidden
               defaultChecked={featured} 
               onChange={handleFeatured} />
        <label htmlFor='featured' className='flex items-center space-x-2 cursor-pointer group'>
          <div className='w-4 h-4 rounded-full border-2 flex items-center justify-center border-black'>
            {
              featured ? (
                <div className='w-2 h-2 rounded-full bg-black' />
              ) : (
                <div className='w-2 h-2 rounded-full bg-transparent' />
              )
            }
            
          </div>
          <div className='hover:bg-transparent ring-black transition relative'>
            최근글로 등록
            <div className='hidden group-hover:block absolute bottom-0.5 bg-black' style={{width:87.125, height:2}} />
          </div>
        </label>
      </div>
      
      <div className='px-5 bg-black rounded-full py-5 mt-2'>
          <ul className='mt-12'>
            <li> {/* title */}
              <input type='text' name='title' placeholder='제목'
                     className='border border-gray-800 rounded-md w-full my-1 p-1'
                     id='title' 
                     ref={titleRef}
                     value={myForm.title}
                     onChange={handleMyForm} />
            </li>
            <li> {/* content */}
              <Editor
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
              />
              {/* <textarea rows='20' name='content' className='border border-gray-800 rounded-md w-full mb-1 p-1 resize-none' id='content'></textarea> */}
            </li>
            <li> {/* image */}
              {/* <div className='flex'>
                <label htmlFor='image-input' className='flex items-center spacex-x-2 px-3 ring-1 ring-black rounded h-10  hover:text-white hover:bg-black transition'>
                  <span>이미지 등록</span>
                  <ImFilePicture />
                </label> */}
                <input type='file' name='thumbnail' multiple={true}
                       className='border border-gray-800 rounded-md w-full my-1 p-1 bg-white text-gray-400' 
                       id='image-input'
                       file={myForm.file}
                       value={myForm.filename}
                       onChange={handleFile}  />
              {/* </div>               */}
            </li>
            <li> {/* tags */}
              <input type='text' name='tags' placeholder='태그' 
                     className='border border-gray-800 rounded-md w-full my-1 p-1' 
                     id='tags'
                     ref={tagRef}
                     value={myForm.tags}
                     onChange={handleMyForm}
                     onKeyDown={enterComma} />
            </li>
            <li> {/* meta description */}
              <textarea rows='2' name='meta' placeholder='간단한 설명' 
                        className='border border-gray-800 rounded-md w-full my-1 p-1 resize-none' 
                        id='meta'
                        ref={metaRef}
                        onChange={handleMyForm}
                        value={myForm.meta} />
              {/* <input type='text' name='meta' placeholder='meta' className='border border-gray-800 rounded-md w-full my-1 p-1' id='meta description' /> */}
            </li>

          </ul>

          <div className='flex flex-row justify-center items-center my-7'>
            <button type='submit' className='border-2 rounded-full inline-block py-3 px-10 mx-2 hover:bg-white text-white bg-black hover:text-black'>등록</button>
            <button className='border-2 rounded-full inline-block py-3 px-10 mx-2 hover:bg-white text-white bg-black hover:text-black'>취소</button>
          </div>
      </div>
    </MyStyle>
  )
}

export default PostForm