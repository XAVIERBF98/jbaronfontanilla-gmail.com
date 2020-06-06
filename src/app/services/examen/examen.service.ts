import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { Test } from '../../models/Quiz.model';
import  swal from 'sweetalert';

@Injectable()
export class ExamenService {
  totalExamenes: number = 0;
  constructor(public http: HttpClient) { }





//Cargar Examenes
cargarExamenes(desde: number = 0) {
  let url = URL_SERVICIOS + '/quiz?desde=' + desde;
  return this.http.get(url).pipe(map(
    (resp: any) => {
      this.totalExamenes = resp.total;
      return resp.quizes;
    }
  ));
}

//Guardar Examen
guardarExamen(examen: Test) {
  let url = URL_SERVICIOS + '/quiz';
  if (examen._id) {
    url += '/'+ examen._id;
    return this.http.put(url, examen).pipe(map((resp:any)=>{
      swal('Examen Actualizado', examen.titulo , 'success');
      return resp.quiz;
    }));
  } else {
        return this.http.post(url, examen).pipe(map((resp: any) => {
      swal('Examen Creado' + examen.titulo + " success");
      return resp.quiz;
    }));
  }
}



CargarExamById(id: string) {
  let url = URL_SERVICIOS + '/quiz/' + id;
  return this.http.get(url).pipe(
    map((resp: any) => {
      return resp.quiz;
    })
  );
}

cargarExamenesAll(){
  let url = URL_SERVICIOS + '/quiz/All';
  return this.http.get(url).pipe(map(
    (resp: any) => {
      this.totalExamenes = resp.total;
      return resp.quizes;
    }
  ));
}


}
