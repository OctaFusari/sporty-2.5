import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'sporty';

  constructor(private router:Router){

  }

  appSection:any = 0
  ngOnInit(): void {
    if(localStorage.getItem("sportyId") != null || undefined || ""){
      this.appSection = 1;
      document.documentElement.style.setProperty('--sfondo', '#141414');
    }else{
      this.appSection = 2
    }
    
  }
}
