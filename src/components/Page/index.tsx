import React from 'react'
import { Form, FormProps } from '@formily/antd'
import { PageContext } from './context'
import { IFieldMeta } from '@toy-box/meta-schema'
import { MetaRecalcEngine } from '@toy-box/power-fx'
import { MetaService } from '../../services/MetaService'

export type PageProps = {
  title: string
  name: string
  pageMeta: IFieldMeta
  engine: MetaRecalcEngine
  metaService: MetaService
} & FormProps

export const Page: React.FC<PageProps> = ({
  title,
  name,
  pageMeta,
  engine,
  children,
  metaService,
  ...formProps
}) => {
  return (
    <PageContext.Provider value={{ title, name, pageMeta, engine, metaService }}>
      <Form {...formProps}>
        {children}
      </Form>
    </PageContext.Provider>
  )
}
