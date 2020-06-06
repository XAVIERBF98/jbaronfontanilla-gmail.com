import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamenService } from '../../services/examen/examen.service';
import { Test } from '../../models/Quiz.model';
import { NgForm } from '@angular/forms';
import { PreguntaService } from '../../services/pregunta/pregunta.service';
import { Question } from '../../models/pregunta.model';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styles: []
})
export class PreguntaComponent implements OnInit {

  examen:Test;
  pregunta:Question = new Question('','','','','','','');
  constructor(public router: Router,
    public activateRoute: ActivatedRoute,
    public _examService:ExamenService,
    public  _preguntaService:PreguntaService
  ) {
    activateRoute.params.subscribe(parametros => {
      let id = parametros['id'];
      if (id !== 'nuevo') {
        this.cargarExamenById(id);
      }
    })
  }
  ngOnInit() {
  }
  cargarExamenById(id: string) {
    this._examService.CargarExamById(id)
      .subscribe(quiz => {
        this.examen = quiz;
      });
  }

  guardarPregunta(f: NgForm) {
    if (f.invalid) {
      return;
    }
    this._preguntaService.CrearPregunta(this.pregunta,this.examen._id).
      subscribe(pregunta => {
        console.log(pregunta);
        this.pregunta._id = pregunta._id;
        this.router.navigate(['/preguntas']);
      });
  }
/**============================================= */
  
}
