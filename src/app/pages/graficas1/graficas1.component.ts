import { Component, OnInit } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-graficas1',
  templateUrl: './graficas1.component.html',
  styles: []
})
export class Graficas1Component implements OnInit {
  graficos: any = {
    'grafico1': {
     'labels': ['MatematicasI', 'MatematicasII', 'MatematicasIII'],
      'data':  [24, 30, 46],
      'type': 'doughnut',
      'leyenda': 'Aprobados en:'
    },
    'grafico2': {
      'labels': ['Hombres', 'Mujeres'],
      'data':  [40, 60],
      'type': 'doughnut',
      'leyenda': 'Examinados'
    },
    'grafico3': {
      'labels': ['Si', 'No'],
      'data':  [95, 5],
      'type': 'doughnut',
      'leyenda': 'Pasaron'
    },
    'grafico4': {
      'labels': ['No', 'Si'],
      'data':  [85, 15],
      'type': 'doughnut',
      'leyenda': 'Menos de 4'
    },
  };





  constructor() { }

  ngOnInit() {
  }

}
