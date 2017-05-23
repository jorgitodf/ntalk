module.exports = (app) => {
    let ChatController = {
        index: (req, res) => {
            let params = {usuario: req.session.usuario};
            res.render('chat/index', params);
        }
    };
    return ChatController;
};
