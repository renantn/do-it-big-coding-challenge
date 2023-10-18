import { NgModule } from '@angular/core';
import { AutomationPanelComponent } from './automation-panel.component';
import { PanelOptionComponent } from './panel-option/panel-option.component';

@NgModule({
  declarations: [
    AutomationPanelComponent,
    PanelOptionComponent,
  ],
  exports: [
    AutomationPanelComponent
  ],
  imports: [],
  providers: [],
  bootstrap: []
})
export class AutomationPanelModule { }
