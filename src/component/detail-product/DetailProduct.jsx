
import DetailInfoProduct from "./DetailInfoProduct/DetailInfoProduct";
import SelectProduct from "./SelectProduct/SelectProduct";
import classNames from "classnames/bind";
import styles from "./DetailProduct.module.scss";
import SeenProduct from "./SeenProduct/SeenProduct";

const cx = classNames.bind(styles);

function DetailProduct() {
    return (
        <div className={cx("detail-product-wrapper")}>
            {/* <DetailProductHeader></DetailProductHeader> */}
            <SelectProduct />
            <DetailInfoProduct />
            <SeenProduct />
        </div>
    );
}

export default DetailProduct;
