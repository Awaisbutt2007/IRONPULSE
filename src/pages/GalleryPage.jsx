import PageHeader from '../components/PageHeader'
import CTA from '../components/CTA'
import Gallery from '../components/Gallery'
import { gallery, U } from '../data'

const extra = [
  { src: U('1595078475328-1ab05d0a6a0e', 900, 700), label: 'Chalk Up' },
  { src: U('1558611848-73f7eb4001a1', 800, 1100), label: 'Rack Room', tall: true },
  { src: U('1594737625785-a6cbdabd333c', 900, 700), label: 'Core & Power' },
  { src: U('1541534741688-6078c6bfb5c5', 800, 1100), label: 'Pull Station', tall: true },
  { src: U('1518611012118-696072aa579a', 900, 700), label: 'Mat Studio' },
  { src: U('1583454110551-21f2fa2afe61', 800, 1100), label: 'Dumbbell Row', tall: true },
  { src: U('1556817411-31ae72fa3ea0', 900, 700), label: 'Deadlift Bay' },
  { src: U('1549060279-7e168fcee0c2', 900, 700), label: 'The Grip' },
]

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Inside the temple"
        title="The Gallery"
        image={U('1593079831268-3381b0db4a77', 1600, 900)}
      />
      <Gallery
        items={[...gallery, ...extra]}
        title="Every Corner"
        eyebrow="Walk the floor"
      />
      <CTA />
    </>
  )
}
