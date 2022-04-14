import React from 'react'
import { IFieldMeta } from '@toy-box/meta-schema'
import { MetaRecalcEngine } from '@toy-box/power-fx'

export interface IPageContextProp {
  title: string
  name: string
  pageMeta: IFieldMeta
  engine: MetaRecalcEngine
}

export const PageContext = React.createContext<IPageContextProp>(null)
