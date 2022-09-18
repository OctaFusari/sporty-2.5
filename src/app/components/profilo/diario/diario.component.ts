import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-diario',
  templateUrl: './diario.component.html',
  styleUrls: ['./diario.component.css']
})
export class DiarioComponent implements OnInit {
  @Input() userData:any = "";

  constructor() { }

  ngOnInit(): void {
  }

}
