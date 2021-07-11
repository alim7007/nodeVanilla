let products = require('../data/products.json')
const {writeDataToFile} = require('../utils')
const {v4: uuidv4} = require('uuid')

// Find all
const findAll =()=>{
    return new Promise((resolve,reject)=>{
        resolve(products)
    })
}

// Find by id
const findById =(id)=>{
    return new Promise((resolve,reject)=>{
        const product = products.find((p)=> p.id === id)
        resolve(product)
    })
}

// create
const create =(product)=>{
    return new Promise((resolve, reject)=>{
        const newProduct = { id:uuidv4(), ...product}
        products.push(newProduct)
        writeDataToFile('./data/products.json',products)
        resolve(newProduct)
    })
}

// Update
const update =(id, product)=>{
    return new Promise((resolve,reject)=>{
        const index = products.findIndex((p)=> p.id === id)
        products[index] = {id, ...product}
        writeDataToFile('./data/products.json', products)
        resolve(products[index])
    })
}


// Delete
const remove =(id)=>{
    return new Promise((resolve,reject)=>{
        products = products.filter((p)=> p.id !== id)
        writeDataToFile('./data/products.json', products)
        // writeDataToFile('./server.js', '.')
        resolve()
    })
}


module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}



// const http = require('http')
// const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('./controllers/productController')

// const server = http.createServer((req,res)=>{
//     if(req.url === '/api/products' &&  req.method === "GET"){
//         getProducts(req,res)
//     }else if (req.url.match(/\/api\/products\/([0-9]+)/) &&  req.method === "GET"){
//         const id = req.url.split('/')[3]
//         getProductById(req,res,id)
//     }else if(req.url === '/api/products' && req.method === 'POST'){
//         createProduct(req,res)
//     }else if (req.url.match(/\/api\/products\/([0-9]+)/) &&  req.method === "PUT"){
//         const id = req.url.split('/')[3]
//         updateProduct(req,res,id)
//     }else if (req.url.match(/\/api\/products\/([0-9]+)/) &&  req.method === "DELETE"){
//         const id = req.url.split('/')[3]
//         deleteProduct(req,res,id)
//     }else{
//         res.writeHead(404, {'Content-Type' :'application/json'})
//         res.end(JSON.stringify({message:'Route not found'}))
//     }
// })


// const PORT = process.env.PORT || 2000
// server.listen(PORT,()=> console.log(`listening on Port ${PORT}`) )

// //
//  // 1// res.statusCode = 200
//       // res.setHeader("Content-Type", 'text/html')
//       // res.write('<h1>hello world</h1>')
//       // res.end()
//       // ||
//  // 2// res.writeHead(200, {'Content-Type':'application/json'}) 
//     // res.end(JSON.stringify(products))
//     //  if(req.url === '/api/products' &&  req.method === "GET"){
