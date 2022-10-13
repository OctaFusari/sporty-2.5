import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-impostazioni',
  templateUrl: './impostazioni.component.html',
  styleUrls: ['./impostazioni.component.css']
})
export class ImpostazioniComponent implements OnInit {
  @Input() userData:any = "";

  constructor() { }

  ngOnInit(): void {
  }


  changecolor(mode:any){
    if(mode == 0){
      document.documentElement.style.setProperty("--background","#ffffff")
      document.documentElement.style.setProperty("--background-text","#f7f7f7")
      document.documentElement.style.setProperty("--text","#141414")
      document.documentElement.style.setProperty("--text-minor","#292929")
      document.documentElement.style.setProperty("--container","#f3f3f3")
      document.documentElement.style.setProperty("--card","#e4e4e4")
      document.documentElement.style.setProperty("--card-little","#d6d6d6")
      document.documentElement.style.setProperty("--container-trasparent","#a7a7a781")
      document.documentElement.style.setProperty("--card-trasparent","#8a8a8a88")
      document.documentElement.style.setProperty("--sfondo","#ffffff")
    }else if(mode == 1){
      document.documentElement.style.setProperty("--background","#141414")
      document.documentElement.style.setProperty("--background-text","#121212")
      document.documentElement.style.setProperty("--text","#d6d6d6")
      document.documentElement.style.setProperty("--text-minor","#8a8a8a")
      document.documentElement.style.setProperty("--container","#181818")
      document.documentElement.style.setProperty("--card","#1d1d1d")
      document.documentElement.style.setProperty("--card-little","#242424")
      document.documentElement.style.setProperty("--container-trasparent","#1818189d")
      document.documentElement.style.setProperty("--card-trasparent","#20202085")
      document.documentElement.style.setProperty("--sfondo","#141414")
    }
  }

}
