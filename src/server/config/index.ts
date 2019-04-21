import {join} from 'path';
import {extend} from "lodash"; // 这里就是当使用什么函数的时候，才引用
let config = {
    "viewDir": join(__dirname,"..","views"),
    "staticDir":join(__dirname,"..","assets"),
    "caseModel":''
}

if(process.env.NODE_ENV == 'development'){
    const localConfig = {
        baseUrl:"https://www.easy-mock.com/mock/59b75661e0dc663341a682c6/example/",
        caseModel: false,
        port: 3000
    }
    config = extend(config,localConfig);
}

if(process.env.NODE_ENV == 'production'){
    const prodConfig = {
        caseModel: "memory",
        port: 8081
    }
    config = extend(config,prodConfig);
}

export default config;