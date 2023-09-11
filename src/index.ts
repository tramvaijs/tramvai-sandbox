import { createApp, Scope, provide } from "@tramvai/core";
import { CommonModule } from "@tramvai/module-common";
import { SpaRouterModule } from "@tramvai/module-router";
import { RenderModule } from "@tramvai/module-render";
import { ServerModule, PROXY_CONFIG_TOKEN } from "@tramvai/module-server";
import { ErrorInterceptorModule } from "@tramvai/module-error-interceptor";
import { SeoModule } from "@tramvai/module-seo";
import {
  RENDER_SLOTS,
  ResourceType,
  ResourceSlot
} from "@tramvai/tokens-render";
import { HeaderModule } from "~shared/header";

createApp({
  name: "example-app",
  modules: [
    CommonModule,
    SpaRouterModule,
    RenderModule.forRoot({ mode: "strict" }),
    SeoModule,
    ServerModule,
    ErrorInterceptorModule,
    HeaderModule
  ],
  providers: [
    provide({
      provide: RENDER_SLOTS,
      multi: true,
      useValue: {
        type: ResourceType.asIs,
        slot: ResourceSlot.HEAD_META,
        payload:
          '<meta name="viewport" content="width=device-width, initial-scale=1">'
      }
    }),
    // proxy static assets from /public/ app endpoint, codesandbox specific
    {
      provide: PROXY_CONFIG_TOKEN,
      scope: Scope.SINGLETON,
      multi: true,
      useFactory: () => {
        return {
          context: "/public/",
          target: `http://localhost:4000/dist/client/`,
          pathRewrite: (path: string) => {
            return path.replace("/public/", "/");
          }
        };
      }
    }
  ]
});
