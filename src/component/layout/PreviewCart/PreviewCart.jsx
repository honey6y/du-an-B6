import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import styles from './PreviewCart.module.scss'

const cx = classNames.bind(styles);

async function PreviewCart() {
    const [total, setTotal] = useState(0)
    useEffect(() => {

    })
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                
            </div>
        </div>
    )
}

export default PreviewCart