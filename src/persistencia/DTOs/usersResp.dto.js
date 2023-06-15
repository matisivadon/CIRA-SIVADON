export default class UsersRespDTO {
    constructor(user) {
        this.full_name = user.full_name,
        this.email = user.email,
        this.cart = user.cart,
        this.role = user.role,
        this.documents = user.documents,
        this.last_connection = user.last_connection
    }
}