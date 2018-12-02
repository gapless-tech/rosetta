// eslint-disable-next-line
const jsonServer = require('json-server');
const getNames = require('./getNames');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

router.render = (req, res) => {
  const { locals: { data } } = res;
  const { path, query } = req;
  const { names, culture } = query;

  const dataHandler = {
    '/names': () => getNames(names, culture, data),
  }[path] || (() => data);

  res.jsonp(dataHandler());
};

server.use(middlewares);
server.use(router);
server.listen(3004, () => {
  console.log('-> JSON Server is running on port 3004.');
});
