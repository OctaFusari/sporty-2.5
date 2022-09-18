import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-allenatore-container',
  templateUrl: './allenatore-container.component.html',
  styleUrls: ['./allenatore-container.component.css']
})
export class AllenatoreContainerComponent implements OnInit {
  @Input() userData:any = "";

  constructor() { }

  ngOnInit(): void {
  }

}
