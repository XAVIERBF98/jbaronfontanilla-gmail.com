import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from './../../services/service.index';
import  swal from 'sweetalert';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;

  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(public _usuarioService: UsuarioService,
              public _modalUploadService:ModalUploadService
    ) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion.subscribe(resp => {
      this.cargarUsuarios();
    })
  }

  mostrarModal(id:string){
    this._modalUploadService.mostrarModal('usuarios',id);
  }


  cargarUsuarios() {

    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde)
      .subscribe((resp: any) => {
        this.totalRegistros = resp.total;
        this.usuarios = resp.usuarios;

        this.cargando = false;
      });
  }
  cambiarDesde(valor: number) {
    let desde = this.desde + valor;
    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario(termino: string) {
    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    this._usuarioService.buscarUsuario(termino).subscribe(
      (usuarios: Usuario[]) => {
        this.usuarios = usuarios
        this.cargando = false;
      });

  }


  borrarUsuario(usuario: Usuario) {
if(usuario._id ==this._usuarioService.usuario._id) {
  swal('No se puede Eliminar Usuario', 'No se puede eliminar a si mismo','error');
  return;
  }
swal({
    title: '¿Esta Seguro ?',
    text: 'Esta a punto de Elimianar al a ' + usuario.nombre,
    icon: "warning",
    buttons: ["Cancelar", "Eliminar"],
    dangerMode: true,
  })
  .then((Eliminar) => {
    if (Eliminar) {
      this._usuarioService.borrarUsuario(usuario._id).subscribe( (resp:any)=>{
      this.cargarUsuarios();
      });
      swal("se ha eliminado a"+ usuario.nombre +'!!', {
        icon: "success",
      });

  }else {
    swal("Se ha cancelado la eliminacion de "+ usuario.nombre + ' !!');
  }
});
  }

  guardarUsuario(usuario: Usuario) {
  this._usuarioService.actualizarUsuario(usuario).subscribe();
  }


}