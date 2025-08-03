import type { SocialMediaKey } from '@/schemas'
import { capitalize, isEmpty } from '@zl-asica/react/utils'
import {
  FaBilibili,
  FaEnvelope,
  FaGithub,
  FaMusic,
  FaQq,
  FaRss,
  FaTelegram,
  FaTwitter,
} from 'react-icons/fa6'

interface SocialMediaDataItem {
  urlTemplate: string
  icon: React.ComponentType<{ size: number, className?: string }>
}

type SocialData = Record<SocialMediaKey, SocialMediaDataItem>

const socialDataTemplate: SocialData = {
  github_username: {
    urlTemplate: 'https://github.com/{username}',
    icon: FaGithub,
  },
  telegram_username: {
    urlTemplate: 'https://t.me/{username}',
    icon: FaTelegram,
  },
  music_id: {
    urlTemplate: 'https://music.163.com/#/user/home?id={username}',
    icon: FaMusic,
  },
  twitter_username: {
    urlTemplate: 'https://twitter.com/{username}',
    icon: FaTwitter,
  },
  bilibili_id: {
    urlTemplate: 'https://space.bilibili.com/{username}',
    icon: FaBilibili,
  },
  email: {
    urlTemplate: 'mailto:{username}',
    icon: FaEnvelope,
  },
  rss: {
    urlTemplate: '{username}',
    icon: FaRss,
  },
  qq: {
    urlTemplate: 'https://qm.qq.com/q/{username}',
    icon: FaQq,
  },
}

export const generateSocialMediaLink = (
  key: SocialMediaKey | string,
  username: string | number | boolean | null,
  onlyExternal: boolean = false,
): {
  href: string
  IconComponent: React.ComponentType<{ size: number, className?: string }>
} | null => {
  // Special handling for RSS - check if it's explicitly disabled
  if (key === 'rss') {
    // If username is false, null, or falsy string, don't show RSS
    if (username === false || username === 'false' || username === null || username === 'null' || username === 'undefined' || username === 'none' || (typeof username === 'string' && username.trim() === '')) {
      return null
    }
    // Skip RSS for external-only requests
    if (onlyExternal) {
      return null
    }
    // Show RSS icon linking to /feed.xml
    return {
      href: '/feed.xml',
      IconComponent: socialDataTemplate.rss.icon,
    }
  }

  // Convert username to string for validation
  const usernameStr = username === null ? null : String(username)

  // Validate username for all other social media
  if (usernameStr === null || usernameStr.trim() === '' || isEmpty(usernameStr) || usernameStr === 'null' || usernameStr === 'undefined' || usernameStr === 'none') {
    return null
  }

  // Skip internal links if onlyExternal is true
  if (onlyExternal && key === 'email') {
    return null
  }

  // Check if key exists in socialDataTemplate
  if (!(key in socialDataTemplate)) {
    return null
  }

  const { urlTemplate, icon: IconComponent } = socialDataTemplate[key as keyof typeof socialDataTemplate]
  let href: string

  if (key === 'email') {
    // For email, validate it's not empty after trimming
    const trimmedEmail = usernameStr.trim()
    if (!trimmedEmail) {
      return null
    }
    href = `mailto:${trimmedEmail}`
  }
  else {
    // For all other social media, use the template
    href = urlTemplate.replace('{username}', encodeURIComponent(usernameStr.trim()))
  }

  return { href, IconComponent }
}

/**
 * Generates social media data for a given key and username.
 * Returns an object containing the href, label, and icon component.
 * If the key or username is invalid, returns null.
 *
 * @param key - The social media key (e.g., 'github_username', 'email', 'rss').
 * @param username - The username or identifier for the social media profile.
 * @param onlyExternal - If true, only generates external links (skips email and RSS).
 * @returns An object containing the link, label, and icon component, or null if invalid.
 */
export const generateSocialMediaData = (
  key: SocialMediaKey | string,
  username: string | number | boolean | null,
  onlyExternal: boolean = false,
): {
  href: string
  label: string
  IconComponent: React.ComponentType<{ size: number, className?: string }>
} | null => {
  const linkRes = generateSocialMediaLink(key, username, onlyExternal)
  if (linkRes === null) {
    return null
  }
  const { href, IconComponent } = linkRes
  const label = capitalize(key.replace(/_/g, ' '))
  return {
    href,
    label,
    IconComponent,
  }
}
