import React from 'react'
import style from "./ProductError.module.css";
export default function ProductError() {
  return (
    <div className={style.productError}>
        <img src="https://media.vov.vn/sites/default/files/styles/large_watermark/public/2022-11/het_xang.jpg"
          alt="" 
            className={style.productErrorImg}
        />
    </div>
  )
}
