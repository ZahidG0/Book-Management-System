import { useEffect } from 'react'

const SEO = ({ 
  title = "BookClub - Your Ultimate Book Management & Reading Community",
  description = "Discover, manage, and enjoy thousands of books with BookClub. Join our reading community, access eBooks, and get personalized recommendations.",
  keywords = "books, reading, ebooks, book management, book club, digital library",
  image = "/assets/og-image.jpg",
  url = window.location.href,
  type = "website"
}) => {
  useEffect(() => {
    // Update title
    document.title = title

    // Update meta tags
    const updateMeta = (name, content) => {
      let element = document.querySelector(`meta[name="${name}"]`) || 
                   document.querySelector(`meta[property="${name}"]`)
      if (element) {
        element.setAttribute('content', content)
      }
    }

    updateMeta('description', description)
    updateMeta('keywords', keywords)
    updateMeta('og:title', title)
    updateMeta('og:description', description)
    updateMeta('og:image', image)
    updateMeta('og:url', url)
    updateMeta('og:type', type)
    updateMeta('twitter:title', title)
    updateMeta('twitter:description', description)
    updateMeta('twitter:image', image)
    updateMeta('twitter:url', url)

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) {
      canonical.setAttribute('href', url)
    }
  }, [title, description, keywords, image, url, type])

  return null
}

export default SEO