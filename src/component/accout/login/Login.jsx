import { useMutation } from "@tanstack/react-query"
import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { AppContext} from "../../../privateRouter/PrivateRouter"
import { login } from "../../Others/QueryApi"
import { rules } from "../../Others/Rules"
import { isAxiosUnprocessableEntityError } from "../../Others/StatusApi"
import style from "./Login.module.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';

function Login () {
    const [spamSubmit, setSpamSubmit] = useState(false)
    const {setCheckPrivate} = useContext(AppContext)
    const nav = useNavigate()
    const { register, handleSubmit, setError, formState: { errors }} = useForm()
    const loginAccountMutation = useMutation({
        mutationFn: body =>  login(body)
    })
    const onSubmit = handleSubmit ((data) => {
        setSpamSubmit(true)
        loginAccountMutation.mutate(data,{
            onSuccess: (data) => {
                setCheckPrivate(true)
                toast.success('Đăng nhập thành công')
                setTimeout(() => {
                    nav('/')
                }, 1400)
            },
            onError: (error) => {
                if(isAxiosUnprocessableEntityError(error)){
                    const formError = error.response?.data.message
                    // không tìm thấy email,  tức là email ko đúng
                    if(formError.toString().indexOf('wrong email')) {
                      setError('password', {
                        message: 'Password không đúng',
                        type: 'Sever'
                      })
                      setSpamSubmit(false)
                    } else (
                        setError('email', {
                            message: 'Email chưa được đăng ký',
                            type: 'Sever'
                        })
                    )
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
                    <span className={style.nameLogin}>Đăng nhập</span>
                </div>
                <div className={style.login_body_container}>
                    <div className={style.login_body}>
                        <form className={style.login_form} onSubmit={onSubmit} noValidate>
                            <div className={style.login_title}>Đăng Nhập</div>
                            <div className={style.seperate_line}/>
                            {(errors.email?.message) || (errors.password?.message) ? (
                                <div className={style.login_error}>😟 Vui lòng kiểm tra lại dữ liệu!</div>
                            ): ''}
                            <div className={style.input_container}>
                                <input type="email"  placeholder="Email" className={style.input} 
                                    {...register("email", rules.email)}
                                />
                                <div className={style.infor_error}>{errors.email?.message}</div>
                            </div>
                            <div className={style.input_container}>
                                <input type="password" placeholder="Password" className={style.input} 
                                    {...register("password", rules.password)}
                                />
                                <div className={style.infor_error}>{errors.password?.message}</div>
                            </div >
                            <div className={style.input_container}>
                                <button type="submit" className={style.button_login} disabled={spamSubmit}>
                                    <Spinner className={spamSubmit ? style.spinner_block : style.spinner_none} animation="border" />
                                    <span className={style.button_name}>Đăng nhập</span>
                                </button>
                            </div>
                            <div className={style.button_others_container}>
                                <p>
                                    <Link to='/' className={style.button_others}>Trở về</Link>
                                </p>
                                <p>
                                    <Link to='/register' className={style.button_others}>Đăng ký</Link>
                                </p>
                                <p>
                                    <Link to='/identify' className={style.button_others}>Quên mật khẩu?</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>      
    )
}
export default Login
