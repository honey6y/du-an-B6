import { Link } from "react-router-dom"
import style from "./Login.module.css"

function Login () {
    return (
        <div className={style.login_bg}>
            <div className={style.login_container}>
                <div className={style.login_header}>
                    <Link to="/">Trang chủ</Link>
                    <span className={style.seperate}>/</span>
                    <span className={style.nameLogin}>Tài khoản</span>
                </div>
                <div className={style.login_body_container}>
                    <div className={style.login_body}>
                        <form className={style.login_form}>
                            <div className={style.login_title}>Đăng Nhập</div>
                            <div className={style.seperate_line}/>
                            <div>
                                <input type="text"  placeholder="Email"/>
                                <div className={style.email_error}></div>
                            </div>
                            <div>
                                <input type="password" />
                                <div className={style.passwordl_error}></div>
                            </div>
                            <div>
                            <button className={style.button_login}>Đăng nhập</button>
                            </div>
                            <p>
                                <Link to='/'>Trở về</Link>
                            </p>
                            <p>
                                <Link to='/'>Đăng kí</Link>
                            </p>
                            <p>
                                <Link to='/'>Quên Mật Khẩu</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Login
