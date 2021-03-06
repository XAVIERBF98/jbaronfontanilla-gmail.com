import { Component, OnInit } from '@angular/core';
import { ExamenService } from '../../services/examen/examen.service';
import { Test } from '../../models/Quiz.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {
  totalExamenes: number = 0;
  desde: number = 0;
  examenes:Test[]=[]

  constructor(public _examenService: ExamenService) { }

  ngOnInit() {
    this.cargarExamenes();
  }

  cargarExamenes() {
    this._examenService.cargarExamenesAll().subscribe(examenes => {  
      console.log(examenes)
      this.examenes = this.examenes = examenes });
  }

}
