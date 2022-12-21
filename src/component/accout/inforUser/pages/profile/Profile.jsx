import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { userApi } from '../../../../Others/QueryApi'
import style from './Profile.module.css'

export default function Profile() {


  const {register, handleSubmit, formState: { errors}, setError, watch} = useForm({
    defaultValues: {
      username: '',
      phone: '',
      avatar: '',
      dateOfBirth: '',
      address: ''
    }
  })
  const {data: dataProfile } = useQuery({
    queryKey: ['/auth/me'],
    queryFn: userApi.getProfile
  })
  console.log(dataProfile);
  return (
    <div className={style.container_profile}>
      <div className={style.profile_header}>
        <h1 className={style.myprofile}>Hồ sơ của tôi</h1>
        <div className={style.title_profile}>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      <form className={style.box_form}>
        <div className={style.form_infor}>
          <div className={style.form_input}>
            <div className={style.form_email}>Email:</div>
            <div className={style.box_form_email}>
              <div className={style.name_email}>baotuyet@gmail.com</div>
            </div>
            <div className={style.input_change_infor}>
              <div>Tên</div>
              <div>
                <input type="text" />
              </div>
            </div>
            <div className={style.input_change_infor}>
              <div>Số điện thoại</div>
              <div>
                <input type="text" />
              </div>
            </div>
            <div className={style.input_change_infor}>
              <div>Địa chỉ</div>
              <div>
                <input type="text" />
              </div>
            </div>
            <div className={style.input_change_infor}>
              <div>Ngày sinh</div>
              <div>
                <div>
                  <select name="" id="">
                    <option value="">Ngày</option>
                  </select>
                  <select name="" id="">
                    <option value="">Tháng</option>
                  </select>
                  <select name="" id="">
                    <option value="">Năm</option>
                  </select>
                </div>
              </div>
            </div>
            <div className={style.input_change_infor}>
              <div />
              <button>Lưu</button>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div className={style.box_profile_img}>
              <img src="https://cdn.sforum.vn/sforum/wp-content/uploads/2018/11/2-10.png" alt="" className={style.profile_img}/>
            </div>
            <input className='hidden' type="file" accept='.jpg, .jpeg,.png' />
            <button>Chọn ảnh</button>
            <div>
              <div>Dung lượng file tối đa 1MB</div>
              <div>Định dạng:.JPEG, .PNG</div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}