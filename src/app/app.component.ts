import {Component, OnInit} from '@angular/core';
import {Router, RouterModule, RouterOutlet} from '@angular/router';
import {fromEvent, Observable, Subscription} from "rxjs";
import {DexieService} from './service/dexie.service';
import {UserService} from './service/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  onlineEvent!: Observable<Event>;
  subscriptions: Subscription[] = [];
  title = 'pwa-project';

  constructor(private dexieService: DexieService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.handleAppConnectivityChanges();
  }

  private handleAppConnectivityChanges(): void {
    this.onlineEvent = fromEvent(window, 'online');
    this.subscriptions.push(this.onlineEvent.subscribe(e => {
// handle online mode
      console.log('Online...');
      const users = this.dexieService.users.toArray().then(
        users => {
          for (var user of users) {
            this.userService.createUser(user).subscribe(
              (data) => alert(data.message),
              (error) => console.error(error)
            )
          }
        }
      );
      this.dexieService.users.clear().then(
        (success) => console.log("cleared database")
      );
    }));
  }
}
