import { Component, OnInit } from '@angular/core';
import { SquadraContainerComponent } from '../squadra-container/squadra-container.component';

@Component({
  selector: 'app-iscrizione',
  templateUrl: './iscrizione.component.html',
  styleUrls: ['./iscrizione.component.css']
})
export class IscrizioneComponent implements OnInit {

  constructor(public sc:SquadraContainerComponent) { }

  ngOnInit(): void {
  }

}
