import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  public chosenFood: any = {};
  // private chosenFood = new Subject<any>();
  // public chosenFood$ = this.chosenFood.asObservable();

  constructor() { }

  updateChosenFood(food:any) {
    this.chosenFood = food;
  }

  getInitialStars(id:string): number {
    if(localStorage.getItem('pid'+id)!=null) {
      return JSON.parse(localStorage.getItem('pid'+id)).reviewStars;
    }
    else return 0;
  }
}
