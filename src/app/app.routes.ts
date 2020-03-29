import { RouterModule, Routes, Router } from '@angular/router';
import { LiginComponent } from './ligin/ligin.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { RegisterComponent } from './ligin/register.component';
const appRoutes: Routes = [
    {path: 'login', component: LiginComponent},
    {path: 'register', component: RegisterComponent},
    {path: '**', component: NopagefoundComponent},
];
export const APP_ROUTES = RouterModule.forRoot(appRoutes, {useHash: true});