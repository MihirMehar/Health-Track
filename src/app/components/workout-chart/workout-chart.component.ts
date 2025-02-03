import { Component, OnInit } from '@angular/core';
import { WorkoutService } from 'src/app/services/workout.service';  // Import the service

@Component({
  selector: 'app-workout-chart',
  templateUrl: './workout-chart.component.html',
  styleUrls: ['./workout-chart.component.scss'],
})
export class WorkoutChartComponent implements OnInit {
  // Chart properties
  chartType: 'bar' = 'bar';
  chartData: any[] = [];
  chartLabels: string[] = [];
  chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'top' },
      tooltip: {
        callbacks: {
          label: (context: { raw: any; }) => `Minutes: ${context.raw}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Minutes' },
      },
    },
  };

  // User selection and data
  users: string[] = [];
  selectedUser: string | null = null;
  workouts: any[] = [];

  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  // Loads unique user names from the workout data
  loadUsers(): void {
    this.workouts = this.workoutService.getWorkouts();
    this.users = Array.from(new Set(this.workouts.map((w) => w.name)));
  }

  // Called when the user selects a user
  onUserSelect(): void {
    if (this.selectedUser) {
      this.updateChartData();
    }
  }

  // Updates the chart data for the selected user
  updateChartData(): void {
    const userWorkouts = this.workouts.filter(w => w.name === this.selectedUser);

    // Group workouts by type and sum the minutes
    const workoutsByType = new Map<string, number>();
    userWorkouts.forEach(w => {
      const currentMinutes = workoutsByType.get(w.workoutType) || 0;
      workoutsByType.set(w.workoutType, currentMinutes + w.minutes);
    });

    // Prepare chart data
    const progress = Array.from(workoutsByType.entries()).map(([workoutType, minutes]) => ({
      workoutType,
      minutes,
    }));

    this.chartLabels = progress.map(p => p.workoutType);
    this.chartData = [
      {
        data: progress.map(p => p.minutes),
        label: 'Workout Duration (Minutes)',
        backgroundColor: 'rgba(66, 165, 245, 0.8)',
        borderColor: 'rgba(66, 165, 245, 1)',
        borderWidth: 1,
      },
    ];
  }
}
