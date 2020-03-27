import {Component, OnInit} from '@angular/core';
import {RssFeedService} from '../../services/rss-feed.service';
import {take, tap} from 'rxjs/operators';
import {JsonModel} from '../../models/json-model';
import {element} from 'protractor';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent implements OnInit {

  jsonModelElement: JsonModel[];

  constructor(
    private rssFeedService: RssFeedService,
  ) {
  }

  ngOnInit(): void {
    this.getDataFromRssFeedService();
  }

  getDataFromRssFeedService() {
    return this.rssFeedService.apiGetRequest$()
      .pipe(
        take(1),
        tap((data) => this.jsonModelElement = Object.values(data)),
        tap(x => console.log(x)),
      )
      .subscribe()
  }
}
