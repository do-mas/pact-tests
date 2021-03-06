import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductsService} from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  title = 'app';

  ngOnInit(): void {
    this.userService.getList();
  }

  constructor(private userService: ProductsService) {
  }

}
