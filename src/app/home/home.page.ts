import { Component, OnInit } from '@angular/core';
import { HomeStore } from './home.store';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [HomeStore],
})
export class HomePage implements OnInit {
  user$ = this.homeStore.user$;
  userError$ = this.homeStore.userError$;

  constructor(public homeStore: HomeStore) {}

  ngOnInit() {
    this.homeStore.loadUser();
  }
}
