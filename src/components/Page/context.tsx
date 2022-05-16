import React from 'react'
import { IFieldMeta } from '@toy-box/meta-schema'
import { MetaRecalcEngine } from '@toy-box/power-fx'
import { MetaService } from '../../services/MetaService'
import { FlowService } from '../../services'

export interface IPageContextProp {
  title: string
  name: string
  pageMeta: IFieldMeta
  engine: MetaRecalcEngine
  metaService: MetaService
  flowService: FlowService
}

export const PageContext = React.createContext<IPageContextProp>(null)
