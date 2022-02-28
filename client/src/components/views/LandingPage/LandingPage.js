import React, { useState, useEffect } from 'react'

// import { FaCode } from "react-icons/fa";
// 백앤드에 Axios를 이용해서 데이터베이스에 있는 정보를 가져와달라!!
import axios from "axios";
import { Icon, Col, Card, Row, Carousel } from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../Utils/ImageSlider';
import Checkbox from '../NavBar/Sections/CheckBox';
import { continents } from './Sections/Datas';

function LandingPage() {


    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState(0)

    useEffect(() => {
        // product에 있는 데이터중에 원하는 만큼만 가져오는 body소스
        //skip은 어디서부터 얼만큼을 가져올지 limit은 더보기 버튼을 눌렀을때 더 많은 데이터를 나타내는 소스입니다.
        let body = {
            skip: Skip,
            limit: Limit
        }
        getProducts(body)
    }, [])


    const getProducts = (body) => {
        //  produc의 모든 데이터를 가져오는 소스
        axios.post('/api/product/products', body)
            .then(response => {
                if (response.data.success) {
                    if (body.loadMore) {
                        setProducts([...Products, ...response.data.productInfo])
                    } else {
                        setProducts(response.data.productInfo)
                    }
                    setPostSize(response.data.postSize)
                } else {
                    alert("상품들을 가져오는데 실패했습니다")
                }
            });
    }




    //더보기버튼을 눌었을때 발생할 이벤트
    const LoadMoreHandler = () => {
        // skip에 대한 정의: 1. Skip(0)+ Limit(8) = 8 / 2. Skip(8)+ Limit(8) = 16 
        let skip = Skip + Limit
        let body = {
            skip: skip,
            limit: Limit,
            // 더보기 버튼을 눌렀을때 가는 정보에 대한 true
            loadMore: true
        }
        getProducts(body)
        setSkip(skip)
    }




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
                    description={`${product.price}원`}
                />
            </Card>
        </Col>
    })




    return (
        <div style={{ width: '75%', margin: '3rem auto', display: 'flex', flexDirection: 'column' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>Motor-Cycle <Icon type="gift" style={{ fontSize: '25px', color: '#08c' }} theme="outlined" /></h2>
            </div>

            {/* Filter */}

            {/* CheckBox */}
            {/* 리스트(프로퍼티)라는 이름으로 continents값을 checkbox에 내려준다 */}
            <Checkbox list={continents} />
            {/* Search */}
            {/* Card */}

            <Row gutter={[20, 20]}>
                {renderCards}
            </Row>
            <br />

            {/* post size가 limit(8)보다 크거나 같으면 더보기버튼을 보여준다 */}
            {PostSize >= Limit &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={LoadMoreHandler}>더보기</button>
                </div>
            }
        </div>
    )
}

export default LandingPage
