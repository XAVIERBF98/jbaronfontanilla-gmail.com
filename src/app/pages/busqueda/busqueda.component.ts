import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from '../../models/usuario.model';
import { Profesor } from '../../models/profesor.model';
import { Curso } from 'src/app/models/curso.model';


@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  profesores: Profesor[] = [];
  cursos: Curso[] = [];
  
  constructor(public _usuarioService:UsuarioService,
             public activatedRoute:ActivatedRoute,
             public http:HttpClient
    ) {
      activatedRoute.params.subscribe(params => {
        let termino = params['termino'];
        this.buscar(termino);
      });

     }

  ngOnInit() {
  }

buscar(termino: string){
let url = URL_SERVICIOS + '/busqueda/todo/' + termino;
   return this.http.get(url).subscribe((resp: any) =>{ 
   console.log(resp);
   this.cursos = resp.cursos;
   this.profesores = resp.profesores;
   this.usuarios = resp.usuarios;
  }
    );
}

}
