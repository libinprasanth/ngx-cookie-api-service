import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { makeStateKey, TransferState } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class NGXCookieAPIService {

  private cookieStore = {};
  constructor(private httpClient: HttpClient, private transferState: TransferState, @Inject('req') private readonly req: any) {
    this.updateCookie();
  }
  /**
   * GET Service
   */
  restGet(api, resource, param = {}, header = {}, loadCache = true, untilReload = false) {

    const ptkey = makeStateKey < any > (api + resource); // GET Transfer key from resource

    let headers = new HttpHeaders();
    let params = new HttpParams();
    // set header
    for (const [key, value] of Object.entries(header)) {
      headers = headers.set(`${key}`, `${value}`);
    }
    // set params
    for (const [key, value] of Object.entries(param)) {
      params = params.set(`${key}`, `${value}`);
    }

    const options = {
      params: params,
      headers: headers
    };
    return new Promise((resolve, reject) => {
      // Check key exist and cache mode is on
      if (this.transferState.hasKey(ptkey) && loadCache) {
        const result = this.transferState.get(ptkey, {});
        // remove data once loaded from cache
        if (!untilReload) {
          this.transferState.remove(ptkey);
        }
        resolve(result);
      } else {
        // get data from api, if cache file not exist
        this
          .httpClient
          .get(`${api}/${resource}`, options)
          .subscribe(
            (data: any) => {
              this.transferState.set(ptkey, data);
              resolve(data);
            },
            (err: any) => {
              reject(err);
            }
          );
      }
    });
  }

  /**
   * POST Service
   */
  restPost(api, resource, payload, header = {}, callback) {
    let headers = new HttpHeaders();
    // set header
    for (const [key, value] of Object.entries(header)) {
      headers = headers.set(`${key}`, `${value}`);
    }

    const options = {
      headers: headers
    };
    this
      .httpClient
      .post(`${api}/${resource}`, payload, options)
      .subscribe(
        (data: any) => {
          if (data) {
            return callback(null, data);
          }
        },
        (err: any) => {
          return callback(err);
        }
      );
  }
  /**
   * PUT Service
   */
  restPut(api, resource, payload, header = {}, callback) {
    let headers = new HttpHeaders();
    // set header
    for (const [key, value] of Object.entries(header)) {
      headers = headers.set(`${key}`, `${value}`);
    }

    const options = {
      headers: headers
    };
    this
      .httpClient
      .put(`${api}/${resource}`, payload, options)
      .subscribe(
        (data: any) => {
          if (data) {
            return callback(null, data);
          }
        },
        (err: any) => {
          return callback(err);
        }
      );
  }
  /**
   * PATCH Service
   */
  restPatch(api, resource, payload, header = {}, callback) {
    let headers = new HttpHeaders(); 
    // set header
    for (const [key, value] of Object.entries(header)) {
      headers = headers.set(`${key}`, `${value}`);
    }

    const options = {
      headers: headers
    };
    this
      .httpClient
      .put(`${api}/${resource}`, payload, options)
      .subscribe(
        (data: any) => {
          if (data) {
            return callback(null, data);
          }
        },
        (err: any) => {
          return callback(err);
        }
      );
  }
  /**
   * DELETE Service
   */
  restDelete(api, resource, payload, header = {}, callback) {
    let headers = new HttpHeaders();
    let params = new HttpParams();
    // set header
    for (const [key, value] of Object.entries(header)) {
      headers = headers.set(`${key}`, `${value}`);
    }
    // set params
    for (const [key, value] of Object.entries(payload)) {
      params = params.set(`${key}`, `${value}`);
    }

    const options = {
      params: params,
      headers: headers
    };
    this
      .httpClient
      .delete(`${api}/${resource}`, options)
      .subscribe(
        (data: any) => {
          if (data) {
            return callback(null, data);
          }
        },
        (err: any) => {
          return callback(err);
        }
      );
  }
  /**
   * Retrieves all cookies
   */
  public updateCookie() {
    if (this.req !== null) {
      this.parseCookies(this.req.cookies);
    } else {
      this.parseCookies(document.cookie);
    }
  }

  /**
   * Parse all cookies
   */
  public parseCookies(cookies) {
    this.cookieStore = {};
    if (!!cookies === false) {
      return;
    }
    const cookiesArr = cookies.split(';');
    for (const cookie of cookiesArr) {
      const cookieArr = cookie.split('=');
      const key = cookieArr[0].trim();
      this.cookieStore[key] = cookieArr[1];
    }
  }

  /**
   * Checks the existence of a single cookie by it's name
   */
  public check(name: string): boolean {
    return (this.cookieStore[name] !== undefined && this.cookieStore[name] !== '') ? true : false;
  }

  /**
   * Retrieves a single cookie by it's name
   */
  public get(name: string): string {
    return !!this.cookieStore[name] ? decodeURIComponent(this.cookieStore[name]) : '';
  }

  /**
   * Retrieves a a list of all cookie avaiable
   */
  public getAll(): any {
    const cookies: any = {};

    // tslint:disable-next-line:triple-equals
    if (document.cookie && document.cookie != '') {
      const split = document.cookie.split(';');
      for (const s of split) {
        const currCookie = s.split('=');
        currCookie[0] = currCookie[0].replace(/^ /, '');
        cookies[decodeURIComponent(currCookie[0])] = decodeURIComponent(currCookie[1]);
      }
    }

    return cookies;
  }

  /**
   * Save the Cookie
   */
  public set(
    name: string, value: string, expires?: number | Date, path?: string, domain?: string, secure?: boolean
  ) {
    let cookieStr = encodeURIComponent(name) + '=' + encodeURIComponent(value) + ';';

    if (expires) {
      if (typeof expires === 'number') {
        const dtExpires = new Date(new Date().getTime() + expires * 1000 * 60 * 60 * 24);
        cookieStr += 'expires=' + dtExpires.toUTCString() + ';';
      } else {
        cookieStr += 'expires=' + expires.toUTCString() + ';';
      }

    } else {
      const ex = new Date();
      ex.setTime(ex.getTime() + 31536000000);
      cookieStr += 'expires=' + ex.toUTCString() + ';';
    }

    if (path) {
      cookieStr += 'path=' + path + ';';
    }
    if (domain) {
      cookieStr += 'domain=' + domain + ';';
    }
    if (secure) {
      cookieStr += 'secure;';
    }
    // console.log(cookieStr);
    document.cookie = cookieStr;
    this.updateCookie();
  }

  /**
   * Removes specified Cookie
   */
  public delete(name: string, path?: string, domain?: string): void {
    this.set(name, '', -1, path, domain);
    this.updateCookie();
  }

  /**
   * Delete all cookie avaiable
   */
  public deleteAll(path?: string, domain?: string): void {
    const cookies: any = this.getAll();

    for (const cookie of Object.keys(cookies)) {
      this.delete(cookie, path, domain);
    }
    this.updateCookie();
  }
}
