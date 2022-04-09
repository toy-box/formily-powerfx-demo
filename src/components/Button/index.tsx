import React from 'react'
import { Button as ToyboxButton, IButtonProps } from '@toy-box/toybox-ui'


export type ButtonProps = Pick<IButtonProps, 'onClick'> & {
  caption: React.ReactNode
  enableConfirm?: boolean
  confirmMessage?: string
}

export const Button: React.FC<ButtonProps> = ({
  caption,
  ...otherProps
}) => {  
  return (
    <ToyboxButton {...otherProps}>
      {caption}
    </ToyboxButton>
  )
}
