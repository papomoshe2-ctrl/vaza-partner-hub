import { EditorialHero } from '@/components/home/EditorialHero'
import { BusinessProblemSection } from '@/components/home/BusinessProblemSection'
import { BasketValueSection } from '@/components/home/BasketValueSection'
import { CollectionsShowcase } from '@/components/home/CollectionsShowcase'
import { ProfitCalculator } from '@/components/home/ProfitCalculator'
import { StarterPackages } from '@/components/home/StarterPackages'
import { ExistingPartnersSection } from '@/components/home/ExistingPartnersSection'
import { NewStoresSection } from '@/components/home/NewStoresSection'
import { ConciergeContactForm } from '@/components/home/ConciergeContactForm'

export default function HomePage() {
  return (
    <>
      <EditorialHero />
      <BusinessProblemSection />
      <BasketValueSection />
      <CollectionsShowcase />
      <ProfitCalculator />
      <StarterPackages />
      <ExistingPartnersSection />
      <NewStoresSection />
      <ConciergeContactForm />
    </>
  )
}
