export class CommonState<T> {
  private model?: T;
  public set = (model?: T) => (this.model = model);
  public get = () => this.model;
}
