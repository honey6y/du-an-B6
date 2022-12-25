import React  from 'react'
import styles from './QuantityInput.module.scss'
import classNames from 'classnames/bind'
import { useState } from 'react'

function QuantityInput() {
  const [control, setControl] = useState(1)
  const cx =classNames.bind(styles)
  const handleDecrease = () => {
    setControl((pre)=>{
      pre = pre < 2 ? pre = 1 : pre -= 1
      return pre  
    })
  };
  const handleIncrease = () => {
    setControl((pre)=>{
      return pre += 1
    })
  };
  return (
    <div className={cx('control-box')}>
        <div className={cx('btn-decrease')} onClick={handleDecrease}>-
        </div>
        <input className={cx('display-control')} value={ control} />
        <div className={cx('btn-increase')} onClick={handleIncrease}>+
    </div>
  </div>
  )
}

export default QuantityInput