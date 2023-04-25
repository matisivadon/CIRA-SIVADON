import config from '../../config.js'
import ProductsFile from './productsDao/productsFile.js'
import ProductsMongo from './productsDao/productsMongo.js'


//products
export let productsDao
switch (config.persistencia) {
    case 'MONGO':
        await import ('../mongoDB/dbConfig.js')
        productsDao = new ProductsMongo()
        break;

    case 'FILE':
        productsDao= new ProductsFile()
        break;
}



//users
export let UsersDao
switch (config.persistencia) {
    case 'MONGO':
        await import ('../mongoDB/dbConfig.js')
        const {default:UsersMongo} = await import ('./usersDao/usersMongo.js')
        UsersDao = UsersMongo
        break;

    // case 'FILE':
    //     usersDao = new UsersFile()
    //     break;
    //Esta comentado porque no estoy trabajando con usuarios en archivos
}
