import React from 'react'
import { IFieldMeta } from '@toy-box/meta-schema'

export interface IPageContextProp {
  title: string
  name: string
  pageMeta: IFieldMeta
}

export const PageContext = React.createContext<IPageContextProp>(null)
