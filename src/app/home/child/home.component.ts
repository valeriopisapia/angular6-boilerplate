import { Component, OnInit, SimpleChanges } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { AppState } from "../../core";
import { Title } from "./../title";
import { Profile } from "../../core/models/profile.model";

import {
  RootStoreState,
  AuthStoreSelectors,
  AuthStoreActions
} from "../../core/store";

@Component({
  /**
   * The selector is what angular internally uses
   * for `document.querySelectorAll(selector)` in our index.html
   * where, in this case, selector is the string 'home'.
   */
  selector: "home", // <home></home>
  /**
   * We need to tell Angular's Dependency Injection which providers are in our app.
   */
  providers: [Title],
  /**
   * Our list of styles in our component. We may add more to compose many styles together.
   */
  styleUrls: ["./home.component.css"],
  /**
   * Every Angular template is first compiled by the browser before Angular runs it's compiler.
   */
  templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
  auth$: Observable<Profile[]>;
  error$: Observable<any>;
  isLoading$: Observable<boolean>;
  /**
   * Set our default values
   */
  public localState = { value: "" };
  /**
   * TypeScript public modifiers
   */
  constructor(
    public appState: AppState,
    public title: Title,
    private store$: Store<RootStoreState.State>
  ) {}

  public ngOnInit() {
    console.log("hello `Home` component");
    /**
     * this.title.getData().subscribe(data => this.data = data);
     */

    this.auth$ = this.store$.pipe(select(AuthStoreSelectors.selectProfile));
    this.error$ = this.store$.pipe(select(AuthStoreSelectors.selectAuthError));
    this.isLoading$ = this.store$.pipe(
      select(AuthStoreSelectors.selectAuthIsLoading)
    );
  }

  public ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log("ngOnChanges", changes);
  }

  public submitState(value: string) {
    console.log("submitState", value);
    this.appState.set("value", value);
    this.localState.value = "";
    const body = {
      body: {
        login: "v.pisapia@fastcode.it",
        password: "v.pisapia.10",
        lang: "en",
        customer: "",
        theme: "",
        service: "leggera",
        USEHTMLTPL: 1,
        login_way: "optimized"
      }
    };
    this.store$.dispatch(new AuthStoreActions.startLogin(body));
  }
}
