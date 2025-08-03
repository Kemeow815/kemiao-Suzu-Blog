// components/FriendCircleLite.tsx
'use client'

import Script from 'next/script'
import { useEffect } from 'react'

declare global {
  interface Window {
    UserConfig?: {
      private_api_url: string
      page_turning_number?: number
      error_img?: string
    }
  }
}

interface FriendCircleLiteProps {
  apiUrl: string
  pageTurningNumber?: number
  errorImage?: string
}

export const FriendCircleLite = ({
  apiUrl,
  pageTurningNumber = 24,
  errorImage = 'https://pic.imgdb.cn/item/6695daa4d9c307b7e953ee3d.jpg',
}: FriendCircleLiteProps) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.UserConfig = {
        private_api_url: apiUrl,
        page_turning_number: pageTurningNumber,
        error_img: errorImage,
      }
    }
  }, [apiUrl, pageTurningNumber, errorImage])

  return (
    <>
      <div id="friend-circle-lite-root"></div>
      <link
        rel="stylesheet"
        href="https://fastly.jsdelivr.net/gh/willow-god/Friend-Circle-Lite/main/fclite.min.css"
      />
      <Script
        src="https://fastly.jsdelivr.net/gh/willow-god/Friend-Circle-Lite/main/fclite.min.js"
        strategy="afterInteractive"
      />
    </>
  )
}
