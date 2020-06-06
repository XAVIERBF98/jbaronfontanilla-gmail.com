import { Component, OnInit } from '@angular/core';
import { Test } from 'src/app/models/Quiz.model';
import { ExamenService } from 'src/app/services/service.index';

@Component({
  selector: 'app-all-exam',
  templateUrl: './all-exam.component.html',
  styleUrls: ['./all-exam.component.css']
})
export class AllExamComponent implements OnInit {
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