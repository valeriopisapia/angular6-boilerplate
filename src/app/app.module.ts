import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { APP_BASE_HREF } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, PreloadAllModules } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { CoreModule } from "./core/core.module";
/*
  Redux 
*/
import { RootStoreModule } from "./core/store";
/*
 * Platform and Environment providers/directives/pipes
 */
import { environment } from "environments/environment";
import { ROUTES } from "./app.routes";

// App is our top level component
import { AppComponent } from "./app.component";
import { NoContentComponent } from "./no-content";
import { APP_RESOLVER_PROVIDERS } from "./app.resolver";
import { AppState, InternalStateType } from "./core";
import { SharedModule } from "./shared";
import { DevModuleModule } from "./components/+dev-module";

import "../assets/styles/styles.scss";
import "../assets/styles/headings.css";

// Application wide providers
const APP_PROVIDERS = [...APP_RESOLVER_PROVIDERS, AppState];

interface StoreType {
  state: InternalStateType;
  restoreInputValues: () => void;
  disposeOldHosts: () => void;
}

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, NoContentComponent],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    RootStoreModule,
    RouterModule.forRoot(ROUTES, {
      useHash: Boolean(history.pushState) === false,
      preloadingStrategy: PreloadAllModules // Good to know: https://medium.com/@adrianfaciu/custom-preloading-strategy-for-angular-modules-b3b5c873681a
    }),

    /**
     * This section will import the `DevModuleModule` only in certain build types.
     * When the module is not imported it will get tree shaked.
     * This is a simple example, a big app should probably implement some logic
     */
    ...(environment.showDevModule ? [DevModuleModule] : [])
    // StoreModule.provideStore(reducer),
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    { provide: APP_BASE_HREF, useValue: "/app6/" }, //TODO: it's necessary for Single-Spa library. Therefore we should probably add some logic.
    environment.ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {
  constructor() {
    console.log("MainModule constructor()");
  }
}
