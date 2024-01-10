'use client'

import { MouseEventHandler } from 'react'

import { cn } from '@/lib/utils'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger
} from '@/components/ui/menubar'

type TProps = {
  trigger: string | React.ReactNode
  actions: { name: string; action: MouseEventHandler<HTMLDivElement> }[]
}

export default function CMenu({ trigger, actions }: TProps) {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>{trigger}</MenubarTrigger>
        <MenubarContent>
          {actions.map((action, idx) => (
            <div key={idx}>
              <MenubarItem
                className={cn(
                  action.name === 'accept'
                    ? 'text-emerald-500'
                    : action.name === 'reject'
                      ? 'text-primary'
                      : ''
                )}
                onClick={action.action}
              >
                {action.name}
              </MenubarItem>
              {idx + 1 !== actions.length && <MenubarSeparator />}
            </div>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
