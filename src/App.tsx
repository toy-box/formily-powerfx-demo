import React, { useState } from 'react'
import { createForm } from '@formily/core'
import { createSchemaField, Schema } from '@formily/react'
import {
  Form,
  FormItem,
  FormLayout,
  Input,
  Select,
  Cascader,
  DatePicker,
  Submit,
  FormGrid,
  ArrayItems,
  Editable,
  FormButtonGroup,
  NumberPicker,
  ArrayTable,
} from '@formily/antd'
import { MetaTable, DataGrid } from './components'
import { Card } from 'antd'
import { MetaRecalcEngine } from '@toy-box/power-fx'
import { BrowserRouter } from "react-router-dom";
import { objectMeta, userSchema } from './data'
import { patchProvide } from './patcher'

const form = createForm({
  validateFirst: true,
})

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
    MetaTable,
    DataGrid,
  },
})

const engine = new MetaRecalcEngine(form, objectMeta)
Schema.registerPatches(patchProvide(engine))

const App =  () => {
  return (
    <BrowserRouter>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          background: '#eee',
          padding: '40px 0',
        }}
      >
        <Card title="编辑用户" style={{ width: 620 }}>
          <Form
            form={form}
            labelCol={5}
            wrapperCol={16}
            onAutoSubmit={console.log}
          >
            <SchemaField schema={userSchema} />
            <FormButtonGroup.FormItem>
              <Submit block size="large">
                提交
              </Submit>
            </FormButtonGroup.FormItem>
          </Form>
        </Card>
      </div>
    </BrowserRouter>
  )
}

export default App