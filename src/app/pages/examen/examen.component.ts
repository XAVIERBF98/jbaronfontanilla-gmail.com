import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ExamenService } from '../../services/examen/examen.service';
import { NgForm } from '@angular/forms';
import { Question } from '../../models/pregunta.model';
import { Test } from '../../models/Quiz.model';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styles: []
})

export class ExamenComponent implements OnInit {

  preguntas:Question[] = [];
  examenen: Test = new Test('', '', '', '', [],null,'');
  constructor( public router: Router,
              public activateRoute: ActivatedRoute,
              public _examService:ExamenService
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

  guardarExamen(f: NgForm) {
    if (f.invalid) {
      return;
    }
    this._examService.guardarExamen(this.examenen).
      subscribe(examen => {
        this.examenen._id = examen._id;
        this.router.navigate(['/examen', examen._id]);
      });
  }



  cargarExamenById(id: string) {
    this._examService.CargarExamById(id)
      .subscribe(quiz => {
        this.examenen = quiz;
      });
  }


}
