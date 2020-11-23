// install libraries
const express = require('express')
const cors = require('cors')

const cart = [
    { id: 'a101', item: 'apple', quantity: 10},
    { id: 'a102', item: 'orange', quantity: 10},
    { id: 'a103', item: 'pear', quantity: 10},
    { id: 'a104', item: 'grapes', quantity: 5},
]

// config environment variable
const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000

// create instance of express
const app = express()

// add CORS to resolve cross origin issue
app.use(cors())
app.use(express.json())

// create resources

// GET /cart:id
app.get('/cart/:id', (req, resp) => {
    // let i = req.params.id
    const id = req.params['id']
    // let pos = cart.map(a => a.id).indexOf(i)
    const item = cart.find(a => a.id == id)

    resp.type('application/json')
    if (undefined == item) {
        resp.status(404)
        resp.json({})
        return
    }
    // console.log(pos)
    resp.status(200)
    // resp.json(cart[pos])
    resp.json(item)
})

// GET /cart
app.get('/cart', (req, resp) => {
    resp.status(200)
    // resp.setHeader('Access-Control-Allow-Origin', '*')
    resp.type('application/json')
    resp.json(cart)
})

// PUT /cart/:id
app.put('/cart/:id', (req, resp) => {
    const id = req.params['id']
    const payload = req.body
    console.info('>>> payload  ', payload)

    //upsert - update or insert
    const idx = cart.findIndex(i => i.id == payload.id)
    if (idx < 0)
        cart.push(payload)  // insert if cannot find
    else
        cart[idx] = payload  // update

    resp.status(200)
    resp.type('application/json')
    resp.json({})
})

// PUT /cart/add/:id
app.put('/cart/add/:id', (req, resp) => {
    const id = req.params['id']
    const payload = req.body
    console.info('add >>> payload  ', payload)

    cart.push(payload)
    resp.status(200)
    resp.type('application/json')
    resp.json({})
})

// DELETE /cart/:id
app.delete('/cart/:id', (req, resp) => {
    const id = req.params['id']
    console.info(id)

    const idx = cart.findIndex(i => i.id == id)
    if (idx < 0)
        resp.error(404)
    else {
        cart.splice(idx, 1)
        resp.status(200)
    }
    resp.type('application/json')
    resp.json({})    
})

// start the app
app.listen(PORT, () => {
    console.info(`Application started on port ${PORT} AT ${new Date()}`)
})