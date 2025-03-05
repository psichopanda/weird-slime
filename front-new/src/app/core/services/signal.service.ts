import { computed, Injectable, signal, Signal } from '@angular/core';

export class SignalService<T> {
  readonly state = signal({} as T);

  public select<K extends keyof T>(key: K): Signal<T[K]> {
    return computed(() => this.state()[key]);
  }

  public setKey<K extends keyof T>(key: K, data: T[K]): void {
    this.state.update((currentValue) => ({...currentValue, [key]: data}));
  }

  public set<K extends keyof T>(data: T): void {
    this.state.set(data);
  }

  public update(partialState: Partial<T>): void {
    this.state.update((currentValue) => ({...currentValue, ...partialState}));
  }
}
