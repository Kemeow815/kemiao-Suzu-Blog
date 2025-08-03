// app/blog/page.tsx
import { FriendCircleLite } from '@/components/FriendCircleLite'

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8 text-center">友链朋友圈(如果无画面，刷新一下)</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <FriendCircleLite
          apiUrl="https://fc.314926.xyz/"
          pageTurningNumber={24}
          errorImage="https://pic.imgdb.cn/item/6695daa4d9c307b7e953ee3d.jpg"
        />
      </div>
    </div>
  )
}
