import { Component, Inject, OnInit } from '@angular/core';
import { flyInOut } from '../animations/app.animation';
import { DishService } from '../services/dish.service';
import { Dish } from '../shared/dish';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
    animations: [
      flyInOut()
    ]
})
export class MenuComponent implements OnInit {

  dishes: Dish[];

  selectedDish: Dish;

  errMess: string;

  constructor(private dishService: DishService,
              @Inject('baseURL') private baseURL) { }
  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.dishService.getDishes()
    .subscribe(dishes => this.dishes = dishes,
      errmess => this.errMess = (errmess as any));
  }

  // tslint:disable-next-line:typedef
  onSelect(dish: Dish){
    this.selectedDish = dish;
  }

}
