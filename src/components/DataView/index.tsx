import React, { useEffect, useState } from 'react'
import { ObjectField } from '@formily/core'
import { IFieldMeta } from '@toy-box/meta-schema'
import { observer, useField } from '@formily/react'
import { useMetaService } from '../../hooks/useMetaService'
// import { pick } from '@toy-box/toybox-shared'

export enum DataValueSourceType {
  ParamId = 'paramId', // Get Record ID from param
  ParamValue = 'paramValue', // Get Record data from param
  FormId = 'formId', // Get Recrod ID from form
  FormValue = 'formValue', // Get Recrod data from form
}

export type DataValueSource = {
  type: DataValueSourceType
  path: string
}

export type DataViewProps = {
  className?: string
  style?: React.CSSProperties
  dataRepository: string
  onSuccess?: string
  onFail?: string
}

export type DataViewContextProps = {
  metaSchema?: IFieldMeta
}

export const DataViewContext = React.createContext<DataViewContextProps>(null)

export const DataView: React.FC<DataViewProps> = observer(
  ({ className, style, dataRepository, onSuccess, onFail, children }) => {
    const field = useField<ObjectField>()
    const [objectId, setObjectId] = useState<string>()
    const metaService = useMetaService()

    useEffect(() => {
      metaService
        .findById(dataRepository, objectId)
        .then((value) => field.setValue(value))
    },[dataRepository, field, metaService, objectId])


    return (
      <DataViewContext.Provider value={{}}>
        <form className={className} style={style}>
          {children}
        </form>
      </DataViewContext.Provider>
    )
  }
)
