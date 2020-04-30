import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {
    let url= URL_SERVICIOS + '/file';
    if (!img) {
      return url + 'usuarios/xx';
    }
    if (img.indexOf('https') >= 0 ) {
      return img;
    }
    switch(tipo) {
      case 'usuario':
         url + '/usuarios' + img;
        break;
        case 'profesor':
           url + '/profesores' + img;
        break;
        case 'curso':
           url + '/cursos' + img;
        break;
        default:
          console.log('tipo de imagen no existe');
          url + 'usuarios/xx';
    }
    return url;
  }

}
