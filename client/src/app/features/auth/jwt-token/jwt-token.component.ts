import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/state/app.state';
import { map, take } from 'rxjs';

import { accessTokenKey } from 'src/app/shared/constants';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-jwt-token',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jwt-token.component.html',
  styleUrls: ['./jwt-token.component.css'],
})
export class JwtTokenComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<State>,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.route.params
      .pipe(
        map(params => params['accessToken']),
        take(1)
      )
      .subscribe(accessToken => {
        localStorage.setItem(accessTokenKey, accessToken);
        this.router.navigate(['']);
      });
  }
}
