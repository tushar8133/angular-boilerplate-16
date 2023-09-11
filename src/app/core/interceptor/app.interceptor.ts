import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { EMPTY, Observable, catchError, finalize, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions, Selectors, getValue } from 'src/app/store';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  counter = 0;
  charMap = {
    '>': '&gt;'
  }
  constructor(private store: Store) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    /**
     * If resource is not API, then just return from here, no need to execute rest of the logic.
     */
    const isApi = request.url.toLowerCase().split('/').includes('api');
    if (!isApi) {
      return next.handle(request);
    }

    /**
     * Request Headers
     */
    request = request.clone({
      setHeaders: {
        'Cache-Control': 'no-cache,no-store , max-age=0',
        'X-Content-Type-Options': 'nosniff',
        'X-Xss-Protection': '1; mode=block',
        'X-RateLimit-Limit': '1000',
      },
      body: this.cloneRequest(request.body)
    })

    /**
     * Display Loader
     */
    const isLoaderPresent = getValue(this.store.select(Selectors.app.loading));
    if (!isLoaderPresent) {
      this.store.dispatch(Actions.app.loading( { payload: true } ));
    }

    /**
     * Response
     */
    const response = next.handle(request).pipe(

      // Error Handler
      catchError((error: HttpErrorResponse) => {
        alert(error.status);
        return EMPTY;
      }),

      // Convert HTML Entity to Characters
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          event = event.clone({
            body: this.cloneResponse(event.body)
          })
        };
        return event;
      }),

      // Hide Spinner
      finalize(() => {
        this.counter--;
        if(this.counter === 0) {
          this.store.dispatch(Actions.app.loading( { payload: false } ));
        }
      })

    );

    return response;
  }

  private sanitizePayload(str) {
    if (typeof str !== 'string') {
      return str;
    }
    let newstr = '';
    str.split('').forEach((char) => {
      newstr = newstr.concat(this.charMap[char] ?? char);
      // newstr = newstr.concat((/[^a-zA-Z0-9 ]/.test(char)) ? `&#${char.charCodeAt(0)};` : char);
    });
    return newstr;
  }

  private sanitizeResponse(str) {
    if (typeof str !== 'string') {
      return str;
    }
    const dummyElem = document.createElement('textarea');
    dummyElem.innerHTML = str;
    return dummyElem.value;
  }

  private cloneRequest(data) {
    if (
      data === null ||
      data === undefined ||
      typeof data !== 'object' ||
      Object.keys(data).length === 0
    ) {
      return data;
    }
    if (data instanceof Array) {
      let cloneArr = new Array();
      data.forEach((item, i) => {
        let arr = this.sanitizePayload(item);
        cloneArr[i] = this.cloneRequest(arr);
      });
      return cloneArr;
    }
    let cloneObj = {};
    for (let i in data) {
      let obj = this.sanitizePayload(data[i]);
      cloneObj[i] = this.cloneRequest(obj);
    }
    return cloneObj;
  }

  private cloneResponse(data) {
    if (
      data === null ||
      data === undefined ||
      typeof data !== 'object' ||
      Object.keys(data).length === 0
    ) {
      return data;
    }
    if (data instanceof Array) {
      let cloneArr = new Array();
      data.forEach((item, i) => {
        let arr = this.sanitizeResponse(item);
        cloneArr[i] = this.cloneResponse(arr);
      });
      return cloneArr;
    }
    let cloneObj = {};
    for (let i in data) {
      let obj = this.sanitizeResponse(data[i]);
      cloneObj[i] = this.cloneResponse(obj);
    }
    return cloneObj;
  }
}
