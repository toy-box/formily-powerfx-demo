import React from 'react'
import { connect, mapReadPretty } from '@formily/react'
import {
  FieldSelect as OrgFieldSelect,
  FieldSelectProps,
} from '@toy-box/meta-components'
import {  mapFieldProps } from '../shared/connect'

type ComposedFieldSelect = React.FC<FieldSelectProps>

export const FieldSelect: ComposedFieldSelect = connect(
  OrgFieldSelect,
  mapFieldProps((props, field) => {
    return {
      ...props,
    }
  }),
  mapReadPretty(OrgFieldSelect, { mode: 'read' } as FieldSelectProps)
)

export default FieldSelect
