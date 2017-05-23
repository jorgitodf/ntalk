module.exports = (app) => {
    let ContatosController = {
        index: (req, res) => {
            let usuario = req.session.usuario;
            let contatos = usuario.contatos;
            let params = {usuario: usuario, contatos: contatos};
            res.render('contatos/index', params);
        },
        create: (req, res) => {
            let contato = req.body.contato;
            let usuario = req.session.usuario;
            console.log(usuario);
            usuario.contatos.push(contato);
            res.redirect('/contatos');
        },
        show: (req, res) => {
            let id = req.params.id;
            let contato = req.session.usuario.contatos[id];
            let params = {contato: contato, id: id};
            res.render('contatos/show', params);
        },
        edit: (req, res) => {
            let id = req.params.id;
            let usuario = req.session.usuario;
            let contato = usuario.contatos[id];
            let params = {usuario: usuario, contato: contato, id: id};
            res.render('contatos/edit', params);
        },
        update: (req, res) => {
            let contato = req.body.contato;
            let usuario = req.session.usuario;
            usuario.contatos[req.params.id] = contato;
            res.redirect('/contatos');
        },
        destroy: (req, res) => {
            let usuario = req.session.usuario;
            let id = req.params.id;
            usuario.contatos.splice(id, 1);
            res.redirect('/contatos');
        }
    };
    return ContatosController;
};