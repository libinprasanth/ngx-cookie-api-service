# NGXCookieAPI

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.0.  

# Main features of NGXCookieAPI!

  - Easy Api Call
  - Cookie options 
  - Transferstate ( it will avoid page flicker and avoid api call twice when using SSR)  

This library created for reduce coding. In this library included cookie, POST, GET, PUT, PATCH, DELETE.  

We have used transferstate for GET Method, so you can use these data without call api again and again 
This libray created and tested with latest version of angular version 7.2.0. 

### Installation

Install the dependencies and devDependencies and start the server.

```sh
$ npm i ngx-cookie-api-service 
``` 

Import ngx-cookie-api in your app.module.ts file
```javascript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EasyZoomModule } from 'angular-easy-zoom';
import { NGXCookieAPIModule, NGXCookieAPIService } from 'ngx-cookie-api-service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	NGXCookieAPIModule,
  ],
  providers: [
    NGXCookieAPIService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
``` 

### Installation

In your component file import "NGXCookieAPIService"
```javascript
import { NGXCookieAPIService } from 'ngx-cookie-api-service';
constructor(private apiService: NGXCookieAPIService) {}
``` 
### API Calls
for GET method 
```javascript
let con = this.apiService.restGet('https://reqres.in/api','users',{"page":"3"}, {"X-CustomHttpHeader": "CUSTOM_VALUE"}, true, false);
    con.then(  
       (data) => { 
          console.log(data);
	    }, 
		(error) => { 	
		}
   );
```
  - 'https://reqres.in/api' - api base path
  - 'users' - api sub path
  - {"page":"3"} - parameter, it should be object format for GET method
  - {"X-CustomHttpHeader": "CUSTOM_VALUE"} - additional header, it should be object format
  - 5th parameter ( true ) is enable or disable transfersate - default value is true
  - 6th paramete ( false ) is keep transferstate value until page reload or not, if set true mean transferstate value won't removed untill page reload - defalult is false  
  
for POST method 
```javascript
this
    .apiService
    .restPost('https://reqres.in/api', 'register', {"email": "eve.holt@reqres.in","password": "pistol"}, {"X-CustomHttpHeader": "CUSTOM_VALUE"}, (err, data) => {
       if (err) { 
          return;
        } 
    });
```

for PUT method 
```javascript
this
    .apiService
    .restPut('https://reqres.in/api', 'users/2', { "name": "morpheus", "job": "zion resident"}, {"X-CustomHttpHeader": "CUSTOM_VALUE"}, (err, data) => {
        if (err) { 
          return;
        }
		console.log(data);
    });
```

for PATCH method 
```javascript
this
    .apiService
    .restPatch('https://reqres.in/api', 'users/2', {"name": "morpheus","job": "zion resident"}, {"X-CustomHttpHeader": "CUSTOM_VALUE"}, (err, data) => {
        if (err) { 
          return;
        }
		console.log(data);
    });
```

for DELETE method 
```javascript
this
    .apiService
    .restDelete('https://reqres.in/api', 'users/2', {"name": "morpheus","job": "zion resident"}, {"X-CustomHttpHeader": "CUSTOM_VALUE"}, (err, data) => {
        if (err) { 
          return;
        }
		console.log(data);
    });
```
### Cookie
Set cookie 
```javascript
this.apiService.set( 'test', 'Hello World' ); 
``` 

Get cookie 
```javascript
this.apiService.get('test');
``` 
Check cookie exist or not  
```javascript
this.apiService.check('test');
``` 
Delete cookie
```javascript
this.apiService.delete('test');
``` 
Delete All cookie
```javascript
this.apiService.deleteAll();
``` 
**Free Software, Hell Yeah!** 