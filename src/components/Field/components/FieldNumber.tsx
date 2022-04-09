import React from 'react'
import { connect, mapReadPretty } from '@formily/react'
import {
  FieldNumber as ToyboxFieldNumber,
  FieldNumberProps,
} from '@toy-box/meta-components'
import {  mapFieldProps } from '../shared/connect'

type ComposedFieldNumber = React.FC<FieldNumberProps>

export const FieldNumber: ComposedFieldNumber = connect(
  ToyboxFieldNumber,
  mapFieldProps((props, field) => {
    return {
      ...props,
    }
  }),
  mapReadPretty(ToyboxFieldNumber, { mode: 'read' } as FieldNumberProps)
)

export default FieldNumber
