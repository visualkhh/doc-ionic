import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/services/user.service';
import { UserDetail } from '../core/domain/UserDetail';
import {ApiService} from '../core/services/api.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',

    'build'
  ];
  public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor(private userService: UserService, private api: ApiService) {
    userService.getUserDetail().then((at: UserDetail) => {
      console.log(at);
    })
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
