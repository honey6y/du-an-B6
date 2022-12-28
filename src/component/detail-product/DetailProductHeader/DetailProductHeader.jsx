import { Link } from "react-router-dom"
import classNames from "classnames/bind";
import styles from "./DetailProductHeader.module.scss";

const cx = classNames.bind(styles);

function DetailProductHeader({category, nameProduct}) {
    return (
        <div>
            <div>
                <Link to={'/'} className={cx('link-route')}>Trang chủ</Link>
                {category ? <span>/<Link to={`/category?productName=${category}`} className={cx('link-route')}>{category}</Link></span> : null}
                <span>/</span>
                {nameProduct}
            </div>
        </div>
    )
}

export default DetailProductHeader