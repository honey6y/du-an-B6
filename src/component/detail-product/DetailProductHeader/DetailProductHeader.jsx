import { Link } from "react-router-dom"

function DetailProductHeader({category, nameProduct}) {
    return (
        <div>
            <div>
                <Link to={'/'}>Trang chủ</Link>
                {category ? <span>/<Link to={`/category?productName=${category}`}>{category}</Link></span> : null}
                <span>/</span>
                {nameProduct}
            </div>
        </div>
    )
}

export default DetailProductHeader