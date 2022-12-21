import { useRef, useState } from "react";
import styles from './LazyLoad.module.scss'
import classNames from "classnames/bind";



function LazyLoad(placeholderSrc ,src)  {
  const cx = classNames.bind(styles)
  const [isloading , setIsLoading] = useState(true);
  console.log(src)
  const placeholderRef = useRef(null)
  return ( 
    <>
        {isloading && 
          <img
            src={placeholderSrc}
            alt=''
            ref={placeholderRef}

           />
        }
        <img
          src={src}
          className={isloading ? cx('hidden') : cx(`a`)}
          onLoad={()=>setIsLoading(false)}
        />
    </>
   );
}

export default LazyLoad;