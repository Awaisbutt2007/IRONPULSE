// Real gym photography from reachable CDNs (verified live in this network):
// - Bing image CDN (original photos, thumbnail-served)  - YouTube video frames (HD fitness stills)
const BING = (q, w = 1000, h = 800, p = 0) =>
  `https://tse1.mm.bing.net/th?q=${q}&w=${w}&h=${h}&c=7&rs=1&p=${p}`
export const ytImg = (id) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`
export { BING }
const YT = (id) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`

// picsum is the only reachable fallback host here — used if a primary image ever fails
export const fallbackFor = (seed, w = 1000, h = 700) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}?grayscale`

// Curated Unsplash photography — clean, editorial, no text overlays.
// Portrait crops use crop=faces so heads never get cut off.
export const U = (id, w = 1000, h = 800) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&crop=faces,entropy&auto=format&q=72`

export const heroImage = U('1593079831268-3381b0db4a77', 1600, 900)

// Real landscape gym footage (Pexels CDN — verified reachable here). Used as the scroll-scrubbed hero video.
export const heroVideo =
  'https://videos.pexels.com/video-files/5319099/5319099-hd_1920_1080_25fps.mp4'
export const heroVideoPoster = heroImage

export const marqueeWords = [
  'STRENGTH',
  'DISCIPLINE',
  'POWER',
  'SWEAT',
  'GRIT',
  'IRON',
  'FIRE',
  'NO EXCUSES',
]

export const stats = [
  { value: 12, suffix: '+', label: 'Years of Iron' },
  { value: 8500, suffix: '+', label: 'Members Forged' },
  { value: 40, suffix: '', label: 'Elite Coaches' },
  { value: 24, suffix: '/7', label: 'Always Open' },
]

export const programs = [
  {
    title: 'Strength Training',
    desc: 'Compound lifts, progressive overload and raw power under the bar.',
    img: U('1517836357463-d25dfeac3438', 900, 700),
    tag: '01',
  },
  {
    title: 'HIIT Conditioning',
    desc: 'Metabolic spikes that torch fat and build an engine that never quits.',
    img: U('1599058917212-d750089bc07e', 900, 700),
    tag: '02',
  },
  {
    title: 'Hypertrophy',
    desc: 'Muscle-building splits, tempo work and smart volume that adds size.',
    img: U('1507398941214-572c25f4b1dc', 900, 700),
    tag: '03',
  },
  {
    title: 'CrossFit WODs',
    desc: 'Constantly varied functional movement at high intensity, together.',
    img: U('1517963879433-6ad2b056d712', 900, 700),
    tag: '04',
  },
  {
    title: 'Olympic Lifting',
    desc: 'Snatch and clean & jerk coaching for explosive, technical strength.',
    img: U('1605296867304-46d5465a13f1', 900, 700),
    tag: '05',
  },
  {
    title: 'Mobility & Recovery',
    desc: 'Deload, breathe and rebuild — longevity is the real personal record.',
    img: U('1544367567-0f2fcb009e0b', 900, 700),
    tag: '06',
  },
]

export const gallery = [
  { src: U('1526506118085-60ce8714f8c5', 800, 1100), label: 'The Grind', tall: true },
  { src: U('1574680178050-55c6a6a96e0a', 900, 700), label: 'Strength Zone' },
  { src: U('1576678927484-cc907957088c', 800, 1100), label: 'Free Weights', tall: true },
  { src: U('1599058917212-d750089bc07e', 900, 700), label: 'Battle Ropes' },
  { src: U('1574680096145-d05b474e2155', 800, 1100), label: 'Back Day', tall: true },
  { src: U('1605296867304-46d5465a13f1', 900, 700), label: 'Lifting Platforms' },
]

export const coaches = [
  {
    name: 'Marcus Vale',
    role: 'Head of Strength',
    img: U('1567013127542-490d757e51fc', 800, 1000),
    spec: 'Powerlifting · 12 yrs',
  },
  {
    name: 'Elena Cross',
    role: 'Conditioning Lead',
    img: U('1550345332-09e3ac987658', 800, 1000),
    spec: 'HIIT & Metcon · 9 yrs',
  },
  {
    name: 'Dario Kane',
    role: 'Combat Coach',
    img: U('1507398941214-572c25f4b1dc', 800, 1000),
    spec: 'Boxing & MMA · 14 yrs',
  },
  {
    name: 'Sofia Reyes',
    role: 'Olympic Lifting',
    img: U('1541534741688-6078c6bfb5c5', 800, 1000),
    spec: 'Snatch & C&J · 8 yrs',
  },
  {
    name: 'Jamal Steele',
    role: 'Mobility Coach',
    img: U('1579758629938-03607ccdbaba', 800, 1000),
    spec: 'FRC & Rehab · 7 yrs',
  },
  {
    name: 'Ivy Chen',
    role: 'Nutrition Coach',
    img: U('1594381898411-846e7d193883', 800, 1000),
    spec: 'Sports Nutrition · 6 yrs',
  },
]

export const plans = [
  {
    name: 'Drop-In',
    price: 29,
    period: '/day',
    features: ['Full gym floor access', 'Group class trial', 'Locker & showers'],
    featured: false,
  },
  {
    name: 'Membership',
    price: 89,
    period: '/mo',
    features: [
      'Unlimited 24/7 access',
      'All group programs',
      '1 coaching session / mo',
      'InBody progress scans',
    ],
    featured: true,
  },
  {
    name: 'Elite',
    price: 199,
    period: '/mo',
    features: [
      'Everything in Membership',
      'Weekly 1-on-1 coaching',
      'Custom nutrition plan',
      'Recovery & sauna suite',
    ],
    featured: false,
  },
]

