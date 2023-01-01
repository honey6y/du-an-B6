import styles from './GalleryCarousel.module.scss';
import classNames from 'classnames/bind';
import Carousel from 'nuka-carousel'
import {Link, useNavigate} from 'react-router-dom'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { openModal } from '../../../../features/counter/ModalSlice';
import { useEffect, useRef, useState } from 'react';

function GalleryCarousel({dataProps , title, isSale}) {
  const nav = useNavigate()
  const dispatch = useDispatch()
  const cx = classNames.bind(styles)
  const dataRender = dataProps || (JSON.parse(localStorage.getItem('seen') || "[]"))
  dataRender.forEach(item => {
    if (!item.thump[0].includes('http')) {
      item.thump[0] = `${process.env.REACT_APP_SRC_IMG}${item.thump[0]}`
    }
  })
  const [slidesToShow, setSlideToShow] = useState(0)
  useEffect (() => {
    if(window.innerWidth > 1268) {
      setSlideToShow(5)
    } else if (window.innerWidth > 992) {
      setSlideToShow(4)
    } else if (window.innerWidth > 600) {
      setSlideToShow(3)
    } else if (window.innerWidth < 600) {
      setSlideToShow(2)
    }
  }, [])
  useEffect (() => {
    window.addEventListener('resize', reportWindowSize);
    function reportWindowSize() {
      console.log('memory leak')
      if(window.innerWidth > 1268) {
        setSlideToShow(5)
      } else if (window.innerWidth > 992) {
        setSlideToShow(4)
      } else if (window.innerWidth > 600) {
        setSlideToShow(3)
      } else if (window.innerWidth < 600) {
        setSlideToShow(2)
      }
    }

    return () => {
      window.removeEventListener('resize', reportWindowSize)
    }
  })
  return ( 
      <>
        {dataRender.length? <div>
          <div className={cx('wrapper')} >
            <div className={cx('title')}>
                <h3 className={cx('flash-sale-title')}>{title}</h3>
            </div>
            <Carousel 
              wrapAround={false}
              slidesToShow={slidesToShow}
              dragThreshold={0.1} 
              renderBottomCenterControls={null}
              autoplay={dataRender.length > slidesToShow}
              renderCenterLeftControls={({ previousDisabled, previousSlide }) => (
                dataRender.length > slidesToShow ? 
                <button className={cx('btn-control-arrow')} onClick={previousSlide} disabled={previousDisabled}>
                    <LeftOutlined />
                </button> :
                null
              )}
              renderCenterRightControls={({ nextDisabled, nextSlide }) => (
                dataRender.length > slidesToShow ? 
                <button className={cx('btn-control-arrow')} onClick={nextSlide} disabled={nextDisabled}>
                    <RightOutlined />
                </button> :
                null
              )}
            >
                {dataRender.map((item,index)=>{
                  return<div className={cx('card-box')} key={item._id} >
                          {isSale ? <div className={cx('sale-box')}>-30%</div> : null}
                          <div className={cx('img-box')}>
                            <img 
                              draggable={false} 
                              src={item.thump[0]}
                              alt="" 
                              width='100%' 
                              onClick={()=>nav(`/detail/${item._id}`)}
                            />
                          </div>
                          <p className={cx('card-box-name')} onClick={()=>nav(`/detail/${item._id}`)}>{item.productName}</p>
                          <h3 className={cx('card-box-price')}>{item.price?.toLocaleString()}</h3>
                          <button className={cx('btn-buy')} onClick={()=>{
                            dispatch(openModal(item));
                          }}>Mua ngay</button>
                    </div>
                })}
            </Carousel>
          </div>
        </div> : null}
      </>
  )
}

export default GalleryCarousel;