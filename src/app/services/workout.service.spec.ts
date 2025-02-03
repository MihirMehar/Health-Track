import { TestBed } from '@angular/core/testing';
import { WorkoutService } from './workout.service';

describe('WorkoutService', () => {
  let service: WorkoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutService);
    localStorage.clear(); // Clear localStorage before each test to ensure isolation
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should add a workout', () => {
    const workout = { id: 1, name: 'Cycling', workoutType: 'Cycling', minutes: 30 };
    service.addWorkout(workout);

    const workouts = service.getWorkouts();
    expect(workouts).toContain(jasmine.objectContaining(workout));
  });

  interface Workout {
    id: number;
    name: string;
    workoutType: string;
    minutes: number;
  }
  
  it('should not add a duplicate workout', () => {
    const workout: Workout = { id: 1, name: 'Cycling', workoutType: 'Cycling', minutes: 30 };
    
    service.addWorkout(workout);
    service.addWorkout(workout); // Try to add the same workout again
    
    const workouts: Workout[] = service.getWorkouts();
    const count = workouts.filter((w) => w.id === workout.id).length;
    
    expect(count).toBe(1);
  });
  

  it('should delete a workout', () => {
    const workout = { id: 1, name: 'Cycling', workoutType: 'Cycling', minutes: 30 };
    service.addWorkout(workout);
    service.deleteWorkout(0);  // Delete the first workout
    expect(service.getWorkouts()).not.toContain(workout);
  });

  it('should update a workout', () => {
    const workout = { id: 1, name: 'Cycling', workoutType: 'Cycling', minutes: 30 };
    service.addWorkout(workout);

    const updatedWorkout = { id: 1, name: 'Running', workoutType: 'Running', minutes: 45 };
    service.updateWorkout(1, updatedWorkout);

    expect(service.getWorkouts()).toContain(updatedWorkout);
    expect(service.getWorkouts()).not.toContain(workout);
  });

  it('should not update a workout that does not exist', () => {
    const workout = { id: 1, name: 'Cycling', workoutType: 'Cycling', minutes: 30 };
    service.addWorkout(workout);

    const updatedWorkout = { id: 2, name: 'Running', workoutType: 'Running', minutes: 45 };
    service.updateWorkout(2, updatedWorkout);  // Try to update a non-existent workout

    expect(service.getWorkouts()).not.toContain(updatedWorkout);  // Ensure the workout is not updated
  });
});
