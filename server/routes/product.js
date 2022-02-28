const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product } = require('../models/Product')

//=================================
//             Product
//=================================

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
});

const upload = multer({ storage: storage }).single('file');


router.post('/image', (req, res) => {
    // 가져온 이미지를 저장해주면 됨
    upload(req, res, err => {
        if (err) {
            return req.json({ success: false, err });
        }
        return res.json({
            success: true,
            filePath: res.req.file.path,
            fileName: res.req.file.filename,
        })
    });
});


// filePath:res.req.file.path 어디에 파일이 저장되있는지 path(위치)를 가져올수있다.
// fileName: 저장된 파일의 이름을 가져올 수 있다.



router.post('/', (req, res) => {
    // 받아온 정보들을 DB에 넣어줄 수 있다

    const product = new Product(req.body)

    product.save((err) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true })
    })
});



router.post('/products', (req, res) => {
    // landingPage에 let body 안에 있는 skip limit의 정보를 받아온다
    // parseInt는 req.body.limit가 스트링인 경우에 넘버로 바꿔주는 역할을 합니다
    // 만약에 req.body.limit이 있다면 지정해준걸로 리밋을 하고 없다면 리밋을 100으로 보여준다
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = req.body.skip ? parseInt(req.body.limit) : 0;


    //product 콜렉션에 들어있는 모든 상품정보를 가져오자

    Product.find()
        .populate("writer")
        .skip(skip)
        .limit(limit)

        .exec((err, productInfo) => {
            if (err) return res.status(400).json({ success: false, err })
            return res.status(200).json({
                success: true, productInfo,

                postSize: productInfo.length
            })
        })
});



module.exports = router;
