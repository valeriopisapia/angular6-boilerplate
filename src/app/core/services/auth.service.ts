import { Injectable } from "@angular/core";
import { HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

import { ApiService } from "./api.service";
import { Profile } from "../models";
import { map } from "rxjs/operators";

@Injectable()
export class AuthService {
  constructor(private apiService: ApiService) {}

  /**
   * Login
   * @param body 
   * Body Example
   * {
   * login:v.pisapia@fastcode.it
   * password:v.pisapia.10
   * lang:en
   * customer:
   * theme:
   * service:leggera
   * USEHTMLTPL:1
   * login_way:optimized
   * }
   */
  login(body: any): Observable<Profile> {
    return this.apiService.get("authenticate.php", body);
  }
}
