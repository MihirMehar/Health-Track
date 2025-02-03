import { Component, OnInit } from '@angular/core';
import { WorkoutService } from 'src/app/services/workout.service';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.scss']
})
export class WorkoutListComponent implements OnInit {
  workouts: any[] = [];
  filteredWorkouts: any[] = [];
  displayedWorkouts: any[] = [];
  filterName: string = '';
  filterType: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalWorkouts: number = 0;
  selectedWorkout: any = null;
  uniqueWorkoutTypes: string[] = [];

  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.loadWorkouts();
    this.loadFilters();
  }

  // Load workouts and update filters
  loadWorkouts(): void {
    this.workouts = this.workoutService.getWorkouts();
    this.extractUniqueWorkoutTypes();
    this.applyFilters();
  }

  // Extract unique workout types for filter dropdown
  extractUniqueWorkoutTypes(): void {
    this.uniqueWorkoutTypes = [...new Set(this.workouts.map(w => w.workoutType))].filter(type => type !== '');
  }

  // Load filters from localStorage
  loadFilters(): void {
    const savedFilterType = localStorage.getItem('filterType');
    if (savedFilterType) {
      this.filterType = savedFilterType;
    }
  }

  // Apply filters to the workout list
  applyFilters(): void {
    let filtered = this.workouts.filter(workout => {
      const nameMatch = this.filterName ? workout.name.toLowerCase().includes(this.filterName.toLowerCase()) : true;
      const typeMatch = this.filterType ? workout.workoutType === this.filterType : true;
      return nameMatch && typeMatch;
    });

    this.filteredWorkouts = filtered;
    this.totalWorkouts = this.filteredWorkouts.length;
    this.paginate();
  }

  // Pagination logic
  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = this.currentPage * this.itemsPerPage;
    this.displayedWorkouts = this.filteredWorkouts.slice(startIndex, endIndex);
  }

  // Navigate to the next page
  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.totalWorkouts) {
      this.currentPage++;
      this.paginate();
    }
  }

  // Navigate to the previous page
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginate();
    }
  }

  // Search by name
  onSearch(): void {
    this.applyFilters();
  }

  // Filter by workout type and store it in localStorage
  onFilterByType(): void {
    localStorage.setItem('filterType', this.filterType);
    this.applyFilters();
  }

  // Delete a workout and refresh the list
  deleteWorkout(workout: any): void {
    this.workoutService.deleteWorkout(workout.id);
    this.loadWorkouts();
  }

  // Select a workout for editing
  editWorkout(workout: any): void {
    this.selectedWorkout = { ...workout };
  }

  // Submit an edited workout
  submitEdit(): void {
    if (!this.selectedWorkout) return;
    this.workoutService.updateWorkout(this.selectedWorkout.id, this.selectedWorkout);
    this.selectedWorkout = null;
    this.loadWorkouts();
  }

  // Cancel editing
  cancelEdit(): void {
    this.selectedWorkout = null;
  }
}
