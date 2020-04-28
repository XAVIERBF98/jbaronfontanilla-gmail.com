import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import swal from 'sweetalert';

declare function init_Plugins();
declare const gapi:any;

@Component({
  selector: 'app-ligin',
  templateUrl: './ligin.component.html',
  styleUrls: ['./ligin.component.css']
})
export class LiginComponent implements OnInit {
  email: string;
  recuerdame: boolean = false;
  auth2: any;
  constructor(
    public router: Router,
    public _usuarioService: UsuarioService ) {  }
////////////////////////////7
  ngOnInit() {
    init_Plugins();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.recuerdame = true;
    }
    this.googleInit();
  }
  //////////////////////////////////////////////
googleInit(){
  gapi.load('auth2', () => {
  this.auth2 = gapi.auth2.init({
    client_id: '761116356341-cjjtrdvemj0gksp7qhbcb7a86isnhn7j.apps.googleusercontent.com',
    cookiepolicy: 'single_host_origin',
    scope: 'profile email'
  });
  this.attachSignin(document.getElementById('btnGoogle'));
  });
}

attachSignin(element) {
  this.auth2.attachClickHandler(element, {}, (googleUser) =>{
  let profile = googleUser.getBasicProfile();
  let token = googleUser.getAuthResponse().id_token;
  this._usuarioService.loginGoogle(token).subscribe(resp => {
    console.log(profile);
    swal('Bienvenido', "aa", 'success');
    window.location.href = '#/dashboard';
  });
});
}

ingresar(forma: NgForm) {
  if ( forma.invalid){
    return;
  }
  let usuario = new Usuario(null, forma.value.email, forma.value.password);
  this._usuarioService.login(usuario, forma.value.recuerdame)
  .subscribe(correcto => {
    swal('Bienvenido', usuario.email, 'success');
  this.router.navigate(['/dashboard']);
  });
  //this.router.navigate(['/dashboard']);
}
}
