import {expect}from 'chai'
import supertest from 'supertest'

const request = supertest('http://localhost:8080')

const productMock = {
    title: 'Camisa celeste',
    description: 'Camisa celeste con botones negros',
    code: 'abcde12345',
    price: 2000,
    status: true,
    stock: 5,
    category: 'usado',
    image: 'url-inventado.com.ar',
    size: 'S',
}

const userMock = {
    first_name: 'User',
    last_name: 'Testing',
    email: 'usertesting@gmail.com',
    age: 30,
    password: '12345',
    role: 'user'
}

const userMock2 = {
    first_name: 'User2',
    last_name: 'Testing',
    email: 'user2testing@gmail.com',
    age: 30,
    password: '12345',
    role: 'user'
}

describe('Test de endpoints de products', ()=> {
    it('Prueba del metodo GET que trae todos los productos', async ()=> {
        const response = await request.get('/api/products')
        expect(response._body).to.have.property('status')
        expect(response._body).to.have.property('payload')
        expect(response._body.payload).to.be.an('array')
        expect(response._body.payload).to.not.have.lengthOf(0)
    })
    it('Prueba del metodo POST que agrega un producto a la base de datos', async()=> {
        const response = await request.post('/api/products').send(productMock)
        expect(response._body.product).to.have.property('_id')
    })
    it('Prueba del metodo GET para obtener un producto por ID', async ()=> {
        const createProduct = await request.post('/api/products').send(productMock)
        const pid = createProduct._body.product._id
        const response = await request.get(`/api/products/${pid}`)
        expect(response._body.product).to.have.property('_id')
    })
})

describe('Test de endpoints de carts', ()=> {
    it('Prueba del metodo POST para crear un carrito', async()=> {
        const response = await request.post('/api/carts')
        expect(response._body.cart).to.have.property('_id')
    })
    it('Prueba del metodo GET para obtener un carrito por ID', async()=> {
        const createCart = await request.post('/api/carts')
        const cid = createCart._body.cart._id
        const response = await request.get(`/api/carts/${cid}`)
        expect(response._body.cart[0]).to.have.property('_id')
    })
    it('Prueba del metodo POST para agregar producto al carrito', async()=> {
        const createCart = await request.post('/api/carts')
        const cid = createCart._body.cart._id
        const createProduct = await request.post('/api/products').send(productMock)
        const pid = createProduct._body.product._id
        const response = await request.post(`/api/carts/${cid}/product/${pid}`)
        expect(response._body.carrito).to.have.property('_id')
        expect(response._body.carrito.products).to.be.an('array')
        expect(response._body.carrito.products).to.not.have.lengthOf(0)
    })
})

describe('Test de endpoints de sessions', ()=> {
    it('Prueba del metodo GET para obtener un usuario por ID', async ()=> {
        const createUser = await request.post('/api/users/registro').send(userMock)
        const idUser = createUser._body.newUser._id
        const response = await request.get(`/api/sessions/current/${idUser}`)
        expect(response._body.user).to.have.property('full_name')
        expect(response._body.user).to.have.property('email')
        expect(response._body.user).to.have.property('cart')
        expect(response._body.user).to.have.property('role')
    })
    it('Prueba del metodo POST para agregar un carrito al usuario', async()=> {
        const createUser = await request.post('/api/users/registro').send(userMock2)
        const idUser = createUser._body.newUser._id
        const createCart = await request.post('/api/carts')
        const _id = createCart._body.cart._id
        const response = await request.post(`/api/sessions/${idUser}/cart/${_id}`)
        expect(response._body.user).to.have.property('cart')
        expect(response._body.user.cart).to.not.have.lengthOf(0)
    })
})