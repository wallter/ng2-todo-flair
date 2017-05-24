import { AppComponent } from './app.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { WebStorageModule } from 'ngx-store';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';

import { SpeechRecognitionService } from './speech-recognition.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,

    WebStorageModule.withConfig({
      prefix: 'todo-app.',    // default: ngx_
      clearType: 'prefix', // possible values: decorators, prefix, all
      addSaveMethod: true  // defines whether .save() method shall be added to stored objects
    }),
    Ng2FilterPipeModule
  ],
  providers: [
    SpeechRecognitionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
