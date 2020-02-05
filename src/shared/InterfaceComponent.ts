import { StateSubject } from 'pura/reactive';
import { uniqueId } from 'pura/string';
import { render, Tag } from 'pura/framework';

export abstract class InterfaceComponent<State> {
  protected id = uniqueId();
  abstract readonly element: HTMLElement;
  protected readonly state: StateSubject<State>;

  constructor(state: State) {
    this.state = new StateSubject(state);
    // Should render for the first time right after the class initializes.
    setTimeout(() => {
      this.state.subscribe(state => {
        render(this.build(state), this.element);
      });
    }, 0);
  }

  getValueFromEvent<Value>(evt: Event): Value {
    return (evt.target as unknown as { value: Value }).value;
  }

  abstract build(state: State): Tag;
}