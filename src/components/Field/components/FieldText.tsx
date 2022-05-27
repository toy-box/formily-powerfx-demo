import React from 'react'
import { connect, mapReadPretty } from '@formily/react'
import {
  FieldText as ToyboxFieldText,
  FieldTextProps,
} from '@toy-box/meta-components'
import {  mapFieldProps } from '../shared/connect'

type ComposedFieldText = React.FC<FieldTextProps>

export const FieldText: ComposedFieldText = connect(
  ToyboxFieldText,
  mapFieldProps((props, field) => {
    return {
      ...props,
    }
  }),
  mapReadPretty(ToyboxFieldText, { mode: 'read' } as FieldTextProps)
)
