import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private workoutDataKey = 'workouts';

  constructor() {
    this.initializeStorage();
  }

  private initializeStorage(): void {
    if (!localStorage.getItem(this.workoutDataKey)) {
      localStorage.setItem(this.workoutDataKey, JSON.stringify([]));
    }
  }

  getWorkouts(): any[] {
    const workouts = localStorage.getItem(this.workoutDataKey);
    return workouts ? JSON.parse(workouts) : [];
  }

  addWorkout(workout: { id: number; name: string; workoutType: string; minutes: number }): void {
    const workouts = this.getWorkouts();
    
    // Ensure the ID is unique
    workout.id = this.generateUniqueId(workouts);

    workouts.push(workout);
    this.saveWorkouts(workouts);
  }

  deleteWorkout(id: number): void {
    let workouts = this.getWorkouts();
    workouts = workouts.filter(workout => workout.id !== id);
    this.saveWorkouts(workouts);
  }

  updateWorkout(id: number, updatedWorkout: any): void {
    let workouts = this.getWorkouts();
    const workoutIndex = workouts.findIndex(workout => workout.id === id);

    if (workoutIndex !== -1) {
      workouts[workoutIndex] = { ...workouts[workoutIndex], ...updatedWorkout };
      this.saveWorkouts(workouts);
    } else {
      console.error('Workout not found!');
    }
  }

  private saveWorkouts(workouts: any[]): void {
    localStorage.setItem(this.workoutDataKey, JSON.stringify(workouts));
  }

  private generateUniqueId(workouts: any[]): number {
    return workouts.length > 0 ? Math.max(...workouts.map(w => w.id)) + 1 : 1;
  }
}
