import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { registerAccount } from "../../Others/QueryApi"
import { rules } from "../../Others/Rules"
import { isAxiosUnprocessableEntityError } from "../../Others/StatusApi"
import style from "./Register.module.css"


function Register () {
    const { register, handleSubmit, setError, watch, formState: { errors }} = useForm()
    const registerAccountMutation = useMutation({
        mutationFn: body =>  registerAccount(body)
    })
    const onSubmit = handleSubmit ((data) => {
        registerAccountMutation.mutate(data,{
            onSuccess: (data) => {
                console.log(data);
                toast.success('Đăng kí thành công')
            },
            onError: (error) => {
                if(isAxiosUnprocessableEntityError(error)){
                    const formError = error.response?.data.message
                    if(formError) {
                      setError('email', {
                        message: formError,
                        type: 'Sever'
                      })
                    }  
                }
            }
        })
    })
    return (
        <div className={style.login_bg}>
            <div className={style.login_container}>
                <div className={style.login_header_title}>
                    <Link to="/" className={style.change_home}>Trang chủ</Link>
                    <span className={style.seperate}>/</span>
                    <span className={style.nameLogin}>Tạo tài khoản</span>
                </div>
                <div className={style.login_body_container}>
                    <div className={style.login_body}>
                        <form onSubmit={onSubmit} className={style.login_form} noValidate>
                            <div className={style.login_title}>Tạo tài khoản</div>
                            <div className={style.seperate_line}/>
                            {(errors.email?.message) || (errors.password?.message) ? (
                                <div className={style.login_error}>😟 Vui lòng kiểm tra lại dữ liệu!</div>
                            ): ''}
                            <div className={style.input_container}>
                                <input type="text" name="name"  placeholder="Tên" className={style.input}
                                    {...register("name", rules.name)}
                                    autoComplete='on'
                                />
                                <div className={style.infor_error}>{errors.name?.message}</div>
                            </div>
                            <div className={style.input_container}>
                                <input type="text" name="lastname"  placeholder="Họ" className={style.input}
                                    {...register("lastname", rules.lastname)}
                                    autoComplete='on'
                                />
                                <div className={style.infor_error}>{errors.lastname?.message}</div>
                            </div>
                            <div className={style.input_container}>
                                <input type="email" placeholder="Email" className={style.input}
                                    {...register("email", rules.email)}
                                    autoComplete='on'
                                />
                                <div className={style.infor_error}>{errors.email?.message}</div>
                            </div>
                            <div className={style.input_container}>
                                <input type="password" name="password" placeholder="Password" className={style.input}
                                    {...register("password", rules.password)}
                                    autoComplete='on'
                                />
                                <div className={style.infor_error}>{errors.password?.message}</div>
                            </div >
                            <div className={style.input_container_botton}>
                                <button type ="submit" className={style.button_login}>Đăng Ký</button>
                            </div>
                            <div className={style.button_others_container}>
                                <p>
                                    <Link to='/' className={style.button_others}>Trở về</Link>
                                </p>
                                <p>
                                    <Link to='/login' className={style.button_others}>Bạn đã có tài khoản?</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register