export const generateUserErrorInfo = (user) => {
    return `
            Una o mas propiedades estan incompletas o no son válidas
            Lista de propiedades requeridas:
            * first_name: Se esperaba un String, se recibió ${user.first_name}
            * last_name: Se esperaba un String, se recibió ${user.last_name}
            * email: Se esperaba un String, se recibió ${user.email}
            * age: Se esperaba un Number, se recibió ${user.age}
            `
}

export const generateProductErrorInfo = (product) => {
    return `
            Una o mas propiedades estan incompletas o no son válidas
            Lista de propiedades requeridas:
            * title: Se esperaba un String, se recibió ${typeof product.title},
            * description: Se esperaba un String, se recibió ${typeof product.description},
            * code: Se esperaba un String, se recibió ${typeof product.code},
            * price: Se esperaba un Number, se recibió ${typeof product.price},
            * status: Se esperaba un Boolean, se recibio ${typeof product.status},
            * stock: Se esperaba un Number, se recibió ${typeof product.stock},
            * category: Se esperaba un String, se recibió ${typeof product.category},
            * image: Se esperaba un String, se recibió ${typeof product.image},
            * size: Se esperaba un String, se recibió ${typeof product.size}
            `
}