import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Curso } from 'src/app/models/curso.model';
import { ProfesorService } from '../../services/profesor/profesor.service';
import { CursoService } from '../../services/curso/curso.service';
import { Profesor } from 'src/app/models/profesor.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styles: []
})
export class ProfesorComponent implements OnInit {

  cursos: Curso[] = [];
  profesor: Profesor = new Profesor('', '', '', '', '');
  curso: Curso = new Curso('');
  constructor(
    public _profesorService: ProfesorService,
    public _cursoService: CursoService,
    public router: Router,
    public activateRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {
    activateRoute.params.subscribe(parametros => {
      let id = parametros['id'];
      if (id !== 'nuevo') {
        this.cargarProfesorById(id);
      }
    })
  }

  ngOnInit() {
    this._cursoService.cargarCursosAll().subscribe(cursos => { console.log(); this.cursos = cursos });
    this._modalUploadService.notificacion.subscribe(resp => {
      this.profesor.img = resp.profesor.img;
    })
  }

  guardarProfesor(f: NgForm) {
    if (f.invalid) {
      return;
    }
    this._profesorService.guardarProfesor(this.profesor).
      subscribe(profesor => {

        this.profesor._id = profesor._id;
        this.router.navigate(['/profesor', profesor._id])
      })
  }

  cambioCurso(id: string) {
    this._cursoService.obtenerCurso(id)
      .subscribe(curso => {
        this.curso = curso;

      });
  }

  cargarProfesorById(id: string) {
    this._profesorService.CargarProfesorById(id)
      .subscribe(profesor => {
        this.profesor = profesor
        this.profesor.curso = profesor.curso._id;
        this.cambioCurso(this.profesor.curso);
      });
  }
  //////////////////////////////////////////////////////////
  cambiarFoto() {
    this._modalUploadService.mostrarModal('profesores', this.profesor._id);
  }

}
