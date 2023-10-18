import { NgModule } from '@angular/core';
import { AutomationPanelComponent } from './automation-panel.component';
import { PanelOptionComponent } from './panel-option/panel-option.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AutomationPanelComponent,
    PanelOptionComponent,
  ],
  exports: [
    AutomationPanelComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [],
  bootstrap: []
})
export class AutomationPanelModule { }
