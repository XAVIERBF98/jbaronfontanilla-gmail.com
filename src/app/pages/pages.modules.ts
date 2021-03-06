import { NgModule } from '@angular/core';
//Modules
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';

import { FormsModule } from '@angular/forms';

//ng-2charts
import { ChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
//Temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
//Pipes Module
import { PipesModule } from '../pipes/pipes.module';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { CursosComponent } from './cursos/cursos.component';
import { ProfesoresComponent } from './profesores/profesores.component';
import { ProfesorComponent } from './profesores/profesor.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { ExamenesComponent } from './examenes/examenes.component';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { ExamenComponent } from './examen/examen.component';
import { PreguntaComponent } from './pregunta/pregunta.component';
import { ViewPreguntasComponent } from './view-preguntas/view-preguntas.component';
import { AllExamComponent } from './all-exam/all-exam.component';
import { LiveTestComponent } from './live-test/live-test.component';

@NgModule({
declarations: [
   PagesComponent,
   DashboardComponent,
   ProgressComponent,
   Graficas1Component,
   IncrementadorComponent,
   GraficoDonaComponent,
   AccountSettingsComponent,
   PromesasComponent,
   RxjsComponent,
   ProfileComponent,
   UsuariosComponent,
   ModalUploadComponent,
   CursosComponent,
   ProfesoresComponent,
   ProfesorComponent,
   BusquedaComponent,
   ExamenesComponent,
   PreguntasComponent,
   ExamenComponent,
   PreguntaComponent,
   ViewPreguntasComponent,
   AllExamComponent,
   LiveTestComponent,
],
exports: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
],
imports: [
    CommonModule,
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ChartsModule,
    PipesModule
]
})
export class PageModule { }
