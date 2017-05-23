module.exports = (app) => {
    let HomeController = {
        index: (req, res) => {
            res.render('home/index');
        },
        login: (req, res) => {
            let nome = req.body.usuario.nome;
            let email = req.body.usuario.email;
            if (nome && email) {
                let usuario = req.body.usuario;
                usuario['contatos'] = [];
                req.session.usuario = usuario;
                res.redirect('/contatos');
            } else {
                res.redirect('/');
            }
        },
        logout: (req, res) => {
            req.session.destroy();
            res.redirect('/');
        }
    };
    return HomeController;
};