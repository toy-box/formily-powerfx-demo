/* eslint-disable react-hooks/rules-of-hooks */
import React, { createContext, useContext } from 'react'
import { Button } from 'antd'
import {
  DeleteOutlined,
  DownOutlined,
  UpOutlined,
  PlusOutlined,
  MenuOutlined,
} from '@ant-design/icons'
import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon'
import { ButtonProps } from 'antd/lib/button'
import { ArrayField, Field } from '@formily/core'
import {
  useField,
  useFieldSchema,
  Schema,
  JSXComponent,
  ExpressionScope,
} from '@formily/react'
import { isValid, clone, isBool } from '@formily/shared'
import { SortableHandle } from 'react-sortable-hoc'
import { usePrefixCls } from '@formily/antd/lib/__builtins__'
import cls from 'classnames'

export interface IArrayBaseAdditionProps extends ButtonProps {
  title?: string
  method?: 'push' | 'unshift'
  defaultValue?: any
}

export interface IArrayBaseContext {
  props: IArrayBaseProps
  field: ArrayField
  schema: Schema
}

export interface IArrayBaseItemProps {
  index: number
  record: any
}

export type MetaArrayBaseMixins = {
  Addition?: React.FC<IArrayBaseAdditionProps>
  Remove?: React.FC<AntdIconProps & { index?: number }>
  MoveUp?: React.FC<AntdIconProps & { index?: number }>
  MoveDown?: React.FC<AntdIconProps & { index?: number }>
  SortHandle?: React.FC<AntdIconProps & { index?: number }>
  Index?: React.FC
  useArray?: () => IArrayBaseContext
  useIndex?: () => number
  useRecord?: () => any
}

export interface IArrayBaseProps {
  disabled?: boolean
  onAdd?: (index: number) => void
  onRemove?: (index: number) => void
  onMoveDown?: (index: number) => void
  onMoveUp?: (index: number) => void
}

type ComposedArrayBase = React.FC<IArrayBaseProps> &
  MetaArrayBaseMixins & {
    Item?: React.FC<IArrayBaseItemProps>
    mixin?: <T extends JSXComponent>(target: T) => T & MetaArrayBaseMixins
  }

const ArrayBaseContext = createContext<IArrayBaseContext>(null)

const ItemContext = createContext<IArrayBaseItemProps>(null)

const useArray = () => {
  return useContext(ArrayBaseContext)
}

const useDataSourceField = () => {
  const { field } = useArray()
  return field.form.fields[field.address.concat('dataSource').toString()] as ArrayField
}


const useIndex = (index?: number) => {
  const ctx = useContext(ItemContext)
  return ctx ? ctx.index : index
}

const useRecord = (record?: number) => {
  const ctx = useContext(ItemContext)
  return ctx ? ctx.record : record
}

const getDefaultValue = (defaultValue: any, schema: Schema) => {
  if (isValid(defaultValue)) return clone(defaultValue)
  if (Array.isArray(schema?.items))
    return getDefaultValue(defaultValue, schema.items[0])
  if (schema?.items?.type === 'array') return []
  if (schema?.items?.type === 'boolean') return true
  if (schema?.items?.type === 'date') return ''
  if (schema?.items?.type === 'datetime') return ''
  if (schema?.items?.type === 'number') return 0
  if (schema?.items?.type === 'object') return {}
  if (schema?.items?.type === 'string') return ''
  return null
}

export const MetaArrayBase: ComposedArrayBase = (props) => {
  const field = useField<ArrayField>()
  const schema = useFieldSchema()
  return (
    <ArrayBaseContext.Provider value={{ field, schema, props }}>
      {props.children}
    </ArrayBaseContext.Provider>
  )
}

MetaArrayBase.Item = ({ children, ...props }) => {
  return (
    <ItemContext.Provider value={props}>
      <ExpressionScope value={{ $record: props.record, $index: props.index }}>
        {children}
      </ExpressionScope>
    </ItemContext.Provider>
  )
}

const SortHandle = SortableHandle((props: any) => {
  const prefixCls = usePrefixCls('formily-array-base')
  return (
    <MenuOutlined
      {...props}
      className={cls(`${prefixCls}-sort-handle`, props.className)}
      style={{ ...props.style }}
    />
  )
}) as any

MetaArrayBase.SortHandle = (props) => {
  const array = useArray()
  if (!array) return null
  if (array.field?.pattern !== 'editable') return null
  return <SortHandle {...props} />
}

