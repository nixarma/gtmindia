const programmes = [
  {
    index: '01 / Virtual',
    desc: 'Online sessions covering presales craft, tools, and live war stories from practitioners across the country. Monthly.',
    title: <><span>Presales India </span><em>Virtual</em></>,
    meta: ['Monthly', 'Free · Online'],
  },
  {
    index: '02 / In-person',
    desc: 'Small evening meetups for SE / presales folks. Bangalore, Hyderabad, Mumbai, Delhi. Different topic every city, every month.',
    title: <><span>Presales India </span><em>Meetups</em></>,
    meta: ['Monthly', '4 cities'],
  },
  {
    index: '03 / Leadership',
    desc: 'Quarterly SE Leadership Forum. Off-the-record sessions on team strategy, hiring, and the business of presales. Invite-only.',
    title: <><em>SELF</em><span> — SE Leadership Forum</span></>,
    meta: ['Quarterly', 'By invitation'],
  },
]

export function ProgrammesSection() {
  return (
    <section className="programmes" id="presales-india">
      <div className="container">
        <div className="section-head">
          <h2>What we <em>run</em>.</h2>
          <p className="section-head__aside">
            Three formats, all practitioner-led. Free to attend. RSVP on
            Luma — we keep rooms small so the conversation stays real.
          </p>
        </div>

        <div className="programmes__grid">
          {programmes.map((p) => (
            <article key={p.index} className="programme">
              <span className="programme__index">{p.index}</span>
              <p className="programme__desc">{p.desc}</p>
              <h3 className="programme__title">{p.title}</h3>
              <div className="programme__meta">
                <span>{p.meta[0]}</span>
                <span>{p.meta[1]}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
