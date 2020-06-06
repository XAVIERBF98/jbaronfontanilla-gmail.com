import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CursosComponent } from './cursos/cursos.component';
import { ProfesoresComponent } from './profesores/profesores.component';
import { ProfesorComponent } from './profesores/profesor.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../services/guards/admin.guard';
import { ExamenesComponent } from './examenes/examenes.component';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { ExamenComponent } from './examen/examen.component';
import { PreguntaComponent } from './pregunta/pregunta.component';
import { ViewPreguntasComponent } from './view-preguntas/view-preguntas.component';
import { AllExamComponent } from './all-exam/all-exam.component';
import { LiveTestComponent } from './live-test/live-test.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate:[LoginGuardGuard],
        children: [
            {path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'}},
            {path: 'progress', component: ProgressComponent, data: {titulo: 'Progress'}},
            {path: 'graficas1', component: Graficas1Component, data: {titulo: 'Gráficas'}},
            {path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
            {path: 'rxjs', component: RxjsComponent, data: {titulo: 'RxJs'}},
            {path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Ajustes del Tema'}},
            {path: 'perfil', component: ProfileComponent, data: {titulo: 'Pefil del Usuario'}},
            {path: 'busqueda/:termino', component: BusquedaComponent, data: {titulo: 'Buscador '}},
           //Examenes
           {path: 'examenes', component: ExamenesComponent, data: {titulo: 'Examenes'}},
           {path: 'examen/:id', component: ExamenComponent, data: {titulo: 'Actualizar Examen'}},
           {path: 'preguntas', component: PreguntasComponent, data: {titulo: 'Preguntas'}},
           {path: 'pregunta/:id', component: PreguntaComponent, data: {titulo: 'Actualizar Preguntas'}},
           {path: 'Viewpreguntas/:id', component: ViewPreguntasComponent, data: {titulo: 'Ver Preguntas'}},
           {path: 'liveExamen/:id', component: LiveTestComponent, data: {titulo: 'Presentar Examen'}},
           

           //TomarExamenes
           {path: 'AllTest', component: AllExamComponent, data: {titulo: 'Examenes Disponibles'}},
           

            //mantenimientos
            {path: 'usuarios',
             component: UsuariosComponent, 
             canActivate:[AdminGuard],
             data: {titulo: 'Mantenimiento de usuarios'}},
            
            {path: 'cursos', component: CursosComponent, data: {titulo: 'Mantenimiento de Cursos'}},
            {path: 'profesores', component: ProfesoresComponent, data: {titulo: 'Mantenimiento de Profesores'}},
            {path: 'profesor/:id', component: ProfesorComponent, data: {titulo: 'Actualizar Profesor'}},
            {path: '', redirectTo: '/dashboard' , pathMatch: 'full'},
        ]
    }];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);




