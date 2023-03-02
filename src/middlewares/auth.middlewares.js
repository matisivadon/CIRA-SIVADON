export function auth (req, res, next) {
    if(req.session.logged) {
        next()
    } else {
        res.redirect('/login')
    }
}

export function isLogged (req, res, next) {
    if(req.session.logged) {
        res.redirect('/products')
    } else {
        next()
    }
}