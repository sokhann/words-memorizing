import {Component} from '@angular/core';
import {StateService} from './services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Words Memorizing';

  get langFrom(): string {
    return this.state.langFrom;
  }

  get langTo(): string {
    return this.state.langTo;
  }

  constructor(
    private readonly state: StateService,
  ) {}
}
