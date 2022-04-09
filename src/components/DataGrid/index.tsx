import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
  useImperativeHandle,
} from 'react'
import classNames from 'classnames'
import { PaginationProps } from 'antd'
import { observer, useField, useFieldSchema, Schema, RecursionField } from '@formily/react'
import { CompareOP, fetchMeta, IFieldMeta } from '@toy-box/meta-schema'
import update from 'immutability-helper'
import { IButtonClusterProps, ToolBar } from '@toy-box/toybox-ui'
import { omit } from '@toy-box/toybox-shared'
import { RowSelectionType } from 'antd/es/table/interface'
import { useTable, useQuery } from '@toy-box/meta-components/lib/components/data-grid/hooks'
import { LoadDataType, DataGridModeType } from './types'
import { DataGridContext } from './context'
import {
  TableStatusBar,
  FilterPanel,
} from './components'
import { usePage } from '../Page/hooks/usePage'

// export * from './hooks'

const LIST_RENDER = 'listRender'

const simpleParams = (
  compares?: Toybox.MetaSchema.Types.ICompareOperation[]
) => {
  const sParams: Record<string, any> = {}
  if (compares) {
    compares.forEach((compare) => {
      if (
        compare.source &&
        compare.op === CompareOP.EQ &&
        compare.target &&
        compare.target !== ''
      ) {
        sParams[compare.source] = compare.target
      }
    })
  }
  return sParams
}


type RowData = Record<string, any>


const useSelectedKeys = (): [string[], (keys?: string[]) => void] => {
  const field = useField()
  const { form } = field
  const path = field.path.concat('selectedKeys')
  return [
    form.getValuesIn(path),
    (keys: string[]) => form.setValuesIn(path, keys),
  ]
}

export interface IDataGridProps<IParams = any> {
  /**
   * @description 数据元数据
   */
  objectMeta: Toybox.MetaSchema.Types.IObjectMeta
  visibleColumnSet?: boolean
  style?: CSSProperties

  /**
   * @description 当前查看模式
   * @default 'table'
   */
  mode?: DataGridModeType
  /**
   * @description 可切换的模式
   * @default null
   */
  viewModes?: DataGridModeType[]
  className?: string
  /**
   * @description 是否与url联动
   * @default false
   */
  urlQuery?: boolean
  defaultSelectionType?: RowSelectionType
  tableOperate?: IButtonClusterProps
  /**
   * @description 数据获取方法
   */
  loadData: LoadDataType
  filterFieldKeys?: string[]
  /**
   * @description 条件查询简单模式
   */
  logicFilter?: boolean
  pagination?: Omit<PaginationProps, 'onChange'>
  /**
   * @description 当数据重新加载时保留已选择的记录
   */
  keepSelected?: boolean
  children?: React.ReactNode
}

export declare type DataGridRefType = {
  reload: () => void
  reset: () => void
  dataSource?: RowData[]
}


const isToobarComponent = (schema: Schema) => {
  return schema['x-component']?.indexOf('Space') > -1
}

const useToolbarSource = () => {
  const schema = useFieldSchema()
  return schema
    .mapProperties((schema, name) => ({ schema, name }))
    .find((item) => isToobarComponent(item.schema))
}

const isMetaTableComponent = (schema: Schema) => {
  return schema['x-component']?.indexOf('MetaTable') > -1
}

const useMetaTableSchema = () => {
  const schema = useFieldSchema()
  return schema
    .mapProperties((schema, name) => ({ schema, name }))
    .find((item) => isMetaTableComponent(item.schema))
}

