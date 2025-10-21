import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WeatherService } from './weather';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  city = 'Budapest';
  temperature: number | null = null;
  loading = false;
  error = '';

  constructor(private weatherService: WeatherService) {}

  getWeather()
  {
    const lat = 47.4979;
    const lon = 19.0402;

    this.loading = true;
    this.error = '';
    this.temperature = null;

    this.weatherService.getWeather(lat, lon).subscribe({
      next: (res) => {
        console.log('Weather data:', res);
        this.temperature = res.current_weather.temperature;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error:', err);
        this.error = 'Failed to fetch weather';
        this.loading = false;
      }
    });
  }
}
