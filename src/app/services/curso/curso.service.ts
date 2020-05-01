import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import swal from 'sweetalert';
import { Curso } from '../../models/curso.model';

@Injectable()
export class CursoService {

  totalCursos: number = 0;
  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarCursos(desde: number = 0) {
    let url = URL_SERVICIOS + '/curso?desde=' + desde;
    return this.http.get(url).pipe(map((resp: any) => {

      this.totalCursos = resp.total;
      return resp.cursos;
    })
    );
  }

  cargarCursosAll() {
    let url = URL_SERVICIOS + '/curso/All';
    return this.http.get(url).pipe(map((resp: any) => {

      this.totalCursos = resp.total;
      return resp.cursos;
    })
    );
  }

  obtenerCurso(id: string) {
    let url = URL_SERVICIOS + '/curso/' + id;
    return this.http.get(url).pipe(map((resp: any) => {
       return resp.curso;
    })
    );
  }

  borrarCurso(id: string) {
    let url = URL_SERVICIOS + '/curso/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url)
      .pipe(map((rep: any) => {
        swal('Curso Borrado', 'Eliminado Correctamente', 'success');
      })
      );
  }

  crearCurso(nombre: string) {

    let url = URL_SERVICIOS + '/curso';
    url += '?token=' + this._usuarioService.token;

    return this.http.post(url, { nombre }).pipe(
      map((resp: any) => {
        resp.curso;
      })
    );
  }

  buscarCurso(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/cursos/' + termino;
    return this.http.get(url).pipe(map((resp: any) => {
      return resp.cursos;
    })
    );
  }

  actualizarCurso(curso: Curso) {
    let url = URL_SERVICIOS + '/curso/' + curso._id;
    url += '?token=' + this._usuarioService.token;
    return this.http.put(url,curso).pipe(map((resp: any) => {
    resp.curso;
    swal('Curso Actualizado',curso.nombre, 'success');
    })
    )

  }

}
