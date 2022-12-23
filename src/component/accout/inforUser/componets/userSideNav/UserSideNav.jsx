import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { getAvatarUrl, userApi } from '../../../../Others/QueryApi'
import style from './UserSideNav.module.css'

export default function UserSideNav() {
  const {data: dataProfile } = useQuery({
    queryKey: ['/auth/me'],
    queryFn: userApi.getProfile
  })
  const profile = dataProfile?.data
  return (
    <div>
      <div className={style.sideNav_container}>
        <Link to='user/profile/' className={style.box_img_user}>
          <img src={getAvatarUrl(profile?.avatar)} alt='' className={style.img_user} />
        </Link>
        <div className={style.infor_user}>
          <div className={style.name_user}>{profile?.username}</div>
          <Link to='user/profile/' className={style.setting_infor}>
            <svg
              width={12}
              height={12}
              viewBox='0 0 12 12'
              xmlns='http://www.w3.org/2000/svg'
              style={{ marginRight: 4 }}
            >
              <path
                d='M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48'
                fill='#9B9B9B'
                fillRule='evenodd'
              />
            </svg>
            Sửa hồ sơ
          </Link>
        </div>
      </div>
      <div className={style.account_user}>
        <NavLink
          to='user/profile/'
          className={({isActive}) => isActive ? style.unActive_change_infor : style.active_change_infor}
        >
          <div className={style.box_icon_user}>
            <img src='https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4' alt='' className={style.icon_user} />
          </div>
          Tài khoản của tôi
        </NavLink>
        <NavLink
          to='user/change-password/'
          className={({isActive}) => isActive ? style.unActive_change_infor : style.active_change_infor}
        >
          <div className={style.box_icon_user}>
            <img src='https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4' alt='' className={style.icon_user} />
          </div>
          Đổi mật khẩu
        </NavLink>
        <NavLink
          to='user/historyOrder/'
          className={({isActive}) => isActive ? style.unActive_change_infor : style.active_change_infor}
        >
          <div className={style.box_icon_user}>
            <img src='https://cf.shopee.vn/file/f0049e9df4e536bc3e7f140d071e9078' alt='' className={style.icon_user} />
          </div>
          Đơn mua
        </NavLink>
      </div>
    </div>
  )
}
