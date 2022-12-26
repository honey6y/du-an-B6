
import DetailInfoProduct from "./DetailInfoProduct/DetailInfoProduct";
import SelectProduct from "./SelectProduct/SelectProduct";
import SeenProduct from "./SeenProduct/SeenProduct";

function DetailProduct() {
    return (
        <div>
            {/* <DetailProductHeader></DetailProductHeader> */}
            <SelectProduct />
            <DetailInfoProduct />
            <SeenProduct />
        </div>
    );
}

export default DetailProduct;
