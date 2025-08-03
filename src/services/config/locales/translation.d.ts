interface Translation {
  home: {
    title: string
  }
  posts: {
    title: string
    description: string
  }
  search: {
    title: string
    prompt: string
    allCategories: string
    categoriesAria: string
    allTags: string
    tagsAria: string
    clear: string
    loading: string
    submit: string
    noResultsFound: string
  }
  friends: {
    title: string
    description: string
    avatar: string
  }
  fc: {
    title: string
    description: string
  }
  about: {
    title: string
    description: string
  }
  anime: {
    title: string
    description: string
    source: string
    // const SORT_ORDER = ['CURRENT', 'REPEATING', 'COMPLETED', 'DROPPED', 'PAUSED', 'PLANNING']
    status: {
      current: string
      repeating: string
      completed: string
      dropped: string
      paused: string
      planning: string
    }
  }
  more: {
    title: string
    description: string
  }
  post: {
    thumbnail: string
    readMore: string
    copy: string
    copied: string
    categories: string
    noCategories: string
    tags: string
    noTags: string
    toc: string
    tocToggle: string
    copyright: {
      author: string
      title: string
      link: string
      copyright: {
        start: string
        end: string
      }
    }
  }
  aria: {
    travellings: string
    theme: string
    pagination: {
      label: string
      prev: string
      next: string
      current: string
      goTo: string
    }
  }
  newTab: string
  navigate: string
}
