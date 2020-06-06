import { ExamenService } from 'src/app/services/service.index';
import { PreguntaService } from './../../services/pregunta/pregunta.service';
import { Question } from './../../models/pregunta.model';
import { Component, OnInit } from '@angular/core';
import { Test } from '../../models/Quiz.model';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-live-test',
  templateUrl: './live-test.component.html',
  styleUrls: ['./live-test.component.css']
})
export class LiveTestComponent implements OnInit {
  examen:Test;
  pregunta:Question = new Question('','','','','','','');
  preguntas:Question[] = [];
  /**======================================================== */
 
score: number = 0;
wrongAns: number = 0;
skipped: number = 0 ;
useroptions=[];
testid: string;

o
  constructor(public router: Router,
    public activateRoute: ActivatedRoute,
    public _examService:ExamenService,
    public  _preguntaService:PreguntaService
  ) {
    activateRoute.params.subscribe(parametros => {
      let id = parametros['id'];
      if (id !== 'nuevo') {
        this.cargarExamenById(id);
        this.testid = id;
        console.log(this.testid)
      }
    })
  }
  ngOnInit() {
  }
  cargarExamenById(id: string) {
    this._examService.CargarExamById(id)
      .subscribe(quiz => {
        this.examen = quiz;
        this.preguntas = quiz.preguntas;
      });
  }

  submitAnswers=()=>{
    var performanceInfo={
      email:live.email,
      testid:live.testid,
      score:live.score,
      noOfQuestions:live.questions.length,
      timetaken:live.timetaken,
      totalCorrectAnswers:live.correctAns,
      totalSkipped:live.skipped
    }


}

guardarExamen(f: NgForm) {
  if (f.invalid) {
    return;
  }
  console.log(f.value)
}
}