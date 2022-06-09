import {
  BooleanValue,
  CustomTexlFunction,
  DType,
  FormulaTypeStatic,
  FormulaValue,
  IRContext,
  MetaRecalcEngine,
  FormulaValueStatic,
} from '@toy-box/power-fx';
import { Form } from '@formily/core';
import { Flow } from '@toy-box/power-fx/lib/interpreter/external/Flow';

export declare type PostFn = (flowName: string, data: any) => Promise<FormulaValue>;

const defaultPostFn: PostFn = (flowName: string, data: any) => {
  return new Promise((resolve) => {
    console.log('Post', flowName, data);
    resolve(FormulaValueStatic.New());
  });
};

export class PostFlow extends CustomTexlFunction {
  private postFn: PostFn;

  constructor(form: Form, engine: MetaRecalcEngine, fn: PostFn = defaultPostFn) {
    super('Submit', DType.ObjNull, [DType.Error, DType.EmptyRecord], 2);
    this.postFn = fn;
  }

  public invoke(args: FormulaValue[]): Promise<FormulaValue> {
    const flow = args[0].toObject() as Flow;
    const data = args[1].toObject();
    return this.postFn(flow.name, data)
      .then((value) => new BooleanValue(IRContext.NotInSource(FormulaTypeStatic.Boolean), true))
      .catch((err) => new BooleanValue(IRContext.NotInSource(FormulaTypeStatic.Boolean), false));
  }
}
