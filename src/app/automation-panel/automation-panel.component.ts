import { Component } from "@angular/core";

@Component({
  selector: 'app-automation-panel',
  templateUrl: 'automation-panel.component.html',
  styleUrls: ['automation-panel.component.scss'],
})
export class AutomationPanelComponent {
  private selectedElementsName: string[] = [];

  injectOnHover() {
    const rootElement = document.getElementsByTagName('body')[0];
    this.setupDOM(rootElement);
  }

  /**
   * Traverse DOM and add a name prop to each tag
   */
  setupDOM(element: Element | null, name = 'root') {
    if (element?.children.length) {
      for (let i = 0; i < element?.children.length; i++) {
        const e = element?.children.item(i)
        const cName = name + '+' + e?.tagName.toLocaleLowerCase();
        this.setupDOM(e, cName);
      }
    }
    element?.setAttribute('name', name);
    element?.addEventListener('mouseenter', (e) => {
      this.removeClassEverywhere('hovered');
      this.addClassToElementsWithName('hovered', name);
      e.stopPropagation();
    });
    element?.addEventListener('click', (e) => {
      this.decideSelection(element);
      e.stopPropagation();
    });
  }

  addClassToElementsWithName(className: string, elementName: string) {
    const me = document.getElementsByName(elementName);
    for (let k = 0; k < me.length; k++) {
      me.item(k).classList.add(className);
    }
  }
  
  removeClassEverywhere(className: string) {
    const elements = document.getElementsByTagName('*');
    for (let i = 0; i < elements.length; i++) {
      elements.item(i)?.classList.remove(className);
    }
  }

  decideSelection(element: Element) {
    if (element.classList.contains('selected')) {
      element.classList.remove('selected');
    } else {
      element.classList.add('selected');
      this.updateElementSelection(element);
    }
  }

  updateElementSelection(element: Element) {
    const attrName = element.getAttribute('name');
    if (attrName != null) {
      if (this.selectedElementsName.includes(attrName)) {
        this.addClassToElementsWithName('selected', attrName);
      }
      this.selectedElementsName.push(attrName);
    }
  }
}