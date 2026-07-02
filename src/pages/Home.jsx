import Hero from '../components/home/Hero'
import Brands from '../components/home/Brands'
import LatestPhones from '../components/home/LatestPhones'
import SpecialOffers from '../components/home/SpecialOffers'
import Services from '../components/home/Services'
import ReviewsPreview from '../components/home/ReviewsPreview'

export default function Home() {
  return (
    <main>
      <Hero />
      <Brands />
      <LatestPhones />
      <SpecialOffers />
      <Services />
      <ReviewsPreview />
    </main>
  )
}
