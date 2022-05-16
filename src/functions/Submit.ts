import {
  Control,
  CustomTexlFunction,
  DType,
  FormulaValue,
  FormulaValueStatic,
} from '@toy-box/power-fx';
import { Form, ObjectField } from '@formily/core';

export declare type SubmitFn = (data: any) => Promise<FormulaValue>;

const defaultSubmitFn: SubmitFn = (data: any) => {
  return new Promise((resolve) => {
    console.log('submit', data);
    resolve(FormulaValueStatic.New());
  });
};

export class Submit extends CustomTexlFunction {
  private submitFn: SubmitFn;
  private form: Form;
  constructor(form: Form, fn: SubmitFn = defaultSubmitFn) {
    super('Submit', DType.ObjNull, [DType.Error], 0);
    this.form = form;
    this.submitFn = fn;
  }
  public invoke(args: FormulaValue[]): Promise<FormulaValue> {
    const control = args[0].toObject() as Control;
    const field = Object.values(this.form.fields).find(
      (field) => field.componentProps['uid'] === control.entityName.value
    ) as ObjectField;
    console.log(control.entityName, field);
    return this.submitFn(field.value);
  }
}
