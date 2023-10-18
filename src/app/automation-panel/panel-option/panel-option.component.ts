import { Component, Inject, Input } from "@angular/core";

@Component({
    selector: 'app-panel-option',
    templateUrl: 'panel-option.component.html',
    styleUrls: ['panel-option.component.scss']
})
export class PanelOptionComponent {
    @Input() action: string = "";
    @Input() description: string = "";
}