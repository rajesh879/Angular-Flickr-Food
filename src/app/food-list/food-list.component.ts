import { Component, OnInit } from '@angular/core';
import { FlickrService } from '../flickr.service';
import { RatingService } from '../rating.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent implements OnInit {

  public foodList: any = [];
  public pageNumber: number = 1;

  constructor(private _flickrService: FlickrService,private _ratingService: RatingService,private router: Router) { }

  ngOnInit() {
    this.getFoodList();
  }

  getFoodList() {
   
    this._flickrService.getDishPics().subscribe(result => {
      this.foodList = result.photos.photo;
    })
  }

  getImageUrl(list:any): string {
    return this._flickrService.formFlickrData(list);
  }

  checkAlreadyReviewed(id:string): number {
    return this._ratingService.getInitialStars(id);
  }

  foodSelected(list:any) {
    this._ratingService.updateChosenFood(list);
    this.router.navigate(['/item']);
  }

}
