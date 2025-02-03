import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkoutFormComponent } from './components/workout-form/workout-form.component';
import { WorkoutListComponent } from './components/workout-list/workout-list.component';
import { WorkoutChartComponent } from './components/workout-chart/workout-chart.component';

const routes: Routes = [
  { path: '', redirectTo: 'workout-form', pathMatch: 'full' }, // Redirect to form by default
  { path: 'workout-form', component: WorkoutFormComponent },
  { path: 'workout-list', component: WorkoutListComponent },
   {path:'workout-chart',component:WorkoutChartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
