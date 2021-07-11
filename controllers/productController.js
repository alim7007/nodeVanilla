const Product = require('../models/productModel')
const {getPostData} = require('../utils')

// @desc Get All Products
// @route GET /api/products
async function getProducts(req,res,id){
    try{
        const products = await Product.findAll()
        res.writeHead(200, {'Content-Type':'application/json'})
        res.end(JSON.stringify(products))
    }catch(err){
        console.log(err)
    }
}
// @desc Get Single Product
// @route GET /api/products/:id
async function getProductById(req,res,id){
    try{
        const product = await Product.findById(id)
        if(!product){
            res.writeHead(404, {'Content-Type':'application/json'})
            res.end(JSON.stringify({message:'bad request'}))
        }else{
            res.writeHead(200, {'Content-Type':'application/json'})
            res.end(JSON.stringify(product))
        }
    }catch(err){
        console.log(err)
    }
}

// @desc create a Product
// @route POST /api/products
async function createProduct(req,res){
    try{
        const body = await getPostData(req)
        const {title, description, price} = JSON.parse(body)
        const product = {
           title,
           description,
           price
        }
        const newProduct = await Product.create(product)
        res.writeHead(201, {'Content-Type':'application/json'})
        res.end(JSON.stringify(newProduct))
    }catch(err){
        console.log(err)
    }
}

// @desc Update Single Product
// @route PUT /api/products/:id
async function updateProduct(req,res,id){
    try{
        const product = await Product.findById(id)
        if(!product){
            res.writeHead(404, {'Content-Type':'application/json'})
            res.end(JSON.stringify({message:'bad request'}))
        }else{
            const body = await getPostData(req)
            const {title, description, price} = JSON.parse(body)
            const productData = {
                title: title || product.title,
                description: description || product.description,
                price: price || product.price
            }
            const updProduct = await Product.update(id, productData)
            res.writeHead(200, {'Content-Type':'application/json'})
            return res.end(JSON.stringify(updProduct))
        }
    }catch(err){
        console.log(err)
    }
}

// @desc Delete Single Product
// @route DELETE /api/products/:id
async function deleteProduct(req,res,id){
    try{
        const product = await Product.findById(id)
        if(!product){
            res.writeHead(404, {'Content-Type':'application/json'})
            res.end(JSON.stringify({message:'bad request'}))
        }else{
            await Product.remove(id)
            res.writeHead(200, {'Content-Type':'application/json'})
            return res.end(JSON.stringify({message:`Product ${id} was removed`}))
        }
    }catch(err){
        console.log(err)
    }
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}

