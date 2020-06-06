import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { Question } from '../../models/pregunta.model';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {

  constructor(public http: HttpClient) { }


  CrearPregunta(pregunta: Question, id: string) {
    let url = URL_SERVICIOS + '/quiz/' + id;
    url += '/addQuestion';

    return this.http.post(url, pregunta).pipe(map((res: any) => {
      swal('Pregunta Creada del examen   ', res.quiz.titulo , "success");
      console.log(res)
      return res.quiz;
    }));
  }

}
