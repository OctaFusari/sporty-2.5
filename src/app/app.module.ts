import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaginainizialeComponent } from './components/paginainiziale/paginainiziale.component';
import { ProfiloUtenteComponent } from './components/profilo/profilo-utente/profilo-utente.component';
import { AttivitaComponent } from './components/profilo/home/attivita/attivita.component';
import { AtletiComponent } from './components/profilo/home/atleti/atleti.component';
import { DiarioComponent } from './components/profilo/diario/diario.component';
import { ImpostazioniComponent } from './components/profilo/impostazioni/impostazioni.component';
import { BachecaComponent } from './components/profilo/squadra/bacheca/bacheca.component';
import { UtentiComponent } from './components/profilo/squadra/utenti/utenti.component';
import { AllenamentiComponent } from './components/profilo/squadra/allenamenti/allenamenti.component';
import { StagioniComponent } from './components/profilo/squadra/stagioni/stagioni.component';
import { HomeContainerComponent } from './components/profilo/home/home-container/home-container.component';
import { SquadraContainerComponent } from './components/profilo/squadra/squadra-container/squadra-container.component';
import { AllenatoreContainerComponent } from './components/profilo/allenatore/allenatore-container/allenatore-container.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { providePerformance,getPerformance } from '@angular/fire/performance';
import { provideRemoteConfig,getRemoteConfig } from '@angular/fire/remote-config';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { IscrizioneComponent } from './components/profilo/squadra/iscrizione/iscrizione.component';

@NgModule({
  declarations: [
    AppComponent,
    PaginainizialeComponent,
    ProfiloUtenteComponent,
    AttivitaComponent,
    AtletiComponent,
    DiarioComponent,
    ImpostazioniComponent,
    BachecaComponent,
    UtentiComponent,
    AllenamentiComponent,
    StagioniComponent,
    HomeContainerComponent,
    SquadraContainerComponent,
    AllenatoreContainerComponent,
    IscrizioneComponent
  ],  
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    providePerformance(() => getPerformance()),
    provideRemoteConfig(() => getRemoteConfig()),
    provideStorage(() => getStorage())
  ],
  providers: [
    ScreenTrackingService,UserTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
