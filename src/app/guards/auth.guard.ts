import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  //Funcion del tipo boolean
  canActivate(): boolean {
    //Validamos si el token esta presente
    if (!this.authService.isAuth()) {
      console.log('El token no es valio o ya expiro');
      //alert('Intruso');
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
