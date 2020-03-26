import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MonitoringComponent} from './monitoring.component';
import {MonitoringRoutingModule} from './monitoring.routing.module';


@NgModule({
  declarations: [MonitoringComponent],
  imports: [
    CommonModule,
    MonitoringRoutingModule,
  ]
})
export class MonitoringModule {
}
