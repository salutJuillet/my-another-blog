import React, {useState, useRef, useEffect} from 'react'
import {ImSpinner11, ImEye } from 'react-icons/im'
import styled from 'styled-components'
import { useValidation } from '../context/ValidationProvider'


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
  {title: 'From h1 to h6', rule:'# Heading => ######'},
  {title: 'Image', rule:'![alt 내용](http://이미지경로)'},
  {title: 'Link', rule:'[Link 텍스트](http://링크경로)'},
  {title: 'Blockquote', rule:'> Your Quote'}
]

const PostForm = () => {
  const [postInfo, setPostInfo] = useState({
    title:'',
    thumbnail:'',
    featured:false,
    content:'',
    tags:[],
    meta:'',
    author:'juillet'
  });
  const {title, content, featured, tags, meta} = postInfo;
  const [selectedThumbUrl, setSelectedThumbUrl] = useState('');
  const [imageUrlCopy, setImageUrlCopy] = useState('');

  const { updateValidation } = useValidation();

  /* 이미지 주소 복사해서 markdown rule 적용하고 복사 */
  const imageCopy = () => {
    const rulesTextCopy = `![이미지 설명을 입력하세요.](${imageUrlCopy})`;
    navigator.clipboard.writeText(rulesTextCopy);
  }

  const handleChange = ({target}) => {
    const {value, name, checked} = target;

    if(name === 'thumbnail'){
        const file = target.files[0];
        if(!file.type?.includes('image')){
          return updateValidation('warning', '이미지만 업로드 가능합니다.');
        }
        setPostInfo({...postInfo, thumbnail:value});
        return setSelectedThumbUrl(URL.createObjectURL(file));
    }

    if(name === 'featured'){
        return setPostInfo({...postInfo, [name]: checked});
    }

    if(name === 'tags'){
        const newTags = tags;
        console.log(newTags);
        // if(tags.length > 10) {
        //     updateValidation('warning', '태그는 10자 이하로만 작성해주세요.');
        // }
        if(newTags.length > 5) {
            updateValidation('warning', '태그는 4개까지만 등록이 가능합니다.');
        }
        return setPostInfo({...postInfo, tags: newTags});
    }

    if(name === 'meta' && meta.length > 100) {
        return setPostInfo({...postInfo, meta: value.substring(0,100)});
        //meta가 100자를 초과하면 잘라버리기
    }

    if(name === 'title'){
        const slug = value.replace(' ', '-');
        return setPostInfo({...postInfo, title: value, slug});
    }

    setPostInfo({...postInfo, [name]:value});
  }

  const titleRef = useRef();
  const metaRef = useRef();
  const tagRef = useRef();

  const enterComma = (e) => {
    const {value} = e.target;
    if(e.keyCode === 32){ //태그 작성 시 스페이스바를 눌렀을 때 자동으로 ,가 생성됨
      setPostInfo({
        ...postInfo,
        tags: value + ','
      })
    }else{
      return false;
    }
  }
  
  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   const { title, meta, tags, author } = myForm; //이 값들은 useState에서 들어온 값이므로 새로 FormData로 만들어서 보내줘야 한다. -> 105번째 줄
  //   if(!title.trim()) return titleRef.current.focus();
  //   if(!tags.trim()) return tagRef.current.focus();
  //   if(!meta.trim()) return metaRef.current.focus();

  //   const arrTags = myForm.tags.split(', ');
  //   const slug = title.replace(/[^a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣 ]/g, ' ')
  //               .split(" ")
  //               .filter(item => item.trim())
  //               .join('-'); //slug 자동 제작됨
  //   const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));

  //   const formData = new FormData();
  //   formData.append('title', title);
  //   formData.append('content', content);
  //   formData.append('meta', meta);
  //   formData.append('tags', arrTags);
  //   formData.append('slug', slug);
  //   formData.append('featured', featured);
  //   formData.append('author', author);
  //   const config = {
  //     headers:{
  //       'content-type':'multipart/form-data'
  //     }
  //   }
  // }


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
        <input type='checkbox' onChange={handleChange} name='featured' id='featured' hidden />
        <label htmlFor='featured' className='flex items-center space-x-2 cursor-pointer group'>
          <div className='w-4 h-4 rounded-full border-2 flex items-center justify-center border-black'>
            {
              featured &&
                <div className='w-2 h-2 rounded-full bg-black' />
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
            {/* title */}
            <li> 
              <input type='text' name='title' placeholder='제목'
                     className='border border-gray-800 rounded-md w-full p-1'
                     id='title' 
                     ref={titleRef}
                     onChange={handleChange} />
            </li>
            
            {/* content */}
            <li className='flex relative'> 
              <textarea 
                  rows='20' 
                  name='content' 
                  value={content}
                  onChange={handleChange}
                  id='content' 
                  placeholder='## Markdown'
                  className='border border-gray-800 rounded-md w-full mt-1 p-1 resize-none'  />
              {/* markdown */}
              {/* {
                 && ( */}
                  <div className='border border-dashed border-black rounded absolute bg-white bottom-0 -left-2 -translate-x-full mb-1 overflow-hidden'>
                    { 
                      mdRules.map(({title,rule})=>{
                          return (
                              <div key={title} className='p-2 list-none'>
                                  <p className='font-semibold text-gray-500'>{title}</p>
                                  <p className='font-semibold text-gray-700 pl-2 font-mono text-sm'>{rule}</p>
                              </div>
                          )
                      })
                    }
                  </div>
                {/* )
              } */}
              
            </li>

            {/* image */}
            <li> 
              <div className='flex border border-gray-800 rounded-md w-full mt-1 p-1 bg-white text-gray-400'>
                <label htmlFor='thumbnail' className='flex flex-col justify-center items-start'>
                  <span className='pt-1 px-3 rounded text-white bg-black hover:text-black hover:bg-white hover:ring-1 hover:ring-black transition cursor-pointer'>이미지 업로드</span>
                  <div>
                    {
                        selectedThumbUrl 
                        ? <img src={selectedThumbUrl} 
                               alt='thumbnail'
                               className='shadow-sm mt-1 max-h-40 border border-dashed border-gray-500 rounded overflow-hidden' /> 
                        : ''
                    }
                  </div>
                    
                </label>
                <input type='file' name='thumbnail'
                       id='thumbnail'
                       onChange={handleChange}
                       hidden
                />
              </div>              
            </li>

            {/* tags */}
            <li> 
              <input type='text' name='tags' placeholder='태그' 
                     className='border border-gray-800 rounded-md w-full mt-1 p-1' 
                     id='tags'
                     ref={tagRef}
                     value={tags}
                     onChange={handleChange}
                     onKeyDown={enterComma} />
            </li>

            {/* meta description */}
            <li> 
              <textarea rows='2' name='meta' placeholder='간단한 설명' 
                        className='border border-gray-800 rounded-md w-full mt-1 p-1 resize-none' 
                        id='meta'
                        ref={metaRef}
                        onChange={handleChange}
                        value={meta} />
              {/* <input type='text' name='meta' placeholder='meta' className='border border-gray-800 rounded-md w-full my-1 p-1' id='meta description' /> */}
            </li>
          </ul>


          <div className='flex flex-row justify-center items-center my-7'>
            <button type='submit' className='border-2 rounded-full inline-block py-3 px-10 mx-2 hover:bg-white text-white bg-black hover:text-black transition'>등록</button>
            <button className='border-2 rounded-full inline-block py-3 px-10 mx-2 hover:bg-white text-white bg-black hover:text-black transition'>취소</button>
          </div>
      </div>
    </MyStyle>
  )
}

export default PostForm