import styles from './GalleryCarousel.module.scss';
import classNames from 'classnames/bind';
import Carousel from 'nuka-carousel'
import {Link} from 'react-router-dom'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { openModal } from '../../../../features/counter/ModalSlice';

function GalleryCarousel({dataProps}) {
  const dispatch = useDispatch()
  const cx = classNames.bind(styles)
  return ( 
      <>
        <div className={cx('wrapper')}>
          <div className={cx('title')}>
              <h3 className={cx('flash-sale-title')}>Flash Sale</h3>
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
                  <LeftOutlined style={{fontSize : '30px'}}/>
              </button>
            )}
            renderCenterRightControls={({ nextDisabled, nextSlide }) => (
              <button className={cx('btn-control-arrow')} onClick={nextSlide} disabled={nextDisabled}>
                  <RightOutlined />
              </button>
            )}
           >
              {dataProps.map((item,index)=>{
                return<div className={cx('card-box')} key={item._id}>
                        <div className={cx('img-box')}>
                          <img 
                            draggable={false} 
                            src={item.thump}
                            alt="" 
                            width='100%' 
                          />
                        </div>
                        <p className={cx('card-box-name')}>{item.productName}</p>
                        <h3 className={cx('card-box-price')}>{item.price}</h3>
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