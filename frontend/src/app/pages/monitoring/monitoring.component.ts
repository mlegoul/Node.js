import {Component, OnDestroy, OnInit} from '@angular/core';
import {RssFeedService} from '../../services/rss-feed.service';
import {take, tap} from 'rxjs/operators';
import {JsonModel} from '../../models/json-model';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent implements OnInit, OnDestroy {

  showAlterMessage: boolean = true;
  jsonModelElement: JsonModel[];

  constructor(
    private rssFeedService: RssFeedService,
  ) {
  }

  ngOnInit(): void {
    this.getDataFromRssFeedService();
  }

  ngOnDestroy(): void {
    this.getDataFromRssFeedService().unsubscribe();
  }

  hiddenAlertMessage() {
    setTimeout(() => {
      this.showAlterMessage = false;
    }, 5000)
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