MetaArrayBase.Index = (props) => {
  const index = useIndex()
  const prefixCls = usePrefixCls('formily-array-base')
  return (
    <span {...props} className={`${prefixCls}-index`}>
      #{index + 1}.
    </span>
  )
}

MetaArrayBase.Addition = (props) => {
  const self = useField()
  const array = useArray()
  // const dataSourceField = useDataSourceField()
  // console.log('dataSourceField', dataSourceField)
  const prefixCls = usePrefixCls('formily-array-base')
  if (!array) return null
  if (
    array.field?.pattern !== 'editable' &&
    array.field?.pattern !== 'disabled'
  )
    return null
  return (
    <Button
      type="dashed"
      block
      {...props}
      disabled={isBool(self?.disabled) ? self?.disabled : array.field?.disabled}
      className={cls(`${prefixCls}-addition`, props.className)}
      onClick={(e) => {
        if (array.props?.disabled) return
        const schema = array.schema.properties.dataSource
        const defaultValue = getDefaultValue(props.defaultValue, schema)
        if (props.method === 'unshift') {
          array.field?.unshift?.(defaultValue)
          array.props?.onAdd?.(0)
        } else {
          array.field?.push?.(defaultValue)
          array.props?.onAdd?.(array.field?.value?.length - 1)
        }
        if (props.onClick) {
          props.onClick(e)
        }
      }}
      icon={<PlusOutlined />}
    >
      {props.title || self.title}
    </Button>
  )
}

MetaArrayBase.Remove = React.forwardRef((props, ref) => {
  const index = useIndex(props.index)
  const array = useArray()
  const dataSourceField = useDataSourceField()
  const prefixCls = usePrefixCls('formily-array-base')
  if (!array) return null
  if (array.field?.pattern !== 'editable') return null
  return (
    <DeleteOutlined
      {...props}
      className={cls(`${prefixCls}-remove`, props.className)}
      ref={ref}
      onClick={(e) => {
        if (array.props?.disabled) return
        e.stopPropagation()
        dataSourceField?.remove?.(index)
        array.props?.onRemove?.(index)
        if (props.onClick) {
          props.onClick(e)
        }
      }}
    />
  )
})

MetaArrayBase.MoveDown = React.forwardRef((props, ref) => {
  const index = useIndex(props.index)
  const array = useArray()
  const dataSourceField = useDataSourceField()
  const prefixCls = usePrefixCls('formily-array-base')
  if (!array) return null
  if (array.field?.pattern !== 'editable') return null
  return (
    <DownOutlined
      {...props}
      className={cls(`${prefixCls}-move-down`, props.className)}
      ref={ref}
      onClick={(e) => {
        if (array.props?.disabled) return
        e.stopPropagation()
        dataSourceField?.moveDown?.(index)
        array.props?.onMoveDown?.(index)
        if (props.onClick) {
          props.onClick(e)
        }
      }}
    />
  )
})

MetaArrayBase.MoveUp = React.forwardRef((props, ref) => {
  const index = useIndex(props.index)
  const array = useArray()
  const dataSourceField = useDataSourceField()
  const prefixCls = usePrefixCls('formily-array-base')
  if (!array) return null
  if (array.field?.pattern !== 'editable') return null
  return (
    <UpOutlined
      {...props}
      className={cls(`${prefixCls}-move-up`, props.className)}
      ref={ref}
      onClick={(e) => {
        if (array.props?.disabled) return
        e.stopPropagation()
        dataSourceField?.moveUp(index)
        array?.props?.onMoveUp?.(index)
        if (props.onClick) {
          props.onClick(e)
        }
      }}
    />
  )
})

MetaArrayBase.useArray = useArray
MetaArrayBase.useIndex = useIndex
MetaArrayBase.useRecord = useRecord
MetaArrayBase.mixin = (target: any) => {
  target.Index = MetaArrayBase.Index
  target.SortHandle = MetaArrayBase.SortHandle
  target.Addition = MetaArrayBase.Addition
  target.Remove = MetaArrayBase.Remove
  target.MoveDown = MetaArrayBase.MoveDown
  target.MoveUp = MetaArrayBase.MoveUp
  target.useArray = MetaArrayBase.useArray
  target.useIndex = MetaArrayBase.useIndex
  target.useRecord = MetaArrayBase.useRecord
  return target
}

export default MetaArrayBase