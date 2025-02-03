import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { WorkoutFormComponent } from './workout-form.component';
import { WorkoutService } from 'src/app/services/workout.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('WorkoutFormComponent', () => {
  let component: WorkoutFormComponent;
  let fixture: ComponentFixture<WorkoutFormComponent>;
  let workoutServiceMock: jasmine.SpyObj<WorkoutService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    workoutServiceMock = jasmine.createSpyObj('WorkoutService', ['addWorkout']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [WorkoutFormComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: WorkoutService, useValue: workoutServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.workoutForm).toBeDefined();
    expect(component.workoutForm.get('Name')?.value).toBe('');
    expect(component.workoutForm.get('minutes')?.value).toBe('');
    expect(component.workoutForm.get('cycling')?.value).toBe(false);
    expect(component.workoutForm.get('swimming')?.value).toBe(false);
    expect(component.workoutForm.get('yoga')?.value).toBe(false);
    expect(component.workoutForm.get('running')?.value).toBe(false);
  });

  it('should not add workout if form is invalid', () => {
    component.workoutForm.get('Name')?.setValue('');
    component.workoutForm.get('minutes')?.setValue('');
    fixture.detectChanges();

    component.addWorkout();
    expect(workoutServiceMock.addWorkout).not.toHaveBeenCalled();
  });

  it('should add workout successfully if form is valid', () => {
    component.workoutForm.get('Name')?.setValue('Cycling');
    component.workoutForm.get('minutes')?.setValue(30);
    component.workoutForm.get('cycling')?.setValue(true);
    fixture.detectChanges();

    component.addWorkout();
    expect(workoutServiceMock.addWorkout).toHaveBeenCalled();
    expect(workoutServiceMock.addWorkout).toHaveBeenCalledWith(jasmine.objectContaining({
      name: 'Cycling',
      workoutType: 'Cycling',
      minutes: 30
    }));
  });

  it('should display alert for invalid form submission (no workout type selected)', () => {
    spyOn(window, 'alert');
    component.workoutForm.get('Name')?.setValue('Cycling');
    component.workoutForm.get('minutes')?.setValue(30);
    fixture.detectChanges();

    component.addWorkout();
    expect(window.alert).toHaveBeenCalledWith('Please select at least one workout type!');
  });

  it('should reset form after successful submission', () => {
    // Set values for the form
    component.workoutForm.get('Name')?.setValue('Cycling');
    component.workoutForm.get('minutes')?.setValue(30);
    component.workoutForm.get('cycling')?.setValue(true);
    fixture.detectChanges();
  
    // Call the addWorkout method
    component.addWorkout();
  
    // Check if the form has been reset
    expect(component.workoutForm.get('Name')?.value).toBe('');
    expect(component.workoutForm.get('minutes')?.value).toBe('');
    expect(component.workoutForm.get('cycling')?.value).toBe(false);
    expect(component.workoutForm.get('swimming')?.value).toBe(false);
    expect(component.workoutForm.get('yoga')?.value).toBe(false);
    expect(component.workoutForm.get('running')?.value).toBe(false);
  });
  
});
