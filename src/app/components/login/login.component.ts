import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user = {
    userName: 'kevin',
    pass: '123',
  };

  //2 parametro -> para navegar entre rutas despues de la validacion -> Son variables del tipo de modulo
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  //Metodo login
  logIn() {
    console.log(this.user); //Este objeto se enviara al servidor y el servidor devolvera un jwt
    this.authService.singin(this.user).subscribe((res: any) => {
      console.log(res); //Imprime el token
      localStorage.setItem('token', res.token); //LocalStorage -> Guarda el token que permite que se hagan cambios por toda la aplicacion -> F12 | Application | LocalStorage
      this.router.navigate(['private']); //Despues del login vamos a la ventana private
      //guard para la proteccion de rutas, es decir si no esta logeado no puede ver otras ventanas
    });
  } //Para consumir API's se crea un servicio con ng g s services/auth
}
