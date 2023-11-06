import { Subject } from 'rxjs';

class DataManager {
  #data = new Map();
  #spreadData$ = null;

  constructor() {
    this.#spreadData$ = new Subject();
  }

  updateData(id, value) {
    this.#data.set(id, value);
    this.#spreadData$.next(this.#data);
  }

  subscribeToData(process) {
    return this.#spreadData$.subscribe(process);
  }

  unsubscribeFromData(observer) {
    observer.unsubscribe();
  }
}

export const dataManager = new DataManager();