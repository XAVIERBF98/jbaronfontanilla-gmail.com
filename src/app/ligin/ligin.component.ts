import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare function init_Plugins();
@Component({
  selector: 'app-ligin',
  templateUrl: './ligin.component.html',
  styleUrls: ['./ligin.component.css']
})
export class LiginComponent implements OnInit {

  constructor(public router: Router) {  }

  ngOnInit() {
    init_Plugins();
  }
ingresar() {
  this.router.navigate(['/dashboard']);
}
}
