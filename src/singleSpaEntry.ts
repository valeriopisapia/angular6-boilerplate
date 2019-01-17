import "core-js/es7/reflect";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { enableProdMode } from "@angular/core";
import { AppModule } from "app/app.module";
import { environment } from "./environments/environment";
import { Router } from "@angular/router";

if (environment.production) {
  enableProdMode();
}

const spaProps = {
  bootstrappedModule: null,
  Router: Router
};

// This lifecycle function will be called by singleSPA exactly once, right before the registered application is mounted for the first time.
export function bootstrap(props) {
  console.info(`${props.appName} bootstrap: ${props}`);
  return Promise.resolve();
}

// This lifecycle function is called by singleSPA every time the route for this app is active and the app should be rendered.
export function mount(props) {
  console.info(`${props.appName} mount: ${props}`);
  createDomElement(props.appName);

  return platformBrowserDynamic([
    { provide: "localStoreRef", useValue: props.customProps.store }
    //FIXME: enable it from the AppModule
    /* {
      provide: "globalEventDispatcherRef",
      // TODO: Basically, we're supporting one or more stores but we will use just one.
      useValue: props.customProps.globalStoreEventDistributor.stores
        ? props.customProps.globalStoreEventDistributor.stores[0]
        : null
    }*/
  ])
    .bootstrapModule(AppModule)
    .then(module => {
      return (spaProps.bootstrappedModule = module);
    });
}

// This lifecycle function will be called when the user navigates away from this apps route.
export function unmount(props) {
  console.info(`${props.appName} unmount: ${props}`);
  return new Promise((resolve, reject) => {
    if (spaProps.Router) {
      const routerRef = spaProps.bootstrappedModule.injector.get(
        spaProps.Router
      );
      routerRef.dispose();
    }
    spaProps.bootstrappedModule.destroy();
    console.log(spaProps);
    delete spaProps.bootstrappedModule;
    const elem = window.document.getElementById(`${props.appName}-root`);
    elem.remove();
    resolve();
  });
}

/**
 * Create DOM Element (tip: https://www.abeautifulsite.net/adding-and-removing-elements-on-the-fly-using-javascript)
 * @param appName 
 */
function createDomElement(appName) {
  // Make sure there is a div for us to render into
  let el = window.document.getElementById(`${appName}-root`);
  if (!el) {
    el = window.document.createElement(`${appName}-root`);
    el.id = `${appName}-root`;
    window.document.body.appendChild(el);
  }

  return el;
}
