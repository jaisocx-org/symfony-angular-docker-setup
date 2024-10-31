import { Component, OnInit} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgFor, NgIf } from '@angular/common'; // Import CommonModule
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api/api.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, NgIf, NgFor, RouterLink],
  providers: [ApiService, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent implements OnInit {
  title = 'Angular';
  apiJson: any | null = null;
  apiJson2: any | null = null;
  errorMessage = null;
  errorMessage2 = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getTestData().subscribe(
      (data: any) => {
        this.apiJson = data; // Assign the fetched data to the posts array
      },
      (error: any) => {
        this.errorMessage = error; // Handle the error message
      }
    );

    this.apiService.getSampleData().subscribe(
      (data: any) => {
        this.apiJson2 = data; // Assign the fetched data to the posts array
      },
      (error: any) => {
        this.errorMessage2 = error; // Handle the error message
      }
    );
  }
}

