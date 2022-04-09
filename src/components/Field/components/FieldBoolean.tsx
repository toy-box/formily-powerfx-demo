import React from 'react'
import { connect, mapReadPretty } from '@formily/react'
import {
  FieldBoolean as ToyboxFieldBoolean,
  FieldBooleanProps,
} from '@toy-box/meta-components'
import {  mapFieldProps } from '../shared/connect'

type ComposedFieldBoolean = React.FC<FieldBooleanProps>

export const FieldBoolean: ComposedFieldBoolean = connect(
  ToyboxFieldBoolean,
  mapFieldProps((props, field) => {
    return {
      ...props,
    }
  }),
  mapReadPretty(ToyboxFieldBoolean, { mode: 'read' } as FieldBooleanProps)
)

export default FieldBoolean
