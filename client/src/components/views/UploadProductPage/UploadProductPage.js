import React, { useState } from 'react'
import { Typography, Button, Form, Input } from 'antd';
import FileUpload from '../../Utils/FileUpload';
import Axios from 'axios';


const { TextArea } = Input;

// select 

const Continents = [
    { key: 1, value: "야마하" },
    { key: 2, value: "혼다" },
    { key: 3, value: "가와사키" },
    { key: 4, value: "스즈키" },
    { key: 5, value: "할리데이비슨" },
    { key: 6, value: "트라이엄스" },
    { key: 7, value: "인디안" },
    { key: 8, value: "KTM" },
    { key: 9, value: "두카티" },
    { key: 9, value: "캔암" },
    { key: 10, value: "BMW" },
    { key: 11, value: "베넬리" },
    { key: 12, value: "아프릴리아" },
    { key: 13, value: "모토 구찌" },

]


function UploadProductPage(props) {
    // 입력할때마다 값이 바뀌어야 하기 떄문에 상태를 만들고, onChange라는 이벤트를 사용해 준다 

    // 상품이름과 가격 설명의 상태생성
    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Price, setPrice] = useState(0)
    const [Continent, setContinent] = useState(1)
    const [Images, setImages] = useState([])

    // 이름을 입력할때 바뀌게 하는 이벤트 작성
    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value)
    }
    const descriptionChangeHandler = (event) => {
        setDescription(event.currentTarget.value)
    }
    const priceChangeHandler = (event) => {
        setPrice(event.currentTarget.value)
    }
    const continentChangeHandler = (event) => {
        setContinent(event.currentTarget.value)
    }

    // FileUpload에서 이미지 받아옴
    const updateImages = (newImages) => {
        setImages(newImages)
    }

    const submitHandler = (event) => {
        // 확인버튼을 눌렀을때 자동으로 리프레시 되지 않기위해 preventDefault();를 쓴다
        event.preventDefault();

        if (!Title || !Description || !Price || !Continent || !Images) {
            return alert("모든 값을 넣어 진행해 주세요")
        }


        // 서버에 채운 값들을 request로 보내준다
        const body = {
            // 로그인한 아이디를 가져온다
            writer: props.user.userData._id,

            title: Title,

            description: Description,

            price: Price,

            images: Images,

            continents: Continents,

        }
        // 모든 정보들을 body로 해서 백앤드로 보내준다
        Axios.post("/api/product", body)
            // 모든 결과 값을 response에 넣어준다
            .then(response => {
                if (response.data.success) {
                    alert('상품 업로드에 성공 했습니다')
                    // 상품 업로드하고 나서 이동하고 싶은 경로입력
                    props.history.push('/')
                } else {
                    alert('상품 업로드에 실패 했습니다')
                }
            })
    }


    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontWeight: 'bold' }}>판매할 상품 업로드</h1>
            </div>
            <Form onSubmit={submitHandler}>
                {/* DropZone */}
                {/* 파일 데이터를 uploatFile 컴포넌트에서 부모 컴포넌트로 업데이트하기 */}
                <FileUpload refreshFunction={updateImages} />
                <br />
                <br />
                <label>상품이름</label>
                <Input onChange={titleChangeHandler} value={Title} />
                <br />
                <br />
                <label>상품설명</label>
                <TextArea style={{ resize: 'none', height: '300px' }} onChange={descriptionChangeHandler} value={Description} />
                <br />
                <br />
                <label>상품가격</label>
                <Input type="number" onChange={priceChangeHandler} value={Price} />
                <br />
                <br />
                <label>상품브랜드</label>
                <br />
                <select style={{ border: '1px solid #d9d9d9' }} onChange={continentChangeHandler} value={Continent}>
                    {Continents.map(item => (
                        <option key={item.key} value={item.key}>{item.value}</option>
                    ))}
                </select>
                <br />
                <br />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button type='submit'>상품올리기</button>
                </div>
            </Form>
        </div>
    )
}

export default UploadProductPage
