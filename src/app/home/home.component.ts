import { Component, OnInit, Inject } from '@angular/core';
import {Dish} from '../shared/dish';
import {DishService} from '../services/dish.service';
import {Promotion} from '../shared/promotion';
import {PromotionService} from '../services/promotion.service';
import {Leader} from '../shared/leader';
import {LeaderService} from '../services/leader.service';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    flyInOut(),
    expand(),
  ]
})
export class HomeComponent implements OnInit {

  dish: Dish;
  dishErrMess: string;
  promotionErrMess: string;
  leaderErrMess: string;
  promotion: Promotion;
  leader: Leader;

  constructor(private dishService: DishService, private promotionService: PromotionService, private leaderService: LeaderService,
              @Inject('baseURL') private baseURL) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.dishService.getFeaturedDish().subscribe(dish => this.dish = dish, errmess => this.dishErrMess = (errmess as any));
    // tslint:disable-next-line:max-line-length
    this.promotionService.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion, errmess => this.promotionErrMess = (errmess as any));
    this.leaderService.getFeaturedLeader().subscribe(leader => this.leader = leader, errmess => this.leaderErrMess = (errmess as any));
  }

}
