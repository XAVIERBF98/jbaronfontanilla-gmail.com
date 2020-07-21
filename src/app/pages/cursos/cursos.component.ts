import { Component, OnInit } from '@angular/core';
import { Curso } from '../../models/curso.model';
import { CursoService } from 'src/app/services/service.index';
import swal from 'sweetalert';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styles: []
})
export class CursosComponent implements OnInit {

  cursos: Curso[] = [];
  desde: number = 0;
  constructor(public _cursoService:CursoService,
              public _modalUploadService:ModalUploadService
    ) { }

  ngOnInit() {
    this.cargarCursos();
    this._modalUploadService.notificacion.subscribe(()=>this.cargarCursos());
  }
  
  //Bucar Curos por Termino
  buscarCurso(termino: string){

    if(termino.length <= 0 ){
      this.cargarCursos();
      return;
    }

    this._cursoService.buscarCurso(termino)
    .subscribe(cursos => this.cursos = cursos);

  }

  //Cargar Cursos
  cargarCursos(){
    this._cursoService.cargarCursos(this.desde).subscribe(cursos => {this.cursos = cursos });
  }
  guardarCurso(curso: Curso){
  this._cursoService.actualizarCurso(curso).subscribe(() => this.cargarCursos());
  }
  borrarCurso(curso: Curso){
  this._cursoService.borrarCurso(curso._id).subscribe(() => this.cargarCursos());
  }

  crearCurso(){
    swal({
      title: 'Crear Curso',
      text:'Ingrese el nombre del Curso',
      //content: "input",
      icon: 'info',
      buttons: [true,'true'],
      dangerMode:true
    }).then( (valor: string) => {
      if(!valor || valor.length==0){
        return;
      }
      this._cursoService.crearCurso(valor)
      .subscribe(() => this.cargarCursos());
    })
  }
  
  actualizarImage(curso: Curso){
    this._modalUploadService.mostrarModal('cursos',curso._id);
  }


  cambiarDesde(valor: number) {
    let desde = this.desde + valor;
    if (desde >= this._cursoService.totalCursos) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarCursos();
  }

  
}
