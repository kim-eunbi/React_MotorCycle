import React, { useState, useEffect } from 'react'

// import { FaCode } from "react-icons/fa";
// 백앤드에 Axios를 이용해서 데이터베이스에 있는 정보를 가져와달라!!
import axios from "axios";
import { Icon, Col, Card, Row, Carousel } from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../Utils/ImageSlider'

function LandingPage() {


    const [Products, setProducts] = useState([])


    useEffect(() => {
        axios.post('/api/product/products',)
            .then(response => {
                if (response.data.success) {
                    setProducts(response.data.productInfo)
                } else {
                    alert("상품들을 가져오는데 실패했습니다")
                }
            });
    }, [])

    // 업로드한 이미지를 메인페이지 카드에 전송
    const renderCards = Products.map((product, index) => {
        // 가장큰화면에서는 카드 넓이가 하나에 6, 중간은 8, 제일작은것은 24를 다 차지하게끔 한다
        return <Col lg={6} md={8} xs={24}>

            <Card
                cover={<ImageSlider images={product.images} />}
            >
                <Meta
                    key={index}
                    title={product.title}
                    description={`$${product.price}`}
                />
            </Card>
        </Col>
    })




    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>Motor-Cycle <Icon type="gift" style={{ fontSize: '16px', color: '#08c' }} theme="outlined" /></h2>
            </div>

            {/* Filter */}
            {/* Search */}
            {/* Card */}

            <Row gutter={[16, 16]}>
                {renderCards}
            </Row>


            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button>더보기</button>
            </div>
        </div>
    )
}

export default LandingPage
