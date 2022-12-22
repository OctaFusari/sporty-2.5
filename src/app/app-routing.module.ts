import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IscrizioneComponent } from './components/profilo/squadra/iscrizione/iscrizione.component';

const routes: Routes = [
  {path:"IscrizioneComponent", component: IscrizioneComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
