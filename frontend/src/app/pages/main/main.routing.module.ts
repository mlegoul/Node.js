import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './main.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../home/home.module').then(m => m.HomeModule),
      },
      {
        path: 'about-me',
        loadChildren: () => import('../about-me/about-me.module').then(m => m.AboutMeModule),
      },
      {
        path: 'monitoring',
        loadChildren: () => import('../monitoring/monitoring.module').then(m => m.MonitoringModule),
      },
      {
        path: 'contact',
        loadChildren: () => import('../contact/contact.module').then(m => m.ContactModule),
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
