import {
    controller,
    interfaces,
    Router,
    httpGet,
    inject,
    provideThrowable,
    TYPE,
    TAGS
} from "../ioc/ioc";
@controller("/test")
@provideThrowable(TYPE.Controller,"TestController")
export default class TestController implements interfaces.Controller {
    @httpGet("/page")
    private async index(ctx : Router.IRouterContext, next : () => Promise <any>) : Promise <any> {
        ctx.body = await ctx.render("index");
    }
}
