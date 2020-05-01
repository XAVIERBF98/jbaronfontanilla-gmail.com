import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Profesor } from '../../models/profesor.model';

@Injectable()
export class ProfesorService {

  totalProfesores: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  //Buscar Profesor
  buscarProfesor(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/profesores/' + termino;
    return this.http.get(url).pipe(map((resp: any) => {
      return resp.profesores;
    })
    );
  }


  //Cargar Usuario
  cargarProfesores(desde: number = 0) {
    let url = URL_SERVICIOS + '/profesor?desde=' + desde;
    return this.http.get(url).pipe(map(
      (resp: any) => {
        this.totalProfesores = resp.total;
        return resp.profesors;
      }
    ));
  }

  //Eliminar Profesor

  borrarProfesor(id: string) {
    let url = URL_SERVICIOS + '/profesor/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url).pipe(map((resp: any) => {
      swal('Profesor Eliminado', 'Profesor' + resp.nombre + 'Eliminado Satisfactoriamente', 'success');
      return resp;
    }));

  }

  CargarProfesorById(id: string) {
    let url = URL_SERVICIOS + '/profesor/' + id;
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp.profesor;
      })
    );
  }

  //Guardar Medico 
  guardarProfesor(profesor: Profesor) {
    let url = URL_SERVICIOS + '/profesor';
    if (profesor._id) {
      url += '/'+profesor._id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put(url, profesor).pipe(map((resp:any)=>{
        swal('Profesor Actualizado', profesor.nombre , 'success');
        return resp.profesor;
      }));
    } else {
      url += '?token=' + this._usuarioService.token;

      return this.http.post(url, profesor).pipe(map((resp: any) => {
        swal('Profesor Creado' + profesor.nombre + " success");
        return resp.profesor;
      }));
    }
  }
}
