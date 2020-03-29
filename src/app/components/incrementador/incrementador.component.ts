import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtprogress', {static: false}) txtProgress: ElementRef;

  @Input('nombre') leyenda: string = 'Leyenda ';
  @Input() progreso: number = 50;

  @Output('ActualizarValor') cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {
    console.log(this.leyenda );
    console.log(this.progreso);
}
  ngOnInit() {
  }

  onChanges(newValue: number) {


if (newValue >= 100) {
      this.progreso = 100;
    } else if (newValue <= 0) {
      this.progreso = 0;
    } else {
    this.progreso = newValue;
  }
this.txtProgress.nativeElement.value = Number(this.progreso);
this.cambioValor.emit(this.progreso);
this.txtProgress.nativeElement.focus();
  }

  cambiarValor(valor: number ) {
    if (this.progreso >= 100 && valor > 0) {
      this.progreso = 100;
      return;
    }
    if (this.progreso <= 0  && valor < 0) {
      this.progreso = 0;
      return;
    }
    this.progreso = this.progreso + valor;

    this.cambioValor.emit(this.progreso);
    }
}
