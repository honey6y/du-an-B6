import Banner from "./components/Banner/Banner";
import ProductContent from "./components/ProductContent/ProductContent";
import {Skeleton} from 'antd'
import Slider from "./components/GalleryCarousel/GalleryCarousel";
import ModalPopUp from "./components/Modal/ModalPopUp";

function Home() {
  return (
    <>
      <div style={{ backgroundColor: "#fafafa" }}>
        <Banner />
        <ProductContent />
        <ModalPopUp />
      </div>
    </>
  );
}

export default Home;