export const aboutImages = {
  story: U('1571902943202-507ec2618e8f', 1200, 900),
  community: U('1518611012118-696072aa579a', 1000, 1250),
  equipment: U('1534438327276-14e5300c3a48', 1000, 750),
}

export const values = [
  {
    title: 'No Shortcuts',
    text: 'Progress is earned under the bar. We coach process, not gimmicks.',
  },
  {
    title: 'Community First',
    text: 'A floor where beginners and competitors train shoulder to shoulder.',
  },
  {
    title: 'Science Backed',
    text: 'Programming rooted in exercise physiology — tested on real humans.',
  },
  {
    title: 'Relentless Standards',
    text: 'Clean equipment, honest coaching, and a gym that never closes.',
  },
]

export const contactInfo = {
  address: '21 Ironworks Ave, Block C, Lahore',
  phone: '+92 300 1234567',
  email: 'train@ironpulse.fit',
  hours: 'Open 24 / 7 — Staffed 6AM to 11PM',
}

// Scroll-driven hero story chapters (revealed step by step as the video scrubs)
export const heroChapters = [
  {
    kicker: 'This is not a gym.',
    title: 'It\'s a forge.',
    text: '8,500 members walk in as they are. They leave as what they chose to become.',
  },
  {
    kicker: 'Coaches, not countdown clocks.',
    title: 'Every plan has a brain.',
    text: '40 elite coaches programming on science — tested under real iron, not Instagram.',
  },
  {
    kicker: 'Your chapter starts here.',
    title: 'Pick up the bar.',
    text: 'First week is on us. No contracts, no excuses — just your first honest rep.',
  },
]

// The IRONPULSE method — the site's narrative spine
export const methodSteps = [
  {
    num: '01',
    title: 'Assess',
    text: 'Every story starts with the truth. An InBody scan, a movement screen and a real conversation — we measure where you actually are before anyone writes a single set.',
    img: U('1567013127542-490d757e51fc', 1100, 800),
  },
  {
    num: '02',
    title: 'Program',
    text: 'Your coach builds one plan with your name on it — progressive, periodised and honest. Not a PDF copied from a template, but a route drawn for your body and your life.',
    img: U('1584735935682-2f2b69dff9d2', 1100, 800),
  },
  {
    num: '03',
    title: 'Execute',
    text: 'On the floor, you are never alone. Coached sessions, timed rounds, chalk on your hands and a room that trains with you — intensity you can feel.',
    img: U('1517963879433-6ad2b056d712', 1100, 800),
  },
  {
    num: '04',
    title: 'Evolve',
    text: 'Every six weeks we re-test, re-load and re-aim. The mirror lies, the numbers do not — your progress is documented like a case file.',
    img: U('1581009146145-b5ef050c2e1e', 1100, 800),
  },
]

// Facilities — under one roof
export const facilities = [
  {
    title: 'Free-Weight Hall',
    text: 'Dumbbells to 60kg, eight lifting platforms and calibrated plates.',
    img: U('1534438327276-14e5300c3a48', 800, 600),
  },
  {
    title: 'Machine Zone',
    text: 'Cable stacks, plate-loaded machines and a dedicated pulley row.',
    img: U('1507398941214-572c25f4b1dc', 800, 600),
  },
  {
    title: 'Conditioning Deck',
    text: 'Ski ergs, assault bikes, ropes and a 30m sprint turf.',
    img: U('1599058917212-d750089bc07e', 800, 600),
  },
  {
    title: 'Recovery Suite',
    text: 'Sauna, ice bath and mobility class to keep you in the game.',
    img: U('1544367567-0f2fcb009e0b', 800, 600),
  },
  {
    title: 'Group Studio',
    text: 'Cyclorama-lit class room for HIIT, spin and mobility blocks.',
    img: U('1518611012118-696072aa579a', 800, 600),
  },
  {
    title: 'Gear Room',
    text: 'Bands, straps, belts and chalk — everything you need, on hand.',
    img: U('1584735935682-2f2b69dff9d2', 800, 600),
  },
]

// Member results — social proof
export const testimonials = [
  {
    quote:
      'I walked in unable to do a single push-up. Eight months later I deadlift twice my bodyweight. The coaching here is honest and relentless.',
    name: 'Ayesha Khan',
    result: 'Down 14kg · 2× bodyweight deadlift',
    img: U('1532384748853-8f54a8f476e2', 300, 300),
  },
  {
    quote:
      'The assessment-first approach changed everything. No guesswork, just a plan and coaches who actually watch me lift.',
    name: 'Bilal Ahmed',
    result: 'Bench 60kg → 110kg in a year',
    img: U('1581009146145-b5ef050c2e1e', 300, 300),
  },
  {
    quote:
      'As a competitor I needed a room that trains like it means it. IRONPULSE is that room — the energy is unreal at 6am.',
    name: 'Hina Raza',
    result: 'National Physique finalist',
    img: U('1594381898411-846e7d193883', 300, 300),
  },
]

// Cinematic manifesto band
export const manifesto = {
  eyebrow: 'The IRONPULSE creed',
  lines: ['We don\'t sell memberships.', 'We build athletes.', 'One honest rep at a time.'],
}
