import Link from 'next/link'

interface ListingCardProps {
  listing: {
    id: string
    name: string
    category: string
    short_description: string
    creator_name: string
    rating: number
    review_count: number
    pricing: string
    tags: string[]
  }
}

const categoryColors: Record<string, string> = {
  Sales: 'bg-blue-100 text-blue-700',
  Marketing: 'bg-pink-100 text-pink-700',
  Research: 'bg-purple-100 text-purple-700',
  'Amazon FBA': 'bg-orange-100 text-orange-700',
  Recruiting: 'bg-green-100 text-green-700',
  'Real Estate': 'bg-yellow-100 text-yellow-700',
  Productivity: 'bg-indigo-100 text-indigo-700',
  Support: 'bg-teal-100 text-teal-700',
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3.5 h-3.5 ${star <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function ListingCard({ listing }: ListingCardProps) {
  const badgeColor = categoryColors[listing.category] || 'bg-gray-100 text-gray-700'

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-shadow flex flex-col gap-3">
      {/* Top row: category badge + rating */}
      <div className="flex items-center justify-between">
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${badgeColor}`}>
          {listing.category}
        </span>
        <div className="flex items-center gap-1.5">
          <StarRating rating={listing.rating} />
          <span className="text-xs text-gray-500">
            {listing.rating > 0 ? listing.rating.toFixed(1) : '—'}
            {listing.review_count > 0 && <span className="ml-0.5">({listing.review_count})</span>}
          </span>
        </div>
      </div>

      {/* Name + creator */}
      <div>
        <h3 className="font-semibold text-gray-900 text-base leading-snug">{listing.name}</h3>
        <p className="text-xs text-gray-500 mt-0.5">by {listing.creator_name}</p>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 line-clamp-2 flex-1">{listing.short_description}</p>

      {/* Tags */}
      {listing.tags && listing.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {listing.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs bg-gray-50 text-gray-500 px-2 py-0.5 rounded-full border border-gray-100">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Bottom: pricing + CTA */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-50">
        <span className="font-bold text-gray-900 text-sm">{listing.pricing}</span>
        <Link
          href={`/employee/${listing.id}`}
          className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          View Employee →
        </Link>
      </div>
    </div>
  )
}
