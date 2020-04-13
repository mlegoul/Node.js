import {Component, OnInit} from '@angular/core';
import {faGithub, faLinkedin, faTwitter} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  faTwitter = faTwitter;
  faGithub = faGithub;
  faLinkedIn = faLinkedin;

  BASE_URL_1 : string = 'https://github.com/mehdiLegoullon';

  constructor() {
  }

  ngOnInit(): void {

  }

}
