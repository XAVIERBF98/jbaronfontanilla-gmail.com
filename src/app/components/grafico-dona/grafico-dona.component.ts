import { Component, OnInit, Input } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  @Input('ChartLabels') doughnutChartLabels: Label[] = [];
  @Input('ChartData') doughnutChartData: MultiDataSet = [];
  @Input('ChartType') doughnutChartType: ChartType = 'doughnut';
  constructor() { }

  ngOnInit() {
  }

}
