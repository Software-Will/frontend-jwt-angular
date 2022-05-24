import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URL = 'http://localhost:8000'; //Direccion de nuestro servidor

  //Consumo de API
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  //user: string
  singin(user: any) {
    return this.http.post(`${this.URL}/user/singin`, user); //Esto devuelve la consulta
  }

  //Validamos si el token fue enviado o esta presente en el client
  isAuth(): boolean {
    const token: any = localStorage.getItem('token');
    if (
      this.jwtHelper.isTokenExpired(token) ||
      !localStorage.getItem('token')
    ) {
      //npm i --save @auth0/angular-jwt para manejar tokens en angular -> app.module.ts -> providers: {}
      return false;
    }
    return true;
  }
}
