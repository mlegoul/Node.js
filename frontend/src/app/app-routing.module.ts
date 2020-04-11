import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginGuard} from './guards/login.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },

  {
    path: 'login',
    canActivate: [LoginGuard],
    loadChildren: () => import('./authentication/login/login.module').then(m => m.LoginModule),
  },

  {
    path: '',
    loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
