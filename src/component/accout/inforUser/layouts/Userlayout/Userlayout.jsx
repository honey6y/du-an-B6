import React from 'react'
import { Outlet } from 'react-router-dom'
import UserSideNav from '../../componets/userSideNav/UserSideNav'
import style from './Userlayout.module.css'

export default function Userlayout() {
  return (
    <div className={style.container_userLayout}>
        <div className={style.box_userLayout}>
            <div>Hee</div>
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