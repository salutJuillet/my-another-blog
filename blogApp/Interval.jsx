/** callback과 딜레이 값을 갖는 Interval.jsx **/
import React, { useRef, useEffect } from 'react'

const Interval = ( callback, delay ) => {
  
  const savedCallback = useRef();
  
  useEffect(()=>{
     savedCallback.current = callback;
  }, [callback])  

  useEffect(()=>{
     function tick(){
        savedCallback.current();
     }
     if(delay !== null) {
        const id = setInterval(tick, delay);
        return ()=> clearInterval(id);
     }
  }, [delay])
}

export default Interval