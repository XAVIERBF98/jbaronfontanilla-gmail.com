import { Component, OnInit } from '@angular/core';
import { Test } from '../../models/Quiz.model';
import { ExamenService } from '../../services/examen/examen.service';

@Component({
  selector: 'app-examenes',
  templateUrl: './examenes.component.html',
  styles: []
})
export class ExamenesComponent implements OnInit {

  desde: number = 0;
  examenes: Test[] = [];
  constructor(public _examenService:ExamenService) { }

  ngOnInit() {
    this.cargarExamenes();
  }

  //Cargar Cursos
  cargarExamenes(){
    this._examenService.cargarExamenes(this.desde).subscribe(examenes => {this.examenes = this.examenes= examenes });
  }

  cambiarDesde(valor: number) {
    let desde = this.desde + valor;
    if (desde >= this._examenService.totalExamenes) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarExamenes();
}
}