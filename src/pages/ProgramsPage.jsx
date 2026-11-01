import PageHeader from '../components/PageHeader'
import Programs from '../components/Programs'
import Marquee from '../components/Marquee'
import CTA from '../components/CTA'
import { U } from '../data'

export default function ProgramsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Train with purpose"
        title="Our Programs"
        image={U('1517836357463-d25dfeac3438', 1600, 900)}
      />
      <Marquee />
      <Programs showHeading={false} />
      <CTA />
    </>
  )
}
