import { Component, Inject, OnInit } from '@angular/core';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { flyInOut, expand } from '../animations/app.animation';

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
