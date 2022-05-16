import React from 'react'
import { Form, FormProps } from '@formily/antd'
import { IFieldMeta } from '@toy-box/meta-schema'
import { MetaRecalcEngine } from '@toy-box/power-fx'
import { FlowService, MetaService } from '../../services'
import { PageContext } from './context'

export type PageProps = {
  title: string
  name: string
  pageMeta: IFieldMeta
  engine: MetaRecalcEngine
  metaService: MetaService
  flowService: FlowService
} & FormProps

export const Page: React.FC<PageProps> = ({
  title,
  name,
  pageMeta,
  engine,
  children,
  metaService,
  flowService,
  ...formProps
}) => {
  return (
    <PageContext.Provider value={{ title, name, pageMeta, engine, metaService, flowService }}>
      <Form {...formProps}>
        {children}
      </Form>
    </PageContext.Provider>
  )
}
