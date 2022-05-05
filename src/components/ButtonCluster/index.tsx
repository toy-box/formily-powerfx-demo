import React, { FC } from 'react'
import {
  ButtonCluster as OrgButtonCluster,
  IButtonClusterProps,
  IButtonItem,
} from '@toy-box/toybox-ui'
import { usePage } from '../Page/hooks/usePage'

export type ButtonItemType = Omit<IButtonItem, 'callback'> & {
  onClick?: string
}

export type ButtonClusterProps = Omit<IButtonClusterProps, 'items'> & {
  items: ButtonItemType[]
}

export const ButtonCluster: FC<ButtonClusterProps> = ({
  items,
  max = 3,
  group,
}) => {
  const page = usePage()

  const buttonItems = React.useMemo(() => {
    return items.map((item) => ({
      ...item,
      callback: () => page.engine.eval(item.onClick),
    }))
  }, [items, page.engine])

  return <OrgButtonCluster items={buttonItems} max={max} group={group} />
}
