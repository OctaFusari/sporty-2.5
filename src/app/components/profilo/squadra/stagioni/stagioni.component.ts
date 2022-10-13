import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stagioni',
  templateUrl: './stagioni.component.html',
  styleUrls: ['./stagioni.component.css']
})
export class StagioniComponent implements OnInit {
  @Input() squadraScelta:any = "";
  stagioni:any = ""

  constructor() { }

  ngOnInit(): void {

  }

}
