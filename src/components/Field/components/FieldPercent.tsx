import React from 'react'
import { connect, mapReadPretty } from '@formily/react'
import {
  FieldPercent as ToyboxFieldPercent,
  FieldPercentProps,
} from '@toy-box/meta-components'
import {  mapFieldProps } from '../shared/connect'

type ComposedFieldPercent = React.FC<FieldPercentProps>

export const FieldPercent: ComposedFieldPercent = connect(
  ToyboxFieldPercent,
  mapFieldProps((props, field) => {
    return {
      ...props,
    }
  }),
  mapReadPretty(ToyboxFieldPercent, { mode: 'read' } as FieldPercentProps)
)

export default FieldPercent
