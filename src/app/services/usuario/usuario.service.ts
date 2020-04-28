import { map } from 'rxjs/operators';
import { URL_SERVICIOS } from './../../config/config';
import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import {HttpClient} from '@angular/common/http';
import swal from 'sweetalert';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
usuario: Usuario;
token: string;

  constructor(
    public http: HttpClient,
    public router: Router) {
    this.getStorage();
   }


estaLogueado(){
  return (this.token.length > 5) ? true : false;
}
getStorage(){
  if(localStorage.getItem('token')){
    this.token = localStorage.getItem('token');
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
  } else {
    this.token = '';
    this.usuario = null;
  }
}


guadarStorage(id: string, token: string , usuario: Usuario){
  localStorage.setItem('id', id);
  localStorage.setItem('token', token);
  localStorage.setItem('usuario', JSON.stringify(usuario));
  this.usuario = usuario;
  this.token = token;
}

logOut(){
  
  swal({
    title: "Esta Seguro",
    text: "Desea cerrar Sesión !!",
    icon: "warning",
    buttons: ["Stop", "Salir"],
    dangerMode: true,
  })
  .then((Salir) => {
    if (Salir) {
      swal("se ha cerrado la sesión por favor vuelve a conectarte !", {
        icon: "success",
      });
      this.token = '';
      this.usuario = null;
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      this.router.navigate(['/login']);
    } else {
      swal("Your imaginary file is safe!");
    }
  });
  
}

loginGoogle(token: string) {
  let url = URL_SERVICIOS + '/login/google';
  return this.http.post(url, {token}).pipe(map( (resp: any) => {
    this.guadarStorage(resp.id, resp.token, resp.usuario);
    return true;
  }));
}


/**=================================================== */
  login(usuario: Usuario, recordar: boolean = false) {

    if (recordar) {
      localStorage.setItem('email',usuario.email);
    }
    else{
      localStorage.removeItem('email');
    }
    const url = URL_SERVICIOS + '/login';
    return this.http.post( url , usuario).pipe(
      map( (resp: any) => {
        this.guadarStorage(resp.id, resp.token, resp.usuario);

        return true;
      }));
    }
   /**============================== */
   /**============================== */
   crearUsuario(usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario';
    return this.http.post(url, usuario).pipe(
                    map((res: any) => {
                    swal('Usuario Creado', usuario.email, 'success');
                    return res.usuario;
    }));
   }
   
}
