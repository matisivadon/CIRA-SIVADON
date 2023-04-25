
export function auth(req, res, next) {
    if (req.session.logged) {
        next()
    } else {
        res.redirect('/login')
    }
    console.log(req.session.logged);
}


export function isLogged(req, res, next) {
    if (req.session.logged) {
        res.redirect('/products')
    } else {
        next()
    }
}

export function isAdmin(req, res, next) {
        if (req.session.isAdmin) {
            next()
        } else {
            res.json({ message: 'No esta autorizado a realizar esta tarea' })
        }
}


export function isUser(req, res, next) {
    if(req.session.isAdmin === undefined) {
        res.json({ message: 'No ha iniciado sesion' })
    } else {
        if (req.session.isAdmin) {
            res.json({ message: 'No esta autorizado a realizar esta tarea' })
        } else {
            next()
        }
    }
}