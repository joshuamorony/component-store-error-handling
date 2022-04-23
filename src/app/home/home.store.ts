import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { EMPTY, pipe } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { UserService } from '../shared/data-access/user/user.service';

interface HomeState {
  user: string;
  userError: string;
}

@Injectable()
export class HomeStore extends ComponentStore<HomeState> {
  readonly user$ = this.select((state) => state.user);
  readonly userError$ = this.select((state) => state.userError);

  loadUser = this.effect<void>(
    pipe(
      switchMap(() =>
        this.userService.getUser().pipe(
          tap({
            next: (user) => this.patchState({ user }),
            error: (userError) => this.patchState({ userError }),
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(private userService: UserService) {
    super({
      user: null,
      userError: null,
    });
  }
}
