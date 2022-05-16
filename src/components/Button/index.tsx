import React, { useCallback } from 'react'
import { Button as ToyboxButton } from '@toy-box/toybox-ui'
import { usePage } from '../../hooks/usePage'


export type ButtonProps = {
  onClick: string
  caption: React.ReactNode
  enableConfirm?: boolean
  confirmMessage?: string
}

export const Button: React.FC<ButtonProps> = ({
  onClick: script,
  caption,
  ...otherProps
}) => {  
  const page = usePage()
  const handleClick = useCallback(() => {
    page.engine.eval(script)
  }, [page.engine, script])
  return (
    <ToyboxButton onClick={handleClick} {...otherProps}>
      {caption}
    </ToyboxButton>
  )
}
