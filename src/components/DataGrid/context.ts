import { createContext } from 'react';
import { DataGridModeType } from './types';
import { RowSelectionType } from 'antd/es/table/interface';

export interface IDataGridContextProps {
  setQuerySearch?: (params: any, type: 'turnPage' | 'filterSearch') => void;
  pageable?: { current?: number; pageSize?: number };
  params?: any;
  setParams?: (params: any) => void;
  preParams?: any;
  setPreParams?: (params: any) => void;
  filterFields?: Toybox.MetaSchema.Types.IFieldMeta[];
  objectMeta: Toybox.MetaSchema.Types.IObjectMeta;
  currentMode: DataGridModeType;
  setCurrentMode: (mode: DataGridModeType) => void;
  viewModes?: DataGridModeType[];
  selectedKeys?: string[];
  setSelectedKeys?: (keys?: string[]) => void;
  selectionType?: RowSelectionType;
  logicFilter?: boolean;
}

export const DataGridContext = createContext<IDataGridContextProps>({} as IDataGridContextProps);
