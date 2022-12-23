import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import UserSideNav from '../../componets/userSideNav/UserSideNav'
import style from './Userlayout.module.css'

export default function Userlayout() {
  return (
    <div className={style.container_userLayout}>
        <div className={style.box_userLayout}>
            <div className={style.login_header_title}>
                <Link to="/" className={style.change_home}>Trang chủ</Link>
                <span className={style.seperate}>/</span>
                <span className={style.nameLogin}>Tài khoản của tôi</span>
            </div>
            <div className={style.userLayout_body}>
                <div className={style.user_side_nav}>
                    <UserSideNav />
                </div>
                <div className={style.infor_layout}>
                    <Outlet/>
                </div>
            </div>
        </div>
    </div>
  )
}