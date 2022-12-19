import DetailInfoProduct from "./DetailInfoProduct/DetailInfoProduct";
import SelectProduct from "./SelectProduct/SelectProduct";
import classNames from "classnames/bind";
import styles from "./DetailProduct.module.scss";

const cx = classNames.bind(styles);

function DetailProduct() {
    return (
        <div className={cx("detail-product-wrapper")}>
            <SelectProduct />
            <DetailInfoProduct />
        </div>
    );
}

export default DetailProduct;
