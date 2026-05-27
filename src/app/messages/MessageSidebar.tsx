'use client'

import { Chip } from '@nextui-org/react'
import clsx from 'clsx'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { MdOutlineInbox, MdOutlineOutbox } from 'react-icons/md'

export default function MessageSidebar() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const [selected, setSelected] = useState<string>(searchParams.get('container') || 'inbox')
  
  const items = [
    {
      key: 'inbox',
      label: 'Inbox',
      icon: MdOutlineInbox,
      chip: true,
    },
    {
      key: 'outbox',
      label: 'Outbox',
      icon: MdOutlineOutbox,
      chip: false,
    }
  ]

  const handleSelect = (key: string) => {
    setSelected(key)
    const params = new URLSearchParams()
    params.set('container', key)
    router.replace(`${pathname}?${params}`)
  }
  
  return (
    <div className='flex flex-col shadow-md rounded cursor-pointer'>
      {items.map(({ key, icon: Icon, label, chip }) => (
        <div
          key={key}
          className={
            clsx(
              'flex flex-row items-center rounded-t gap-2 p-3', {
                'text-main font-medium': selected === key,
                'text-dark hover:text-main transitioning': selected !== key
              }
            )
          }
          onClick={() => {handleSelect(key)}}
        >
          <Icon size={24} />
          <div className='flex justify-between flex-grow'>
            <span>
              {label}
            </span>
            {chip && (
              <Chip className='bg-main text-light'>
                5
              </Chip>
            )}
          </div>
        </div>
      )) }
    </div>
  )
}