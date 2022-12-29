import axios from "axios";
import { useEffect, useState } from "react";
import GalleryCarousel from "../../homepage/components/GalleryCarousel/GalleryCarousel";

function SeenProduct() {
    return <GalleryCarousel title={'sản phẩm đã xem'} isSale={false} />
}

export default SeenProduct