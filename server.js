const http = require('http')
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('./controllers/productController')

const server = http.createServer((req,res)=>{
    if(req.url === '/api/products' &&  req.method === "GET"){
        getProducts(req,res)
    }else if (req.url.match(/\/api\/products\/([0-9]+)/) &&  req.method === "GET"){
        const id = req.url.split('/')[3]
        getProductById(req,res,id)
    }else if(req.url === '/api/products' && req.method === 'POST'){
        createProduct(req,res)
    }else if (req.url.match(/\/api\/products\/([0-9]+)/) &&  req.method === "PUT"){
        const id = req.url.split('/')[3]
        updateProduct(req,res,id)
    }else if (req.url.match(/\/api\/products\/([0-9]+)/) &&  req.method === "DELETE"){
        const id = req.url.split('/')[3]
        deleteProduct(req,res,id)
    }else{
        res.writeHead(404, {'Content-Type' :'application/json'})
        res.end(JSON.stringify({message:'Route not found'}))
    }
})


const PORT = process.env.PORT || 2000
server.listen(PORT,()=> console.log(`listening on Port ${PORT}`) )

//
 // 1// res.statusCode = 200
      // res.setHeader("Content-Type", 'text/html')
      // res.write('<h1>hello world</h1>')
      // res.end()
      // ||
 // 2// res.writeHead(200, {'Content-Type':'application/json'}) 
    // res.end(JSON.stringify(products))
    //  if(req.url === '/api/products' &&  req.method === "GET"){