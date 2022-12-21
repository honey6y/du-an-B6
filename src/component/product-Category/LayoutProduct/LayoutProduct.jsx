import { Link, createSearchParams, useNavigate } from "react-router-dom";
import style from "./LayoutProduct.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useQuery } from "@tanstack/react-query";
import { productApi } from "../../Others/QueryApi";
import useQueryParams from "../../Others/useQueryParams";
import ContainerPdCategory from "../containerProductCt/ContainerPdCategory";
import { useEffect, useState } from "react";
import { omitBy, isUndefined } from 'lodash'
import omit from 'lodash/omit'

export default function LayoutProduct() {
  const queryParmas = useQueryParams(); // dùng useSearchParmas
  const nav = useNavigate(); // dùng để chuyển đến những trang được lựa chọn
  const [listProduct, setListProduct] = useState(null); // đổ data tất cả
  const [sorted, setSorted] = useState(null) // đổ những data đã đượcc filter
  // params
  const queryConfig = omitBy({
    productName: queryParmas.productName,
    sort_by: queryParmas.sort_by,
    price: queryParmas.price,
  }, isUndefined);
  // active khoảng giá
  const isActiveSortBy = (sortbyValue) => {
    return queryConfig.productName === sortbyValue || queryConfig.price === sortbyValue
  }
  // ==== active tất cả
  const isActiveAll = (activeAll) => {
    return  (queryConfig.price === activeAll && queryConfig.sort_by === activeAll)
  }
  // gọi Api và thực hiện logic params
  useEffect(() => {
    productApi.getProductName(queryConfig)
    .then((res) => {
      setListProduct(res.data.products)
      const sortBy = JSON.parse(JSON.stringify(res.data.products))
      // sort theo giá cao - thấp
      if(queryConfig.sort_by === 'price-descending'){
        sortBy.sort((a,b) => b.price - a.price)
        setSorted([...sortBy])
      }else if (queryConfig.sort_by === 'price-ascending') {
        sortBy.sort((a,b) => a.price - b.price)
        setSorted([...sortBy])
      }
      // sort theo khoảng giá
      //=================================================
      const BoxSort = []
      if(queryConfig.price === '0-5tr') {
        for(let i=0; i < sortBy.length; i++){
          if(sortBy[i].price <= 5000000){
            BoxSort.push(sortBy[i])
          }
        }
        setSorted(BoxSort)
      }
      if(queryConfig.price === '5-10tr') {
        for(let i=0; i < sortBy.length; i++){
          if(sortBy[i].price >= 5000000 && sortBy[i].price <= 10000000){
            BoxSort.push(sortBy[i])
          }
        }
        setSorted(BoxSort)
      }
      if(queryConfig.price === '10-20tr') {
        for(let i=0; i < sortBy.length; i++){
          if(sortBy[i].price >= 10000000 && sortBy[i].price <= 20000000){
            BoxSort.push(sortBy[i])
          }
        }
        setSorted(BoxSort)
      }
      if(queryConfig.price === '20-40tr') {
        for(let i=0; i < sortBy.length; i++){
          if(sortBy[i].price >= 20000000 && sortBy[i].price <= 40000000){
            BoxSort.push(sortBy[i])
          }
        }
        setSorted(BoxSort)
      }
      if(queryConfig.price === '40tr-trở-lên') {
        for(let i=0; i < sortBy.length; i++){
          if(sortBy[i].price >= 40000000){
            BoxSort.push(sortBy[i])
          }
        }
        setSorted(BoxSort)
      }
    })
    //===============================
    .catch((err) => {
      console.log(err);
    })
  } , [ queryConfig.productName, queryConfig.sort_by, queryConfig.price]);
  // sort theo khoảng giá
  const handlePriceOrder = (orderValue) => {
    nav({
      pathname: '',
      search: createSearchParams({
        ...queryConfig,
        sort_by: orderValue
      }).toString()
    })
  }
  // chọn các khoảng giá
  const filterList = (priceRange) => {
    nav({
      pathname: '',
      search: createSearchParams({
        ...queryConfig,
        price: priceRange
      }).toString()
    })
  }
  // trở về tất cả các khoảng giá
  const handleBack = () => {
    nav({
      pathname: '',
      search: createSearchParams(
        omit(
        {
          ...queryConfig
        },
        ['sort_by', 'price']
      )).toString()
    })
  }
  // gọi API category
  const { data: filterProductCategory } = useQuery({
    queryKey: ["/category/get-all-categories"],
    queryFn: () => {
      return productApi.getCategory();
    }
  });
  return (
    <div className={style.layout_container}>
      <div className={style.layout_box}>
        <div className={style.layout_header}>
          <div className={style.layout_header_title}>
            <Link to="/" className={style.change_home}>
              Trang chủ
            </Link>
            <span className={style.layout_seperate}>/</span>
            <span className={style.layout_nameLogin}>
              {queryConfig.productName}
            </span>
          </div>
        </div>
        <div className={style.layout_body}>
          <div className={style.layout_filter}>
            <div className={style.price_product}>
              <div className={style.filter_price_name}>Khoảng Giá</div>
              <div className={style.price_filter_check}>
                <div className={style.check_price_child}>
                  <button onClick={handleBack} className={isActiveAll(queryConfig.sort_by || queryConfig.price) ? (style.change_range) : (style.range)}>
                    Tất cả
                  </button>
                </div>
                <div className={style.check_price_child}>
                  <button onClick={() => filterList('0-5tr')} className={isActiveSortBy('0-5tr') ? (style.change_range) : (style.range)}>
                    Nhỏ hơn 5,000,000
                  </button>
                </div>
                <div className={style.check_price_child}>
                  <button onClick={() => filterList('5-10tr')} className={isActiveSortBy('5-10tr') ? (style.change_range) : (style.range)}>
                    Từ 5,000,000 - 10,000,000
                  </button>
                </div>
                <div className={style.check_price_child}>
                  <button onClick={() => filterList('10-20tr')} className={isActiveSortBy('10-20tr') ? (style.change_range) : (style.range)}>
                    Từ 10,000,000 - 20,000,000
                  </button>
                </div>
                <div className={style.check_price_child}>
                  <button onClick={() => filterList('20-40tr')} className={isActiveSortBy('20-40tr') ? (style.change_range) : (style.range)}>
                    Từ 20,000,000 - 40,000,000
                  </button>
                </div>
                <div className={style.check_price_child}>
                  <button onClick={() => filterList('40tr-trở-lên')} className={isActiveSortBy('40tr-trở-lên') ? (style.change_range) : (style.range)}>
                    Từ 40,000,000
                  </button>
                </div>
              </div>
            </div>
            <div className={style.filter_box_product_others}>
              <div className={style.filter_product_trademark}>Thương hiệu</div>
              <div className={style.trademark_check}>
                <Link
                  to={{
                    pathname: "",
                    search: createSearchParams({
                      ...queryConfig,
                      productName: "iphone",
                    }).toString(),
                  }}
                  tabIndex="1"
                  className={style.check_price_child}>
                  <span className={isActiveSortBy('iphone') ? (style.price_change_range) : (style.price_range)}>APPLE</span>
                </Link>
                <Link
                  to={{
                    pathname: "",
                    search: createSearchParams({
                      ...queryConfig,
                      productName: "xiaomi",
                    }).toString(),
                  }}
                  className={style.check_price_child}>
                  <span className={isActiveSortBy('xiaomi') ? (style.price_change_range) : (style.price_range)}>XIAOMI</span>
                </Link>
                <Link
                  to={{
                    pathname: "",
                    search: createSearchParams({
                      ...queryConfig,
                      productName: "samsung",
                    }).toString(),
                  }}
                  className={style.check_price_child}>
                  <span className={isActiveSortBy('samsung') ? (style.price_change_range) : (style.price_range)}>SAMSUNG</span>
                </Link>
                <Link
                  to={{
                    pathname: "",
                    search: createSearchParams({
                      ...queryConfig,
                      productName: "akko",
                    }).toString(),
                  }}
                  className={style.check_price_child}>
                  <span className={isActiveSortBy('akko') ? (style.price_change_range) : (style.price_range)}>AKKO</span>
                </Link>
                <Link
                  to={{
                    pathname: "",
                    search: createSearchParams({
                      ...queryConfig,
                      productName: "asus",
                    }).toString(),
                  }}
                  className={style.check_price_child}>
                  <span className={isActiveSortBy('asus') ? (style.price_change_range) : (style.price_range)}>ASUS</span>
                </Link>
                <Link
                  to={{
                    pathname: "",
                    search: createSearchParams({
                      ...queryConfig,
                      productName: "dell",
                    }).toString(),
                  }} index
                  className={style.check_price_child}>
                  <span className={isActiveSortBy('dell') ? (style.price_change_range) : (style.price_range)}>DELL</span>
                </Link>
                <Link
                  to={{
                    pathname: "",
                    search: createSearchParams({
                      ...queryConfig,
                      productName: "e-dra",
                    }).toString(),
                  }}
                  className={style.check_price_child}>
                  <span className={isActiveSortBy('e-dra') ? (style.price_change_range) : (style.price_range)}>E-DRA</span>
                </Link>
                <Link
                  to={{
                    pathname: "",
                    search: createSearchParams({
                      ...queryConfig,
                      productName: "ergonomic",
                    }).toString(),
                  }}
                  className={style.check_price_child}>
                  <span className={isActiveSortBy('ergonomic') ? (style.price_change_range) : (style.price_range)}>CÔNG THÁI HỌC</span>
                </Link>
              </div>
            </div>
            <div className={style.filter_box_product_others}>
              <div className={style.filter_product_others}>Sản phẩm khác</div>
              <div className={style.others_check}>
                {filterProductCategory &&
                  filterProductCategory.data.categories.map((item, index) => {
                    return (
                      <div className={style.check_price_child} key={item._id}>
                        <input
                          className={style.check_product_price}
                          type="radio"
                          name="trademark"
                        />
                        <Link
                          to={{
                            pathname: '',
                            search: createSearchParams({
                              ...queryConfig,
                              category: item._id
                            }).toString()
                          }}
                          className={style.price_range}>
                          {item.categoryName}
                        </Link>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className={style.layout_product}>
            <div className={style.layout_product_header}>
              <div className={style.layout_product_name}>
                {queryConfig.productName}
              </div>
              <div className={style.product_sort}>
                <span className={style.sort_title}>Sắp xếp:</span>
                <div>
                  <select className={style.sort_select} onChange={event => handlePriceOrder(event.target.value)}>
                    <option
                      className={style.sort_select_option} disabled={queryConfig.sort_by}>
                      Lựa chọn
                    </option>
                    <option
                      className={style.sort_select_option}
                      value="price-ascending">
                      Giá từ thấp tới cao
                    </option>
                    <option
                      className={style.sort_select_option}
                      value="price-descending">
                      Giá cao thấp tới thấp
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div>
              <ContainerPdCategory data={ (queryConfig.price || queryConfig.sort_by ) === undefined ? listProduct : sorted} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
