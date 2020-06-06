import { Component, OnInit } from '@angular/core';
import { Test } from 'src/app/models/Quiz.model';
import { ExamenService } from 'src/app/services/service.index';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styles: []
})

export class PreguntasComponent implements OnInit {

  desde: number = 0;
  examenes: Test[] = [];
  constructor(public _examenService:ExamenService,
    ) { }

  ngOnInit() {
    this.cargarExamenes();
  }

  //Cargar Cursos
  cargarExamenes(){
    this._examenService.cargarExamenes(this.desde).subscribe(examenes => {this.examenes = this.examenes= examenes });
  }

}
