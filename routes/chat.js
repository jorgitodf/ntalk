module.exports = (app) => {
    let autenticar = require('./../middlewares/autenticador');
    let chat = app.controllers.chat;
    app.get('/chat', autenticar, chat.index);
};

