import { Component } from '@angular/core';
import { UpgradeModule } from '@angular/upgrade/static';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  title = 'ng52';

  ngOnInit() {
    this.upgrade.bootstrap(document.body, ['myApp'])
  }

  constructor(private upgrade: UpgradeModule) { }
}
