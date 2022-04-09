import React from 'react'
import { connect, mapReadPretty } from '@formily/react'
import {
  FieldDate as ToyBoxFieldDate,
  FieldDateProps,
} from '@toy-box/meta-components'
import {  mapFieldProps } from '../shared/connect'

type ComposedFieldDate = React.FC<FieldDateProps>

export const FieldDate: ComposedFieldDate = connect(
  ToyBoxFieldDate,
  mapFieldProps((props, field) => {
    return {
      ...props,
    }
  }),
  mapReadPretty(ToyBoxFieldDate, { mode: 'read' } as FieldDateProps)
)

export default FieldDate
