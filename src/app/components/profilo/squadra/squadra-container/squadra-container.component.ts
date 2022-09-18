import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-squadra-container',
  templateUrl: './squadra-container.component.html',
  styleUrls: ['./squadra-container.component.css']
})
export class SquadraContainerComponent implements OnInit {
  @Input() userData:any = "";

  constructor() { }

  ngOnInit(): void {
  }

}
