import { Component, OnInit } from '@angular/core';
import { FlickrService } from '../flickr.service';
import { RatingService } from '../rating.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-food-details',
  templateUrl: './food-details.component.html',
  styleUrls: ['./food-details.component.css']
})
export class FoodDetailsComponent implements OnInit {

  public subscriber: Subscription;
  public chosenFood: any = {};
  public userReview: any = {};
  public initialStars: number = 0;

  constructor(private _ratingService: RatingService, private _flickrService: FlickrService) { }

  ngOnInit() {
    if(localStorage.getItem('pid'+this._ratingService.chosenFood.id)!=null)
     {
      this.userReview = JSON.parse(localStorage.getItem('pid'+this._ratingService.chosenFood.id));
      this.initialStars = this.userReview.reviewStars;
     }
   
    this._flickrService.getDishInfo(this._ratingService.chosenFood.id).subscribe(result => {
      this.chosenFood = result.photo;
      console.log(this.chosenFood);
    },error => {
      console.log(error);
    });

  }

  getImageUrl() {
    return this._flickrService.formFlickrData(this.chosenFood);
  }

  onRatingSet(stars:any) {
    this.userReview.reviewStars = stars;
  }

  createPhotoReview() {
    console.log(this.userReview);

    if(this.userReview["reviewText"] || this.userReview["reviewText"].length!==0) {
      localStorage.setItem('pid'+this.chosenFood.id,JSON.stringify(this.userReview));
      this._flickrService.createToast("Review added successfully","green");
    }
    else {
      this._flickrService.createToast("Please provide your Review","red");
    }
  }
}
