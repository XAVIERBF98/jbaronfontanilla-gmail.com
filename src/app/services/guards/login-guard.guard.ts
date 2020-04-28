import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()

export class LoginGuardGuard implements CanActivate {
  constructor(public _usuarioService: UsuarioService,
              public  router: Router){  }
  canActivate() {
    if(this._usuarioService.estaLogueado()){
    console.log('Paso por el Login Guard');
    return true;
  } else {
    console.log('Bloqueado');
    this.router.navigate(['/login']);
    return false;
  }
  }

}
