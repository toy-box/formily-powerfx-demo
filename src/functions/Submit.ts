import {
  CustomTexlFunction,
  DType,
  FormulaValue,
  FormulaValueStatic,
  MetaFieldControl,
  MetaRecalcEngine,
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
  private engine: MetaRecalcEngine;

  constructor(form: Form, engine: MetaRecalcEngine, fn: SubmitFn = defaultSubmitFn) {
    super('Submit', DType.ObjNull, [DType.Error], 1);
    this.form = form;
    this.engine = engine;
    this.submitFn = fn;
  }

  public invoke(args: FormulaValue[]): Promise<FormulaValue> {
    const control = args[0].toObject() as MetaFieldControl;
    const formField = Object.values(this.form.fields).find(
      (field) => field.componentProps['uid'] === control.entityName.value
    ) as ObjectField;
    const onSuccessExpression = formField.componentProps['onSuccess'];
    const onFailExpression = formField.componentProps['onFail'];
    console.log('onSuccessExpression', onSuccessExpression);
    console.log('onFailExpression', onFailExpression);

    return this.submitFn(formField.value)
      .then((value) => this.engine.eval(onSuccessExpression))
      .catch((err) => this.engine.eval(onFailExpression));
  }
}
