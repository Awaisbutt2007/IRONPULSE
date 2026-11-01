import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import StoryIntro from '../components/StoryIntro'
import Stats from '../components/Stats'
import Method from '../components/Method'
import Programs from '../components/Programs'
import Facilities from '../components/Facilities'
import Manifesto from '../components/Manifesto'
import Gallery from '../components/Gallery'
import Testimonials from '../components/Testimonials'
import Coaches from '../components/Coaches'
import CTA from '../components/CTA'

/*
 * Narrative order — the page reads as one story:
 * hero (the promise) → why we exist → the proof in numbers → the method →
 * what you can train → what it's built from → the creed → the floor →
 * member results → the coaches → the invitation.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <StoryIntro />
      <Stats />
      <Method />
      <Programs limit={3} />
      <div className="section-home-cta">
        <Link to="/programs" className="btn btn-ghost">
          <span>View All Programs</span>
        </Link>
      </div>
      <Facilities />
      <Manifesto />
      <Gallery />
      <Testimonials />
      <Coaches limit={3} />
      <CTA />
    </>
  )
}
