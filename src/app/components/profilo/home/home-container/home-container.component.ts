import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.css']
})
export class HomeContainerComponent implements OnInit {

  @Output() changeProfilevent = new EventEmitter<any>();
  
  @Input() userDataindex:any = "";
  @Input() userData:any = "";
  @Input() profileData:any = "";

  addNewItem() {
  }

  constructor() { }

  ngOnInit(): void {
  }

  changeProfile() {
    this.changeProfilevent.emit(0);
    localStorage.removeItem('SportyuserDataindex');
    localStorage.removeItem('SportyprofileData');
  }

}
