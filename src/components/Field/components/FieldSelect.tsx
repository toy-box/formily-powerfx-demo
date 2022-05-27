import React from 'react'
import { connect, mapReadPretty } from '@formily/react'
import {
  FieldSelect as ToyboxFieldSelect,
  FieldSelectProps,
} from '@toy-box/meta-components'
import {  mapFieldProps } from '../shared/connect'

type ComposedFieldSelect = React.FC<FieldSelectProps>

export const FieldSelect: ComposedFieldSelect = connect(
  ToyboxFieldSelect,
  mapFieldProps((props, field) => {
    return {
      ...props,
    }
  }),
  mapReadPretty(ToyboxFieldSelect, { mode: 'read' } as FieldSelectProps)
)

export default FieldSelect
