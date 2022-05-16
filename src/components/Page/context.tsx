import React from 'react'
import { IFieldMeta } from '@toy-box/meta-schema'
import { MetaRecalcEngine } from '@toy-box/power-fx'
import { MetaService } from '../../services/MetaService'

export interface IPageContextProp {
  title: string
  name: string
  pageMeta: IFieldMeta
  engine: MetaRecalcEngine
  metaService: MetaService
}

export const PageContext = React.createContext<IPageContextProp>(null)
