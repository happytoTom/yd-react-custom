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
// 1. Router.IRouterContext 2.interfaces.Controller 3.@inject(TAGS.IndexService)
@controller("/")
//todo
@provideThrowable(TYPE.Controller,"IndexController")
export default class IndexController implements interfaces.Controller {
    private indexService;
    constructor(@inject(TAGS.IndexService)indexService) {
        this.indexService = indexService;
    }
    @httpGet("/")
    private async index(ctx : Router.IRouterContext, next : () => Promise <any>) : Promise <any> {
        const result = await this.indexService.getUser(1);
        // ctx.body = await ctx.render("index");
        ctx.body = result;
    }
}
