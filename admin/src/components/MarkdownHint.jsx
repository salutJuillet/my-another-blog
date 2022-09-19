import React, { useEffect, useRef } from 'react'


const mdRules = [
    {title: 'From h1 to h6', rule:'# Heading => ######'},
    {title: 'Image', rule:'![alt 내용](http://이미지경로)'},
    {title: 'Link', rule:'[Link 텍스트](http://링크경로)'},
    {title: 'Blockquote', rule:'> Your Quote'}
]

const MarkdownHint = () => {

  const container = useRef();

  useEffect(()=>{
    container.current?.classList.remove('-translate-y-5', 'opacity-0')
    container.current?.classList.add('-translate-y-0', 'opacity-1')
  }, [])

  return (
    <div ref={container} className="bg-white px-2 py-4 rounded -translate-y-5 opacity-0">
        <h1 className="font-semibold mt-2 mb-4 text-center">General markdown rules</h1>
        <ul>
            {
                mdRules.map(({title,rule})=>{
                    return (
                        <li key={title} className='py-2'>
                            <p className='font-semibold text-gray-500'>{title}</p>
                            <p className='font-semibold text-gray-700 pl-2 font-mono text-sm'>{rule}</p>
                        </li>
                    )
                })
            }
            <li className='text-center mt-3 mb-2'>
                <a href='https://www.markdownguide.org/basic-syntax/' 
                   target='_blank'>더보기</a>
            </li>
        </ul>
    </div>
  )
}

export default MarkdownHint