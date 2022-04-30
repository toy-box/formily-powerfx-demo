import { CustomTexlFunction, DType, FormulaValue } from '@toy-box/power-fx';

export declare type SubmitFn = (data: any) => Promise<FormulaValue>;

export class Submit extends CustomTexlFunction {
  private submitFn: SubmitFn;
  constructor(submitFn: SubmitFn) {
    super('Submit', DType.ObjNull, [DType.UntypedObject], 0);
    this.submitFn = submitFn;
  }
  public invoke(args: FormulaValue[]): Promise<FormulaValue> {
    const data = args[0].toObject();

    return this.submitFn(data);
  }
}
