import { CustomTexlFunction, DType, FormulaValue, FormulaValueStatic } from '@toy-box/power-fx';

export declare type SubmitFn = (data: any) => Promise<FormulaValue>;

const defaultSubmitFn: SubmitFn = (data: any) => {
  return new Promise((resolve) => {
    console.log('submit', data);
    resolve(FormulaValueStatic.New());
  });
};

export class Submit extends CustomTexlFunction {
  private submitFn: SubmitFn;
  constructor(fn: SubmitFn = defaultSubmitFn) {
    super('Submit', DType.ObjNull, [DType.Error], 0);
    this.submitFn = fn;
  }
  public invoke(args: FormulaValue[]): Promise<FormulaValue> {
    const data = args[0].toObject();
    console.log('data', data);
    return this.submitFn(data);
  }
}
