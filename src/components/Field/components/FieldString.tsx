import React from 'react'
import { connect, mapReadPretty } from '@formily/react'
import {
  FieldString as ToyboxFieldString,
  FieldStringProps,
} from '@toy-box/meta-components'
import {  mapFieldProps } from '../shared/connect'

type ComposedFieldDate = React.FC<FieldStringProps>

export const FieldString: ComposedFieldDate = connect(
  ToyboxFieldString,
  mapFieldProps((props, field) => {
    return {
      ...props,
    }
  }),
  mapReadPretty(ToyboxFieldString, { mode: 'read' } as FieldStringProps)
)
