import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Actions, Selectors, Store } from 'src/app/store'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private subscription$ = new Subscription();
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(Actions.app.info({ payload: {
      aa: 234
    } }))

    this.store.dispatch(Actions.app.alert( { payload: {
      type: '234',
      message: '234'
    } } ))

    this.store.select(Selectors.app.info).subscribe(data => {
      console.log(data)
    })
    
  }

  @HostListener('window:beforeunload')
  async ngOnDestroy() {
    this.subscription$.unsubscribe();
    await this.store.dispatch(Actions.reload.preserveState());
  }


}
