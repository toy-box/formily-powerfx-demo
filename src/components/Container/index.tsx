import React from 'react'
import { createSchemaField, Schema } from '@formily/react'
import {
  FormItem,
  FormLayout,
  Input,
  Select,
  Cascader,
  DatePicker,
  FormGrid,
  ArrayItems,
  Editable,
  NumberPicker,
  ArrayTable,
} from '@formily/antd'
import { Form, FormProps } from '@formily/antd'
import { usePage } from '../../hooks/usePage'
import { Button, DataGrid, DataView, MetaTable, FieldString, FieldNumber, FieldBoolean, FieldDate, ButtonCluster, FieldSelect } from '../../components'


export type ContainerProps = {
  className?: string
  style?: React.CSSProperties
  components: Schema
}

export const Container: React.FC<React.PropsWithChildren<ContainerProps>> = ({ className, style, components, children }) => {
  const page = usePage()
  const SchemaField = createSchemaField({
    components: {
      ArrayTable,
      FormItem,
      FormGrid,
      FormLayout,
      Input,
      DatePicker,
      Cascader,
      Select,
      ArrayItems,
      Editable,
      NumberPicker,
      Button,
      DataGrid,
      DataView,
      MetaTable,
      FieldBoolean,
      FieldDate,
      FieldNumber,
      FieldString,
      ButtonCluster,
      FieldSelect,
      Container,
    },
  })
  return (
    <div className={className} style={style}>
      <Form {...page}>
        <SchemaField schema={components} />
      </Form>
    </div>
  )
}
