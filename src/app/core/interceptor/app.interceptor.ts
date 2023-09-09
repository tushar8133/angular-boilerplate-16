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
        'X-Something': '1000'
      },
      body: this.cloneBody(request.body)
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
            body: this.cloneRequest(event.body)
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

  cloneBody(payload: any) {
    return payload;
  }

  cloneRequest(payload: any) {
    return payload;
  }
}
