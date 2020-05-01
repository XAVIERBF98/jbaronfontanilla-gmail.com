import { Component, OnInit } from '@angular/core';
import { Profesor } from '../../models/profesor.model';
import { ProfesorService } from '../../services/profesor/profesor.service';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styles: []
})
export class ProfesoresComponent implements OnInit {
  desde: number = 0;
  profesores: Profesor[] = [];
  constructor(
    public _profesorService: ProfesorService
  ) { }

  ngOnInit() {
    this.cargarProfesores();
  }
  buscarProfesor(termino: string) {
    if(termino.length <=0 ){
      this.cargarProfesores();
      return;
    }
    this._profesorService.buscarProfesor(termino).subscribe(
      profesores => {
        this.profesores = profesores;
            })
  }
 cargarProfesores(){
   this._profesorService.cargarProfesores(this.desde).subscribe(profesores=>{
     this.profesores = profesores;
   });
 }

 

 borrarProfesor(profesor: Profesor){
this._profesorService.borrarProfesor(profesor._id).subscribe(() => this.cargarProfesores());
 }

 cambiarDesde(valor: number) {
  let desde = this.desde + valor;
  if (desde >= this._profesorService.totalProfesores) {
    return;
  }
  if (desde < 0) {
    return;
  }
  this.desde += valor;
  this.cargarProfesores();
}

}
