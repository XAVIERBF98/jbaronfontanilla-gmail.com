import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SettingsService, SidebarService, SharedService, UsuarioService} from './service.index';
import { HttpClientModule } from '@angular/common/http';
import { LoginGuardGuard } from './guards/login-guard.guard';
import { SubirArchivoService } from './service.index';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import { CursoService } from './service.index';
import { ProfesorService } from './profesor/profesor.service';
import { AdminGuard } from './guards/admin.guard';
import { ExamenService } from './service.index';
import { PreguntaService } from './pregunta/pregunta.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ], providers:[
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    LoginGuardGuard,
    SubirArchivoService,
    ModalUploadService,
    CursoService,
    ProfesorService,
    AdminGuard,
    ExamenService,
    PreguntaService
  ]
})
export class ServiceModule { }