export const DataGrid: React.FC<IDataGridProps> = observer((
    {
      objectMeta,
      mode = 'table',
      viewModes = [],
      className,
      style,
      defaultSelectionType,
      loadData,
      filterFieldKeys,
      logicFilter,
      pagination,
      tableOperate,
      urlQuery,
      keepSelected,
      children,
    },
    ref: React.MutableRefObject<DataGridRefType>
  ) => {
    const field = useField()
    const page = usePage()
    const [query, setQuery] = useQuery()
    const preParamsRef = useRef<Toybox.MetaSchema.Types.ICompareOperation[]>()
    const paramsRef = useRef<Toybox.MetaSchema.Types.ICompareOperation[]>()
    const [preParams, setPreParams] = useState<
    Toybox.MetaSchema.Types.ICompareOperation[] | undefined
    >()
    const [params, setParams] = useState<
    Toybox.MetaSchema.Types.ICompareOperation[] | undefined
    >()
    const [pageable, setPageable] = useState<{
      current?: number
      pageSize?: number
    }>({ current: pagination?.current, pageSize: pagination?.pageSize })
    const toolbarSchema = useToolbarSource()
    const metaTableSchema = useMetaTableSchema()

    const queryOption = () => {
      if (query.pageable) {
        return Number.parseInt(query.pageable.pageSize) === pageable.pageSize &&
          Number.parseInt(query.pageable.current) === pageable.current
          ? pageable
          : {
              current: query.pageable.current
                ? Number.parseInt(query.pageable.current)
                : undefined,
              pageSize: query.pageable.pageSize
                ? Number.parseInt(query.pageable.pageSize)
                : undefined,
            }
      }
      return pageable
    }

    useEffect(() => setPreParams(params), [params])
    useEffect(() => {
      preParamsRef.current = preParams
      return () => undefined
    }, [preParams])
    useEffect(() => {
      paramsRef.current = params
      return () => undefined
    }, [params])
    useEffect(() => {
      if (urlQuery) {
        setPageable(queryOption())
        setParams(query.params ? JSON.parse(query.params) : undefined)
      }
    }, [query])

    const [selectionType, setSelectionType] = useState(defaultSelectionType)
    const [currentMode, setCurrentMode] = useState<DataGridModeType>(mode)

    const [selectedKeys, setSelectedKeys] = useSelectedKeys()

    const setQuerySearch = useCallback(
      (pageable: any, type: 'turnPage' | 'filterSearch') => {
        setTimeout(() => {
          if (urlQuery) {
            if (type === 'turnPage') {
              setQuery(
                update(query, {
                  params: { $set: JSON.stringify(preParamsRef.current) },
                  pageable: { $set: pageable },
                })
              )
            } else {
              setQuery(
                update(query, {
                  params: {
                    $set: preParamsRef.current
                      ? JSON.stringify(preParamsRef.current)
                      : undefined,
                  },
                  pageable: {
                    $set: { current: '1', pageSize: pageable.pageSize },
                  },
                })
              )
            }
          } else {
            setParams(preParamsRef.current)
            type === 'turnPage'
              ? setPageable(pageable)
              : setPageable({ current: 1, pageSize: pageable.pageSize })
          }
        })
      },
      [urlQuery, preParamsRef]
    )

    const paramsActions = useMemo(
      () => ({
        getParams: () => paramsRef,
        getPreParams: () => preParamsRef,
        setPreParams,
        setParams,
      }),
      [preParamsRef, setPreParams]
    )

    const onloadData = useCallback((pageable, params) => {
      const data = [
        { str: 'str1', num: '10001' },
        { str: 'str2', num: '10002' },
        { str: 'str3', num: '10003' },
      ]
      field.form.setValuesIn(field.path.concat('dataSource'), data)
      if (!keepSelected) {
        setSelectedKeys([])
      }
      // return loadData(
      //   pageable,
      //   logicFilter ? params : simpleParams(params)
      // ).then((data) => {
      //   if (!keepSelected) {
      //     setSelectedKeys([])
      //   }
      //   return data
      // })
    }, [field.form, field.path, keepSelected, setSelectedKeys])

    const {
      pagination: innerPagination,
      tableProps,
      reload,
    } = useTable(
      onloadData,
      {
        logicFilter,
        paramsActions,
      },
      pageable,
      params
    )

    const paginationProps = useMemo(
      () => ({
        ...pagination,
        ...omit(innerPagination, ['onChange', 'current', 'pageSize']),
        onChange: (current, pageSize) => {
          setQuerySearch(
            {
              current,
              pageSize,
            },
            'turnPage'
          )
        },
        current: pageable?.current || innerPagination.current,
        pageSize: pageable?.pageSize || innerPagination.pageSize,
      }),
      [pagination, innerPagination, pageable, setQuerySearch]
    )

    const reset = useCallback(() => {
      if (urlQuery) {
        setQuery({})
      } else {
        setParams([])
        setPageable({})
      }
    }, [setQuery, urlQuery])

    useImperativeHandle(
      ref,
      () => ({
        reload,
        reset,
        dataSource: tableProps.dataSource,
      }),
      [tableProps, reload, reset]
    )

    const filterFields = useMemo(() => {
      const dataSourceMeta = fetchMeta(page.pageMeta, field.path.concat('dataSource').segments) as IFieldMeta
      const { properties } = dataSourceMeta.items
      if (properties) {
        return Object.keys(properties)
          .filter((key) => {
            return filterFieldKeys
              ? filterFieldKeys.includes(key)
              : key !== dataSourceMeta.primaryKey
          })
          .map((key) => properties[key])
      }
      return []
    }, [page, field, filterFieldKeys])

    const dataGridContext = useMemo(
      () => ({
        objectMeta,
        setQuerySearch,
        params,
        setParams,
        preParams,
        setPreParams,
        currentMode,
        setCurrentMode,
        viewModes,
        filterFieldKeys,
        selectedKeys,
        setSelectedKeys,
        selectionType,
        setSelectionType,
        filterFields,
        logicFilter,
        pageable,
      }),
      [currentMode, filterFieldKeys, filterFields, logicFilter, objectMeta, pageable, params, preParams, selectedKeys, selectionType, setQuerySearch, setSelectedKeys, viewModes]
    )

    return (
      <DataGridContext.Provider value={dataGridContext}>
        <div className={classNames('tbox-index-view', className)} style={style}>
          <ToolBar>
            <FilterPanel />
            <RecursionField
              schema={toolbarSchema.schema}
              name={toolbarSchema.name}
            />
          </ToolBar>
          <TableStatusBar />
          <RecursionField
            schema={metaTableSchema.schema}
            name={metaTableSchema.name}
          />
        </div>
      </DataGridContext.Provider>
    )
  })

DataGrid.displayName = 'DataGrid'
