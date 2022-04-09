import React from 'react'
import { Form, FormProps } from '@formily/antd'
import { PageContext } from './context'
import { IFieldMeta } from '@toy-box/meta-schema'

export type PageProps = {
  title: string
  name: string
  pageMeta: IFieldMeta
} & FormProps

export const Page: React.FC<PageProps> = ({
  title,
  name,
  pageMeta,
  children,
  ...formProps
}) => {
  return (
    <PageContext.Provider value={{ title, name, pageMeta }}>
      <Form {...formProps}>
        {children}
      </Form>
    </PageContext.Provider>
  )
}
