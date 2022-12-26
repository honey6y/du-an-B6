import axios from "axios";
import { useEffect, useState } from "react";
import GalleryCarousel from "../../homepage/components/GalleryCarousel/GalleryCarousel";

function SeenProduct() {

    let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOWMyMGUwNWZlNjMyMDQ1ODQ3M2NmNiIsImF2YXRhciI6Imh0dHBzOi8vc3QzLmRlcG9zaXRwaG90b3MuY29tLzE3Njc2ODcvMTY2MDcvdi80NTAvZGVwb3NpdHBob3Rvc18xNjYwNzQ0MjItc3RvY2staWxsdXN0cmF0aW9uLWRlZmF1bHQtYXZhdGFyLXByb2ZpbGUtaWNvbi1ncmV5LmpwZyIsInVzZXJuYW1lIjoidGVzdDEyMzEyMyIsImVtYWlsIjoiZGVtby1hbkBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImNhcnQiOnsiX2lkIjoiNjM5YzIwZTE1ZmU2MzIwNDU4NDczY2Y4IiwidXNlcklkIjoiNjM5YzIwZTA1ZmU2MzIwNDU4NDczY2Y2IiwibGlzdFByb2R1Y3QiOlt7InByb2R1Y3REZXRhaWxJZCI6IjYyZWNjYTczMmQ2OGQxYTYwZDM0MTZlMSIsInF1YW50aXR5Ijo1LCJzZWxlY3RlZCI6ZmFsc2UsIl9pZCI6IjYzOWMyZmMxNDZjYTIyZWM4NGM2NDkzMCJ9LHsicHJvZHVjdERldGFpbElkIjoiNjMyYzA0MDkxMjYyYjhjZDlkMTc0OGQ1IiwicXVhbnRpdHkiOjYsInNlbGVjdGVkIjpmYWxzZSwiX2lkIjoiNjNhMDRiNjM2ZDhiNTJmMGNlNDI5MmVlIn1dLCJwcm9kdWN0IjpbXSwiY3JlYXRlZEF0IjoiMjAyMi0xMi0xNlQwNzo0MDoxNy4wNDBaIiwidXBkYXRlZEF0IjoiMjAyMi0xMi0yMFQwOTowMjo1Ni4zOTRaIiwiX192IjowfSwiZnVsbG5hbWUiOiJ0ZXN0MTIzIiwiZGF0ZU9mQmlydGgiOiIyMDAwLTEwLTIwVDAwOjAwOjAwLjAwMFoiLCJzZXgiOiJtYWxlIiwibmF0aW9uYWxpdHkiOiJWaWV0IE5hbSIsImlhdCI6MTY3MTUyNzEzOSwiZXhwIjoxNjcxNjEzNTM5fQ.fAt_2iI_0pMTWVTkAq08NFc6U1QR4E-mCUIYTkgA7KM`;
    const [seenProduct, setSeenProduct] = useState([])
    useEffect(() => {
        axios({
            url: `${process.env.REACT_APP_PORT_API}product/find-product-by-name?productName=iphone`,
            method: "GET",
            headers: {
                authorization: token,
            },
        })
        .then(res => {
            console.log(res)
            setSeenProduct(res.data.product)
        })
    },[])
    return <GalleryCarousel dataProps={seenProduct} title={'sản phẩm đã xem'} isSale={false} />
}

export default SeenProduct