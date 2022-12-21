function DetailProductHeader({category, nameProduct}) {
    return (
        <div>
            <div>
                Trang chủ
                <span>/</span>
                {category}
                <span>/</span>
                {nameProduct}
            </div>
        </div>
    )
}

export default DetailProductHeader