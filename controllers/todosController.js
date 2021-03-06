const db = require('../models/index');
// 一覧表示
exports.index = (req, res) => {
  const options = {
    order: [['updatedAt', 'DESC']]
  };
  db.todo.findAll(options).then((results) => {
    res.render('todos/index.ejs', {todos: results} );
  });
};

// 個別表示
exports.show = (req, res) => {
  db.todo.findByPk(req.params.id).then((results) => {
    res.render('todos/show.ejs', {todo: results} );
  });
};

// 新規作成
exports.create = (req, res) => {
  const param = {
    title: req.body.todoTitle,
    content: req.body.todoContent
  };
  db.todo.create(param).then((results) => {
    res.redirect('/');
  });
}

// 編集
exports.edit =  (req, res) => {
  db.todo.findByPk(req.params.id).then((results) => {
    res.render('todos/edit.ejs', {todo: results} );
  });
};

// 更新
exports.update = (req, res) => {
  const param = {
    title: req.params.todoTitle,
    content: req.params.todoContent
  };
  const filter = {
    where: {
      id: req.params.id
    }
  };
  db.todo.update(param, filter).then((results) => {
    res.redirect('/');
  });
};

// 削除
exports.delete = (req, res) => {
  const filter = {
    where: {
      id: req.params.id
    }
  };
  db.todo.destroy(filter).then((results) => {
    res.redirect('/');
  });
};