import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from "react-router-dom"
import { toast } from 'react-toastify'
import { rules } from '../../Others/Rules'
import style from "./Identify.module.css"


export default function Identify() {
    const { register, handleSubmit, formState: { errors }, reset} = useForm()
    const onSubmit = handleSubmit (() => {
        // setSpamSubmit(true)
        toast.success('Yêu cầu của bạn đã được chấp thuận')
        reset()
    })
  return (
    <div className={style.login_bg}>
            <div className={style.login_container}>
                <div className={style.login_header_title}>
                    <Link to="/" className={style.change_home}>Trang chủ</Link>
                    <span className={style.seperate}>/</span>
                    <span className={style.nameLogin}>Quên mật khẩu</span>
                </div>
                <div className={style.login_body_container}>
                    <div className={style.login_body}>
                        <form onSubmit={onSubmit} className={style.login_form} noValidate>
                            <div className={style.login_title}>Cài đặt lại mật khẩu</div>
                            <div className={style.seperate_title}>Mật khẩu mới sẽ được gửi về email của bạn.</div>
                            {(errors.email?.message) || (errors.password?.message) ? (
                               <div className={style.login_error}>😟 Vui lòng kiểm tra lại</div>
                            ): ''}
                            <div className={style.input_container}>
                                <input type="email" name='email'  placeholder="Email" className={style.input}
                                    {...register("email", rules.email)}
                                    autoComplete='on'
                                />
                                <div className={style.infor_error}>{errors.email?.message}</div>
                            </div>
                            <div className={style.input_container}>
                            <button type="submit" className={style.button_login}>
                                    <span className={style.button_name}>Gửi</span>
                                </button>
                            </div>
                            <div className={style.button_others_container}>
                                <p>
                                    <Link to='/login' className={style.button_others}>Quay lại trang đăng nhập</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
  )
}
