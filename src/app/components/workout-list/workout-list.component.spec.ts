import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutListComponent } from './workout-list.component';
import { WorkoutService } from 'src/app/services/workout.service';
import { of } from 'rxjs';

describe('WorkoutListComponent', () => {
  let component: WorkoutListComponent;
  let fixture: ComponentFixture<WorkoutListComponent>;
  let workoutService: jasmine.SpyObj<WorkoutService>;

  beforeEach(async () => {
    const workoutServiceSpy = jasmine.createSpyObj('WorkoutService', ['getWorkouts', 'deleteWorkout', 'updateWorkout', 'addWorkout']);

    await TestBed.configureTestingModule({
      declarations: [ WorkoutListComponent ],
      providers: [
        { provide: WorkoutService, useValue: workoutServiceSpy }
      ]
    })
    .compileComponents();

    workoutService = TestBed.inject(WorkoutService) as jasmine.SpyObj<WorkoutService>;
    fixture = TestBed.createComponent(WorkoutListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load workouts on init', () => {
    const mockWorkouts = [{ id: 1, name: 'Cycling', workoutType: 'Cycling', minutes: 30 }];
    workoutService.getWorkouts.and.returnValue(mockWorkouts);
    
    component.ngOnInit();
    
    expect(component.workouts).toEqual(mockWorkouts);
    expect(component.totalWorkouts).toBe(1);
  });

  it('should delete a workout', () => {
    const mockWorkouts = [{ id: 1, name: 'Cycling', workoutType: 'Cycling', minutes: 30 }];
    
    workoutService.getWorkouts.and.returnValue(mockWorkouts);
    component.ngOnInit();
  
    spyOn(component, 'getWorkouts');  // Spy on getWorkouts
  
    component.deleteWorkout(mockWorkouts[0]);
  
    expect(workoutService.deleteWorkout).toHaveBeenCalledWith(0);
    expect(component.getWorkouts).toHaveBeenCalled();  // Ensure getWorkouts is called
  });
  

  it('should edit a workout', () => {
    const mockWorkout = { id: 1, name: 'Cycling', workoutType: 'Cycling', minutes: 30 };
    component.editWorkout(mockWorkout);
    
    expect(component.selectedWorkout).toEqual(mockWorkout);
  });

//   it('should submit edited workout', () => {
//     const mockWorkout = { id: 1, name: 'Cycling', workoutType: 'Cycling', minutes: 30 };
//     workoutService.updateWorkout.and.callFake(() => {}); // Mocking the update method
//     component.selectedWorkout = { ...mockWorkout }; // Ensure a fresh copy

//     component.submitEdit();

//     expect(workoutService.updateWorkout).toHaveBeenCalledWith(mockWorkout.id, mockWorkout);
//     expect(component.selectedWorkout).toBeNull();

//     // Verify that the workout is updated in the workouts array (ignoring additional properties)
//     expect(component.workouts).toContain(jasmine.objectContaining(mockWorkout));
// });

  it('should apply filters correctly', () => {
    const mockWorkouts = [
      { id: 1, name: 'Cycling', workoutType: 'Cycling', minutes: 30 },
      { id: 2, name: 'Running', workoutType: 'Running', minutes: 20 }
    ];
    workoutService.getWorkouts.and.returnValue(mockWorkouts);
    component.ngOnInit();

    component.filterName = 'Cycling';
    component.applyFilters();
    
    expect(component.filteredWorkouts.length).toBe(1);
  });

  // it('should paginate workouts correctly', () => {
  //   const mockWorkouts = [
  //     { id: 1, name: 'Cycling', workoutType: 'Cycling', minutes: 30 },
  //     { id: 2, name: 'Running', workoutType: 'Running', minutes: 20 },
  //     { id: 3, name: 'Swimming', workoutType: 'Swimming', minutes: 15 }
  //   ];
  //   workoutService.getWorkouts.and.returnValue(mockWorkouts);
  //   component.ngOnInit();

  //   component.paginate();
    
  //   expect(component.displayedWorkouts.length).toBe(3); // All workouts should be displayed on the first page
  // });
});
