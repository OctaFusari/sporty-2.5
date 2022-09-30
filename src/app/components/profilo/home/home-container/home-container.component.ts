import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.css']
})
export class HomeContainerComponent implements OnInit {
  @Input() userDataindex:any = "";
  @Input() userData:any = "";
  @Input() profileData:any = "";

  containerCentrale:number = 0
  constructor() { }

  ngOnInit(): void {
  }

}
