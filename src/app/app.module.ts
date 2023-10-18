import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AutomationPanelModule } from './automation-panel/automation-panel.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AutomationPanelModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
