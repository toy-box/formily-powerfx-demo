import React, { useState } from 'react'
import { createForm } from '@formily/core'
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
import { Card } from 'antd'
import { Button, DataGrid, DataView, MetaTable, Page, FieldString, FieldNumber, FieldBoolean, FieldDate, ButtonCluster, FieldSelect } from './components'
import { MetaRecalcEngine, PowerFxConfig } from '@toy-box/power-fx'
import { BrowserRouter } from 'react-router-dom'
import { objectMeta, userSchema } from './mock/data'
import { patchProvide } from './patcher'
import { Notify } from './functions/Notify'
import { metaService } from './mock/services'

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
  },
})

const config = new PowerFxConfig()
config.addFunction(new Notify())
const engine = new MetaRecalcEngine(form, objectMeta, config)

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
          <Page
            title="编辑用户"
            name="EditUser"
            form={form}
            labelCol={5}
            wrapperCol={16}
            onAutoSubmit={console.log}
            pageMeta={objectMeta}
            metaService={metaService}
            engine={engine}
          >
            <SchemaField schema={userSchema} />
          </Page>
        </Card>
      </div>
    </BrowserRouter>
  )
}

export default App
