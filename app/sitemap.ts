import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

const BASE_URL = 'https://hirezentro.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/employees`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/submit`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/creators`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/jobs`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.8,
    },
  ]

  // Dynamic listing pages
  let listingRoutes: MetadataRoute.Sitemap = []
  try {
    const supabase = await createClient()
    const { data: listings } = await supabase
      .from('listings')
      .select('id, updated_at')
      .eq('status', 'approved')

    if (listings && listings.length > 0) {
      listingRoutes = listings.map((listing) => ({
        url: `${BASE_URL}/employee/${listing.id}`,
        lastModified: listing.updated_at ? new Date(listing.updated_at) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }))
    }
  } catch {
    // If DB is unreachable during build, skip dynamic routes
  }

  return [...staticRoutes, ...listingRoutes]
}
