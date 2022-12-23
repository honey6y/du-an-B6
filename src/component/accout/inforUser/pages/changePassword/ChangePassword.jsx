import { useMutation, useQuery } from '@tanstack/react-query'
import { omit } from 'lodash'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { userApi } from '../../../../Others/QueryApi'
import { rules } from '../../../../Others/Rules'
import { isAxiosUnprocessableEntityERR, isAxiosUnprocessableEntityError } from '../../../../Others/StatusApi'
import style from './ChangePassword.module.css'

export default function ChangePassword() {
  const {register,setValue, setError, reset, handleSubmit, formState: { errors}, getValues} = useForm({
    defaultValues: {
      oldPass: '',
      newPass: '',
      confirm_password: '',
      id: '',
    }
  })
  const {data: dataProfile } = useQuery({
    queryKey: ['/auth/me'],
    queryFn: userApi.getProfile
  })
  const profile = dataProfile?.data
  useEffect(() => {
    if(profile) {
      setValue('id', profile._id) //lấy id để cập nhật
    }
  },[profile, setValue])
  const updatePassword = useMutation(userApi.changePassword)
  const onSubmit = handleSubmit(async (data) => {
    try {
      await updatePassword.mutateAsync(omit(data, ['confirm_password']))
      toast.success('thay đổi mật khẩu thành công')
      reset()
    } catch (error) {
      if(isAxiosUnprocessableEntityError(error)){
        const formError = error.response?.data.message
        // không tìm thấy email,  tức là email ko đúng
        if(formError.toString().indexOf('wrong email')) {
          setError('oldPass', {
            message: 'Password không đúng',
            type: 'Sever'
          })
        } 
    }
    }
  })
  return (
    <div className={style.container_profile}>
      <div className={style.profile_header}>
        <h1 className={style.myprofile}>Hồ sơ của tôi</h1>
        <div className={style.title_profile}>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      <div className={style.form_container}>
        <form className={style.box_form} onSubmit={onSubmit} noValidate>
          <div className={style.form_infor}>
            <div className={style.form_input}>
              <div className={style.input_change_infor}>
                <div className={style.title_profile}>Mật khẩu cũ:</div>
                <div className={style.box_input}>
                  <input className={style.input_profile} type="text" name='oldPass' placeholder='Mật khẩu cũ' {...register("oldPass", rules.oldPass)}/>
                  <div className={style.error_profile}>{errors.oldPass?.message}</div>
                </div>
              </div>
              <div className={style.input_change_infor}>
                <div className={style.title_profile}>Mật khẩu mới:</div>
                <div className={style.box_input}>
                  <input className={style.input_profile} type="text" name='newPass' placeholder='Mật khẩu mới' {...register("newPass", rules.newPass)}/>
                  <div className={style.error_profile}>{errors.newPass?.message}</div>
                </div>
              </div>
              <div className={style.input_change_infor}>
                <div className={style.title_profile}>Xác nhận mật khẩu:</div>
                <div className={style.box_input}>
                  <input className={style.input_profile} type="text" name='confirm_password' placeholder='Xác nhận mật khẩu' 
                    {...register("confirm_password", {...rules.confirm_password, 
                        validate: (value) => (value === getValues('newPass')) || 'Password không khớp'
                      })
                    }
                  />
                  <div className={style.error_profile}>{errors.confirm_password?.message}</div>
                </div>
              </div>
              <div className={style.input_change_infor}>
                <div />
                <button className={style.save_profile} type='submit'>Xác nhận</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
