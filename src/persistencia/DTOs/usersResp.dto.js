export class UserRespDTO {
    constructor(user) {
        this._id = user._id
        this.full_name = user.full_name,
        this.email = user.email,
        this.cart = user.cart,
        this.role = user.role,
        this.documents = user.documents,
        this.last_connection = user.last_connection
    }
}

export class UsersRespDTO {
    constructor(users) {
      this.users = users.map(user => ({
        _id: user._id,
        full_name: user.full_name,
        email: user.email,
        cart: user.cart,
        role: user.role,
        documents: user.documents,
        last_connection: user.last_connection
      }));
    }
  }
  
  
  
  
  