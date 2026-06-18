import { HeroSection } from '@/components/home/HeroSection'
import { BenefitsSection } from '@/components/home/BenefitsSection'
import { CategoriesSection } from '@/components/home/CategoriesSection'
import { ProfitCalculator } from '@/components/home/ProfitCalculator'
import { PackagesSection } from '@/components/home/PackagesSection'
import { BrandSection } from '@/components/home/BrandSection'
import { SuccessStoriesSection } from '@/components/home/SuccessStoriesSection'
import { ContactSection } from '@/components/home/ContactSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BenefitsSection />
      <CategoriesSection />
      <ProfitCalculator />
      <PackagesSection />
      <BrandSection />
      <SuccessStoriesSection />
      <ContactSection />
    </>
  )
}
