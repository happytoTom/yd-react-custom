import { InversifyKoaServer } from 'inversify-koa-utils';
import { Container, buildProviderModule } from './ioc/ioc';
import "reflect-metadata";
import "./ioc/loader"
import errorHandler from "./utils/errorHandle"
import {join} from 'path'
import * as render from 'koa-swig';
import * as serverStatic from 'koa-static';
import co from 'co';
import config from './config';
import * as log4js from 'log4js';
log4js.configure({
    appenders: { cheese: { type: 'file', filename: 'logs/yd.log' } },
    categories: { default: { appenders: ['cheese'], level: 'error' } }
});
const container = new Container();
//如何加载资源
container.load(buildProviderModule());
let server = new InversifyKoaServer(container);
server
  .setConfig(app => {
    //静态资源
    app.context.render = co.wrap(render({
        root: join(config.viewDir),
        autoescape: true,
        cache: config.caseModel, // disable, set to false 
        ext: 'html',
        writeBody: false,
        varControls: ["[[","]]"]
    }));
    app.use(serverStatic(config.staticDir));
  })
  .setErrorConfig(app => {
    //容错
    errorHandler.error(app,log4js);
    
  });

let app = server.build();
app.listen(3000, () => {
  console.log('一灯Inversify启动成功🍺');
});
