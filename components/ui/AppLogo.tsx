'use client'

import Image from 'next/image'
import { useState } from 'react'

interface Props {
  src: string | undefined
  name: string
  size?: number
  className?: string
}

export function AppLogo({ src, name, size = 32, className = '' }: Props) {
  const [failed, setFailed] = useState(false)
  const initials = name.slice(0, 2).toUpperCase()

  return (
    <div
      className={`overflow-hidden flex items-center justify-center bg-[#f9f9f8] border border-[#e1dfda] rounded-full ${className}`}
      style={{ width: size, height: size, minWidth: size }}
    >
      {src && !failed ? (
        <Image
          src={src}
          alt={name}
          width={size}
          height={size}
          className="object-cover w-full h-full"
          onError={() => setFailed(true)}
        />
      ) : (
        <span
          className="font-bold text-[#9D9B96]"
          style={{ fontSize: Math.max(9, size * 0.3) }}
        >
          {initials}
        </span>
      )}
    </div>
  )
}
