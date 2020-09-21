import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';

import { Feedback, ContactType } from '../shared/feedback';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fromEventPattern } from 'rxjs';
import { flyInOut, visibility, expand } from '../animations/app.animation';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [
    flyInOut(),
    visibility(),
    expand(),
  ]
})

export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishcopy: Dish;
  errMess: string;
  dishIds: string[];
  prev: string;
  next: string;
  comment: Comment;

  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
  visibility = 'shown';


  @ViewChild('fform') feedbackFormDirective;

  formErrors = {
    author: '',
    rating: '',
    comment: '',
  };

  validationMessages = {
    author: {
      required:      'Name is required.',
      minlength:     'Name must be at least 2 characters long.',
      maxlength:     'Name cannot be more than 25 characters long.'
    },
    rating: {
      required:      'Number between 0 and 5 is required.',
      maxlength:     'Rating cannot be more than 1 character long.',
      pattern:       'Number between 0 and 5 is required.'
    },
    comment: {
      required:      'Comment is required.',
      pattern:       'Comment must contain only numbers.'
    },
  };


  constructor(private dishservice: DishService, private route: ActivatedRoute, private location: Location, private fb: FormBuilder,
              @Inject('baseURL') private baseURL) {
    this.createForm();
   }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    // tslint:disable-next-line:no-string-literal
    this.route.params
    // tslint:disable-next-line:no-string-literal
    .pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishservice.getDish(+params['id']); }))
    .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; },
      errmess => this.errMess = (errmess as any));
  }

  // tslint:disable-next-line:typedef
  createForm() {
    this.feedbackForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      rating: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(1)] ],
      comment: ['', [Validators.required, Validators.pattern] ],
    });

    this.feedbackForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); //
    }

    // tslint:disable-next-line:typedef
    onValueChanged(data?: any) {
      if (!this.feedbackForm) { return; }
      const form = this.feedbackForm;
      for (const field in this.formErrors) {
        if (this.formErrors.hasOwnProperty(field)) {
          // clear previous error message (if any)
          this.formErrors[field] = '';
          const control = form.get(field);
          if (control && control.dirty && !control.valid) {
            const messages = this.validationMessages[field];
            for (const key in control.errors) {
              if (control.errors.hasOwnProperty(key)) {
                this.formErrors[field] += messages[key] + ' ';
              }
            }
          }
        }
      }
    }

    // tslint:disable-next-line:typedef
    onSubmit() {
      this.comment = this.feedbackForm.value;
      this.comment.date = new Date().toISOString();
      this.dish.comments.push(this.comment);
      this.dishcopy.comments.push(this.comment);
      this.dishservice.putDish(this.dishcopy)
        .subscribe(dish => {
          this.dish = dish; this.dishcopy = dish;
        },
        errmess => { this.dish = null; this.dishcopy = null; this.errMess = (errmess as any); });
      console.log(this.comment);
      this.feedbackForm.reset({
        author: '',
        rating: '',
        comment: '',
      });
      this.feedbackFormDirective.resetForm();
    }
  // tslint:disable-next-line:typedef
  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

}
