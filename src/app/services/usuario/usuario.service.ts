import { map } from 'rxjs/operators';
import { URL_SERVICIOS } from './../../config/config';
import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import {HttpClient} from '@angular/common/http';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';




@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
usuario: Usuario;
token: string;
menu: any[] = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService) {
    this.getStorage();
   }


estaLogueado(){
  return (this.token.length > 5) ? true : false;
}
getStorage(){
  if(localStorage.getItem('token')){
    this.token = localStorage.getItem('token');
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    this.menu = JSON.parse(localStorage.getItem('menu'));
 
  } else {
    this.token = '';
    this.usuario = null;
    this.menu = [];
  }
}


guadarStorage(id: string, token: string , usuario: Usuario, menu: any){
  localStorage.setItem('id', id);
  localStorage.setItem('token', token);
  localStorage.setItem('usuario', JSON.stringify(usuario));
  localStorage.setItem('menu', JSON.stringify(menu));
  this.usuario = usuario;
  this.token = token;
  this.menu = menu;
}

logOut(){
  
  swal({
    title: "Esta Seguro",
    text: "Desea cerrar Sesión !!",
    icon: "warning",
    buttons: ["Cancelar", "Salir"],
    dangerMode: true,
  })
  .then((Salir) => {
    if (Salir) {
      swal("se ha cerrado la sesión por favor vuelve a conectarte !", {
        icon: "success",
      });
      this.token = '';
      this.usuario = null;
      this.menu = [];

      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      localStorage.removeItem('menu');
      this.router.navigate(['/login']);
    } else {
      swal("Se ha cancelado el Log Out!");
    }
  });
  
}

loginGoogle(token: string) {
  let url = URL_SERVICIOS + '/login/google';
  return this.http.post(url, {token}).pipe(map( (resp: any) => {
    this.guadarStorage(resp.id, resp.token, resp.usuario, resp.menu);
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
        this.guadarStorage(resp.id, resp.token, resp.usuario,resp.menu);

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

   actualizarUsuario(usuario: Usuario){
  let url = URL_SERVICIOS + '/usuario/' + usuario._id;
  url +='?token=' + this.token;
  return this.http.put(url,usuario).pipe(map(
    (resp:any) =>{

      if(usuario._id === this.usuario._id) {
        let usuarioDB: Usuario = resp.usuario;
        this.guadarStorage(usuarioDB._id, this.token, usuarioDB,this.menu )
      }
      swal('Usuario Actualizado', usuario.nombre, 'success');
      //this.usuario = resp.usuario;
      return true;
    }
  ));
   }




   cambiarImagen(file: File, id: string){
  this._subirArchivoService.subirArchivo(file, 'usuarios', id)
  .then((resp: any) => {
    this.usuario.img = resp.usuario.img;
    swal('Imagen Actualizado', this.usuario.nombre, 'success');
    this.guadarStorage(id,this.token,this.usuario,this.menu);
  })
  .catch(resp => {
  console.log(resp);
  })
   }

   cargarUsuarios(desde: number = 0) {
    let url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get(url);
   }

   buscarUsuario(termino: string){
   let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
   return this.http.get(url).pipe(map(( resp: any ) =>
   {
        return resp.usuarios;
   })
   );
  }
///Borrar Usuario
borrarUsuario(id:string){
  let url = URL_SERVICIOS + '/usuario/' + id;
  url += '?token=' +this.token;

  return this.http.delete(url);
}

}
