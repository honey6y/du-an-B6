
import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { getAvatarUrl, userApi } from '../../../../Others/QueryApi'
import { rules } from '../../../../Others/Rules'
import DateSelect from '../../componets/DateSelect/DateSelect'
import style from './Profile.module.css'



export default function Profile() {
  const fileInput = useRef(null)
  const [file, setFile] = useState()
  const previewImg = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])
  const {data: dataProfile, refetch } = useQuery({
    queryKey: ['/auth/me'],
    queryFn: userApi.getProfile
  })
  const profile = dataProfile?.data
  const {register, control, setValue, handleSubmit, formState: { errors}, watch} = useForm({
    defaultValues: {
      username: '',
      phone: '',
      avatar: '',
      dateOfBirth: new Date(1990, 0, 1),
      address: [],
      id: '',
    }
  })
  const avatar = watch('avatar')
  useEffect(() => {
    if(profile) {
      setValue('username', profile.username)
      setValue('phone', profile.phone)
      setValue('avatar', profile.avatar)
      setValue('address', profile.address[6])
      setValue('dateOfBirth', profile.dateOfBirth ? new Date(profile.dateOfBirth) : new Date(1990,0,1))
      setValue('id', profile._id) //lấy id để cập nhật
    }
  },[profile, setValue])
  const updateProfileMution = useMutation(userApi.updateProfile)
  const uploadAvatarMutaion = useMutation(userApi.upLoadAvatar)
  const onSubmit = handleSubmit(async (data) => {
    try {
      let avatarName = avatar
      if(file) {
        const form = new FormData()
        form.append('avatar',file)
        const uploadRes = await uploadAvatarMutaion.mutateAsync(form)
        avatarName = uploadRes.data.newUser.avatar
        setValue('avatar', avatarName)
      }
      const res = await updateProfileMution.mutateAsync({...data, dateOfBirth: data.dateOfBirth?.toISOString(), avatar: avatarName})
      refetch()
      toast.success('cập nhật thành công')
    } catch (error) {
      console.log(error);
    }
  })

  const maxSizeUploadImg = 5 * 1048576
  const onFileChange = (event) => {
    const fileFromLocal = event.target.files?.[0]
    console.log(fileFromLocal);
    if( fileFromLocal && (fileFromLocal?.size >= maxSizeUploadImg || !fileFromLocal.type.includes('image'))) {
      toast.warning(`Dung lượng file tối đa 5MB, Định dạng:.JPEG, .PNG`)
    }else {
      setFile(fileFromLocal)
    }
  }
  const handleUpload = () => {
    fileInput.current?.click()
  }

  return (
    <div className={style.container_profile}>
      <div className={style.profile_header}>
        <h1 className={style.myprofile}>Hồ sơ của tôi</h1>
        <div className={style.title_profile}>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      <form className={style.box_form} onSubmit={onSubmit} noValidate>
        <div className={style.form_infor}>
          <div className={style.form_input}>
            <div className={style.box_form_email}>
              <div className={style.form_email}>Email:</div>
              <div className={style.name_email}>{profile?.email}</div>
            </div>
            <div className={style.input_change_infor}>
              <div className={style.title_profile}>Tên:</div>
              <div className={style.box_input}>
                <input className={style.input_profile} type="text" name='username' {...register("username", rules.name)} />
                <div className={style.error_profile}>{errors.username?.message}</div>
              </div>
            </div>
            <div className={style.input_change_infor}>
              <div className={style.title_profile}>Số điện thoại:</div>
              <div className={style.box_input}>
                <input className={style.input_profile} type="number" name='phone' {...register("phone", rules.phone)}/>
                <div className={style.error_profile}>{errors.phone?.message}</div>
              </div>
            </div>
            <div className={style.input_change_infor}>
              <div className={style.title_profile}>Địa chỉ:</div>
              <div className={style.box_input}>
                <input className={style.input_profile} type="text" name='address' {...register("address", rules.address)}/>
                <div className={style.error_profile}>{errors.address?.message}</div>
              </div>
            </div>
            <Controller 
              control={control}
              name='dateOfBirth'
              render={({field}) => (
                <DateSelect errorMessage={errors.dateOfBirth?.message} onChange={field.onChange} value={field.value}/>
              )}
              >
            </Controller>
            <div className={style.input_change_infor}>
              <div />
              <button className={style.save_profile} type='submit'>Lưu</button>
            </div>
          </div>
        </div>
        <div className={style.file_container}>
          <div className={style.box_file}>
            <div className={style.box_profile_img}>
              <img src={previewImg || getAvatarUrl(avatar)} alt="" className={style.profile_img}/>
            </div>
            <input className={style.hiden} type="file" accept='.jpg, .jpeg,.png'ref={fileInput} onChange={onFileChange}
              onClick={(event) => {event.target.value = null}}
             />
            <button className={style.button_file}  type='button' onClick={handleUpload}>Chọn ảnh</button>
            <div>
              <div className={style.infor_img}>Dung lượng file tối đa 5MB</div>
              <div className={style.infor_img}>Định dạng:.JPEG, .PNG</div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}