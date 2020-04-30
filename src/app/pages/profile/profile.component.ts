import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import  swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario:Usuario;

  imagenSubir: File;
  imagenTemp: string;

  constructor(public _usuarioService:UsuarioService) { 
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {
  }

  //Guardar
  guardar(usuario1:Usuario){
    this.usuario.nombre = usuario1.nombre;
    if(!this.usuario.google){
    this.usuario.email = usuario1.email;
    }

    this._usuarioService.actualizarUsuario(this.usuario)
    .subscribe(resp => {
      console.log(resp);
    })
  }

  seleccionImagen(archivo: File){
    if (!archivo) {
    this.imagenSubir = null;
    return;
    }
    if (archivo.type.indexOf('image') < 0) {
    swal('Solo imágenes', 'El archivo seleccionado no es una imagen','error');
    this.imagenSubir = null;
    return;
    }


    this.imagenSubir = archivo;
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onload = () => this.imagenTemp = reader.result;


  }

  cambiarImagen(){
    this._usuarioService.cambiarImagen(this.imagenSubir,this.usuario._id);
  }

}
