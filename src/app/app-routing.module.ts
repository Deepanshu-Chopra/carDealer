import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DealersComponent } from './dealers/dealers.component';
import { CarComponent } from './car/car.component';

const routes: Routes = [
  {
    path: '',
    component: DealersComponent
  },
  {
    path:'cars/:id',
    component: CarComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
