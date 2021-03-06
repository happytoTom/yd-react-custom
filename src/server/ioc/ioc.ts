import {Container, inject} from "inversify";
import {controller, interfaces, httpGet, TYPE} from "inversify-koa-utils";
import * as Router from "koa-router";
import TAGS from "../constant/tags";
import {provide, buildProviderModule, fluentProvide,} from "inversify-binding-decorators";
let provideThrowable = function (identifier, name) {
    return fluentProvide(identifier)
        .whenTargetNamed(name)
        .done();
}
export {
    Container,
    controller,
    interfaces,
    httpGet,
    Router,
    TYPE,
    inject,
    TAGS,
    provide,
    provideThrowable,
    buildProviderModule
}