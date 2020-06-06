import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamenService } from '../../services/examen/examen.service';
import { PreguntaService } from '../../services/pregunta/pregunta.service';
import { Test } from 'src/app/models/Quiz.model';

@Component({
  selector: 'app-view-preguntas',
  templateUrl: './view-preguntas.component.html',
  styleUrls: ['./view-preguntas.component.css']
})
export class ViewPreguntasComponent implements OnInit {
  examen:Test;
  constructor( public activateRoute: ActivatedRoute,
    public _examService:ExamenService,
    public  _preguntaService:PreguntaService) { activateRoute.params.subscribe(parametros => {
      let id = parametros['id'];
      if (id !== 'nuevo') {
        this.cargarExamenById(id);
      }
    })}

  ngOnInit() {
  }
  cargarExamenById(id: string) {
    this._examService.CargarExamById(id)
      .subscribe(quiz => {
        this.examen = quiz;
      });
  }
}
