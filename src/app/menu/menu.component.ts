import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import {DishService} from '../services/dish.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishes: Dish[];

  selectedDish: Dish;

  constructor(private dishService: DishService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.dishes = this.dishService.getDishes();
  }

  // tslint:disable-next-line:typedef
  onSelect(dish: Dish){
    this.selectedDish = dish;
  }

}
