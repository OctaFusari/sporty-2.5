import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-impostazioni-squadra',
  templateUrl: './impostazioni-squadra.component.html',
  styleUrls: ['./impostazioni-squadra.component.css']
})
export class ImpostazioniSquadraComponent implements OnInit {

  constructor() { }

  @Input() squadData: any = '';
  @Input() userData: any = '';

  ngOnInit(): void {
  }

}
