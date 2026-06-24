export interface Listing {
  id: string
  name: string
  creator_name: string
  category: string
  rating: number
  review_count: number
  hire_count: number
  pricing: string
  short_description: string
  full_description: string | null
  what_it_does: string | null
  who_its_for: string | null
  external_link: string
  creator_website: string | null
  demo_video_url: string | null
  tags: string[]
  status: string
  slug?: string
  typical_outcomes?: string[]
  skills?: string[]
}

export const MOCK_LISTINGS: Listing[] = []
