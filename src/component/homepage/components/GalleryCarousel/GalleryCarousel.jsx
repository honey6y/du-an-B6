import styles from './GalleryCarousel.module.scss';
import classNames from 'classnames/bind';
import Carousel from 'nuka-carousel'
import {Link, useNavigate} from 'react-router-dom'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { openModal } from '../../../../features/counter/ModalSlice';

function GalleryCarousel({dataProps , title, isSale}) {
  const nav = useNavigate()
  const dispatch = useDispatch()
  const cx = classNames.bind(styles)
  return ( 
      <>
        <div className={cx('wrapper')}>
          <div className={cx('title')}>
              <h3 className={cx('flash-sale-title')}>{title}</h3>
              <Link to={'/category'} className={cx('more')}>More ...</Link>
          </div>
          <Carousel 
            wrapAround={true} 
            slidesToShow={5} 
            dragThreshold={0.1} 
            renderBottomCenterControls={null}
            autoplay={true}
            renderCenterLeftControls={({ previousDisabled, previousSlide }) => (
              <button className={cx('btn-control-arrow')} onClick={previousSlide} disabled={previousDisabled}>
                  <LeftOutlined />
              </button>
            )}
            renderCenterRightControls={({ nextDisabled, nextSlide }) => (
              <button className={cx('btn-control-arrow')} onClick={nextSlide} disabled={nextDisabled}>
                  <RightOutlined />
              </button>
            )}
           >
              {dataProps.map((item,index)=>{
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
      </>
  )
}

export default GalleryCarousel;