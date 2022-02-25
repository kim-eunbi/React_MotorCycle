import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { Icon } from 'antd'
import axios from 'axios'




function FileUpload(props) {

    const [Images, setImages] = useState([])

    const dropHandler = (files) => {

        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", files[0]);

        axios.post('/api/product/image', formData, config)
            .then(response => {
                if (response.data.success) {
                    setImages([...Images, response.data.filePath])
                    props.refreshFunction([...Images, response.data.filePath])


                } else {
                    alert('파일을 불러오는데 실패 하였습니다')
                }
            })
    }

    // 등록한 이미지 한개씩 삭제하는 기능
    const deleteHandler = (image) => {

        const currentIndex = Images.indexOf(image);
        let newImages = [...Images]
        newImages.splice(currentIndex, 1)
        setImages(newImages)
        props.refreshFunction(newImages)


    }


    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
            <Dropzone onDrop={dropHandler}>
                {({ getRootProps, getInputProps }) => (
                    <div
                        style={{ width: 100, height: 30, border: '1px solid gray', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                        {...getRootProps()}>
                        <input {...getInputProps()} />
                        <h3 style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}><Icon type="plus" style={{ fontSize: '0.9rem', marginTop: '3px' }} />사진첨부</h3>
                    </div>
                )}
            </Dropzone>

            <div style={{ display: 'flex', width: '100%', height: '300px', overflowX: 'scroll', border: '1px solid #d9d9d9' }}>
                {Images.map((image, index) => (
                    <div onClick={() => deleteHandler(image)} key={index}>
                        <img style={{ minWidth: '150px', width: '150px', height: 'auto' }}
                            src={`http://localhost:5000/${image}`}
                        />
                    </div>
                ))}

            </div>
        </div>
    )
}

export default FileUpload
