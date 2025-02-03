import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WorkoutService } from 'src/app/services/workout.service';

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.scss']
})
export class WorkoutFormComponent implements OnInit {
  workoutForm!: FormGroup;

  constructor(private fb: FormBuilder, private workoutService: WorkoutService, private router: Router) { }

  ngOnInit(): void {
    this.workoutForm = this.fb.group({
      Name: ['', [Validators.required]],
      cycling: [false],
      swimming: [false],
      yoga: [false],
      running: [false],
      minutes: ['', [Validators.required, Validators.min(1)]]
    });
  }


  addWorkout(): void {
    const workoutName = this.workoutForm.get('Name')?.value;
    const workoutDuration = this.workoutForm.get('minutes')?.value;

    const workoutTypes = [];
    if (this.workoutForm.get('cycling')?.value) workoutTypes.push('Cycling');
    if (this.workoutForm.get('swimming')?.value) workoutTypes.push('Swimming');
    if (this.workoutForm.get('yoga')?.value) workoutTypes.push('Yoga');
    if (this.workoutForm.get('running')?.value) workoutTypes.push('Running');

    if (workoutTypes.length === 0) {
      alert("Please select at least one workout type!");
      return;
    }

    // Prepare the workout object with a unique ID
    const newWorkout = {
      id: Date.now(), // Unique ID
      name: workoutName,
      workoutType: workoutTypes.join(', '),
      minutes: workoutDuration
    };

    this.workoutService.addWorkout(newWorkout);
    alert("Workout Added Successfully!");
    // this.workoutForm.reset();
    this.workoutForm.reset({
      Name: '',
      cycling: false,
      swimming: false,
      yoga: false,
      running: false,
      minutes: ''
    });

  }
}
