import { Component, Output } from "@angular/core";

@Component({
  selector: 'app-automation-panel',
  templateUrl: 'automation-panel.component.html',
  styleUrls: ['automation-panel.component.scss'],
})
export class AutomationPanelComponent {
  private boundMouseClickCB = this.onMouseClickCb.bind(this);
  private boundMouseEnterCB = this.onMouseEnterCb.bind(this);
  private selectedElements: HTMLElement[] = [];
  public isLooping = false;
  public loopIsReady = false;
  public actionMessage = '';
  public actionDescription = '';

  constructor() {
    this.updateLoopState(false, false);
  }

  handleClick() {
    this.selectedElements.forEach((e) => {
        // e.click();
    });
  }

  handleInput() {}

  handleLoop() {
    const rootElement = document.getElementsByClassName('todo-wrapper')[0];
    if (rootElement instanceof HTMLElement) {
      if (this.isLooping) {
        this.updateLoopState(false, true);
        this.restoreDOM(rootElement);
      } else {
        this.updateLoopState(true, false);
        this.setupDOM(rootElement);
      }
    }
  }

  /**
   * Traverse DOM and add a name prop to each tag
   */
  setupDOM(element: HTMLElement | null, name = 'root', index=0) {
    if (element?.children.length) {
      for (let i = 0; i < element?.children.length; i++) {
        const e = element?.children.item(i) as HTMLElement;
        const tagName = e?.tagName.toLowerCase();
        const className = e?.className
        const cName = name + '+' + tagName + '+' + className;
        this.setupDOM(e, cName, i);
      }
    }

    //@ts-ignore
    element?._disableAllEvents();
    element?.setAttribute('name', name);
    element?.addEventListener('mouseenter', this.boundMouseEnterCB);
    element?.addEventListener('click', this.boundMouseClickCB);
  }

  onMouseEnterCb(e: Event) {
    if (e.target instanceof HTMLElement) {
      e.stopPropagation();
      this.removeCSSClassEverywhere('hovered');
      this.addClassToElement('hovered', e.target);
    }
  }

  onMouseClickCb(e: Event) {
    if (e.target instanceof HTMLElement) {
      e.preventDefault();
      e.stopPropagation();
      this.decidePushOrSpliceElement(e.target);
    }
  }

  addClassToElement(className: string, element: HTMLElement) {
    element.classList.add(className);
  }

  removeClassFromElement(className: string, element: HTMLElement) {
    element.classList.remove(className);
  }

  addClassToElementsWithName(className: string, elementName: string | null) {
    if (elementName === null) return;
    const me = document.getElementsByName(elementName);
    for (let k = 0; k < me.length; k++) {
      me.item(k).classList.add(className);
    }
  }

  removeClassFromElementsWithName(className: string, elementName: string | null) {
    if (elementName === null) return;
    const me = document.getElementsByName(elementName);
    for (let k = 0; k < me.length; k++) {
      me.item(k).classList.remove(className);
    }
  }

  removeCSSClassEverywhere(className: string) {
    const elements = document.getElementsByTagName('*');
    for (let i = 0; i < elements.length; i++) {
      elements.item(i)?.classList.remove(className);
    }
  }

  decidePushOrSpliceElement(element: HTMLElement) {
    if (!this.selectedElements.includes(element)) {
      this.addElementToList(element);
      return;
    }
    this.removeElementFromList(element)
  }

  addElementToList(element: HTMLElement) {
    this.selectedElements.push(element);
    this.addClassToElement('selected', element);
    this.getSuggestedElements(element).forEach(element => {
      this.selectedElements.push(element);
      this.addClassToElement('selected', element);
    })
  }

  removeElementFromList(element: HTMLElement) {
    this.selectedElements.splice(this.selectedElements.indexOf(element));
    this.removeClassFromElement('selected', element);
  }

  getSuggestedElements(element: HTMLElement) : Array<HTMLElement> | [] {
    const elementName = element.getAttribute('name')
    const selectedElementsName = this.selectedElements.map((e) => e.getAttribute('name'));
    const elementNameCount = selectedElementsName.filter(name => name === elementName).length;

    if (elementNameCount < 2) return [];

    if (elementName && selectedElementsName.includes(elementName)) {
      return Array.from(document.getElementsByName(elementName));
    };
    return []
  }

  updateLoopState(isLooping: boolean, loopIsReady: boolean) {
    this.isLooping = isLooping;
    this.loopIsReady = loopIsReady;

    if (!isLooping) {
      this.actionMessage = 'Create loop';
      this.actionDescription = 'Creates a new loop with selected items';
    } else {
      this.actionMessage = 'Select items';
      this.actionDescription = 'Click this button to finish your selection.';
    }
  }

  restoreDOM(element: HTMLElement | null) {
    if (element?.children.length) {
      for (let i = 0; i < element?.children.length; i++) {
        const e = element?.children.item(i) as HTMLElement;
        this.restoreDOM(e);
      }
    }
    console.log('restoring dom')
    element?.removeEventListener('mouseenter', this.boundMouseEnterCB);
    element?.removeEventListener('click', this.boundMouseClickCB);
    //@ts-ignore
    element?._restoreAllEvents();
  }
}