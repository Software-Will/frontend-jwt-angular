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

import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole: any = route.data['expectedRole'];
    const token: any = localStorage.getItem('token');
    //console.log(decode(token));
    const { roleId }: any = decode(token); //Desestructuracion -> data : any -> data.roleId (asi es algo mas limpio)
    console.log(roleId);
    if (!this.authService.isAuth() || roleId !== expectedRole) {
      console.log('Usuario no autorizado para la vista');
      this.router.navigate(['login']); //Redireccionando si no pertenece al roleId
      return false;
    }
    return true;
  }
}

/*
ng g guard guards/role --skipTests
npm i --save jwt-decode -> decodifica el jwt
*/
