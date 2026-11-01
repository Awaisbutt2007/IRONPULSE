import PageHeader from '../components/PageHeader'
import Coaches from '../components/Coaches'
import Stats from '../components/Stats'
import CTA from '../components/CTA'
import { U } from '../data'

export default function Trainers() {
  return (
    <>
      <PageHeader
        eyebrow="Your commanders"
        title="The Coaches"
        image={U('1567013127542-490d757e51fc', 1600, 900)}
      />
      <Coaches showHeading={false} />
      <Stats />
      <CTA />
    </>
  )
}
