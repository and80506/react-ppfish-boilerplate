/* eslint-disable no-console */
import jsonServer from 'json-server';
import enableDestroy from 'server-destroy';
import chokidar from 'chokidar';
import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import { chalkSuccess } from './chalkConfig';
import { getConfig } from '../src/config';

let server = null;
const db = './src/data/db.json';
const mocks = './mocks/';
const middlewares = jsonServer.defaults();
const ajaxPrefix = getConfig().ajaxPrefix;
let router = jsonServer.router(db);
const mockPath = [];

function travelDir(dir, collector) {
  fs.readdirSync(dir).forEach(function (file) {
    const pathname = path.join(dir, file);
    if ( fs.statSync(pathname).isDirectory() ) {
      travelDir(pathname, collector);
    } else {
      collector.push(pathname);
    }
  });
}

function start(){
  const app = jsonServer.create();
  app.use(middlewares);
  app.use(function(req, res, next) {
    // 检查请求地址和mocks文件路径是否匹配
    for (let i = 0; i < mockPath.length; i ++) {
      const path = mockPath[i];
      if ( path.replace(/^mocks\/(get|post)|\/data\.json$/g, '') === req.originalUrl ) {
        const obj = JSON.parse(fs.readFileSync(path));
        return res.send(obj);
      }

    }
    next();
  });
  // Add this before app.use(router)
  app.use(jsonServer.rewriter({
    [`${ajaxPrefix}/`]: '/'
  }));

  app.use(router);
  server = app.listen(4000, function() {
    console.log(chalkSuccess('Mock Server is running'));
  });
  // Enhance with a destroy function
  enableDestroy(server);
}

// Watch .js or .json file
// Since lowdb uses atomic writing, directory is watched instead of file
chokidar
  .watch(path.dirname(db))
  .on('change', function () {
    const obj = JSON.parse(fs.readFileSync(db));
    const isDatabaseDifferent = !_.isEqual(obj, router.db.getState());
    if (isDatabaseDifferent) {
      console.log(chalkSuccess('Db file was changed, Reloading...'));
      server && server.destroy();
      router = jsonServer.router(obj);
      start();
    }
  });

if ( !fs.existsSync(mocks) ) {
  console.log('not find mocks directory, please run nei build first');
} else {
  travelDir(mocks, mockPath);
  start();
}
