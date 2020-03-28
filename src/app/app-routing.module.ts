import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FoodListComponent } from './food-list/food-list.component';
import { FoodDetailsComponent } from './food-details/food-details.component';

const routes: Routes = [
	
	{
    path: "foodlist",
    component: FoodListComponent
  },
  {
    path: "",
    redirectTo: "/foodlist",
    pathMatch: "full"
  },
  {
    path: "item",
    component: FoodDetailsComponent
  },
  { path:'**' ,
  redirectTo: '/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
