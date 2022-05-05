import { message } from 'antd';
import { CustomTexlFunction, DType, FormulaValue, FormulaValueStatic } from '@toy-box/power-fx';

export class Notify extends CustomTexlFunction {
  constructor() {
    super('Notify', DType.ObjNull, [DType.String, DType.String, DType.Number], 1);
  }
  public invoke(args: FormulaValue[]): Promise<FormulaValue> {
    const msg = args[0].toObject();
    const type = args[1]?.toObject();
    const time = args[2]?.toObject();
    switch (type) {
      case 'success':
        message.success(msg, time);
        break;
      case 'warning':
        message.warning(msg, time);
        break;
      case 'error':
        message.error(msg, time);
        break;
      case 'info':
      default:
        message.info(msg, time);
        break;
    }
    return new Promise((resolve) => {
      resolve(FormulaValueStatic.New());
    });
  }
}
