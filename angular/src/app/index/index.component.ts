import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './index.component.html',
  styleUrl: './index.component.less'
})
export class IndexComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Check and fetch token if needed
    console.log("app-index oninit check token");
    this.authService.checkAndFetchAuthToken().subscribe();
  }
}

