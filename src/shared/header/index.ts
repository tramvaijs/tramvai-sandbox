import { Module, provide } from "@tramvai/core";
import { DEFAULT_HEADER_COMPONENT } from "@tramvai/tokens-render";
import { Header } from "./Header";

@Module({
  providers: [
    provide({
      provide: DEFAULT_HEADER_COMPONENT,
      useValue: Header
    })
  ]
})
export class HeaderModule {}
