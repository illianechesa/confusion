import { Component, Inject, OnInit } from '@angular/core';
import { expand, flyInOut } from '../animations/app.animation';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [
    flyInOut(),
    expand(),
  ]
})
export class AboutComponent implements OnInit {

  constructor(private leaderService: LeaderService,
              @Inject('baseURL') private baseURL) { }

  leaders: Leader[];
  leaderErrMess: string;

  ngOnInit(): void {
    this.leaderService.getLeaders().subscribe(leaders => this.leaders = leaders, errmess => this.leaderErrMess = (errmess as any));
  }

}
