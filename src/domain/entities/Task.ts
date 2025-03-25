export default class Task {
  constructor(
    private _label: string,
    private _isDone: boolean,
  ) {
  }

  get label(): string {
    return this._label;
  }

  set label(value: string) {
    this._label = value;
  }

  get isDone(): boolean {
    return this._isDone;
  }

  set isDone(value: boolean) {
    this._isDone = value;
  }

  complete(): void {
    this._isDone = true;
  }

  clear(): void {
    this._isDone = false;
  }
}
