const programs = [
  {
    index: '01',
    type: 'Online',
    desc: 'Monthly online sessions on GTM craft — pipeline, positioning, discovery, and live war stories from practitioners building GTM for global markets out of India.',
    title: <><span>GTM India </span><em>Online</em></>,
    meta: ['Monthly', 'Free · Online'],
    leadership: false,
  },
  {
    index: '02',
    type: 'In-person',
    desc: 'Evening meetups in your city. Small rooms, off-the-record conversations, and a different topic each month. Show up, contribute, leave sharper.',
    title: <><span>GTM India </span><em>Connect</em></>,
    meta: ['Monthly', 'Free · BLR · BOM · HYD · DEL'],
    leadership: false,
  },
  {
    index: '03',
    type: 'Online',
    desc: 'Online sessions for GTM leaders — revenue org design, hiring decisions, board narratives, and the hard stuff that doesn\'t get discussed in open forums.',
    title: <><span>Leadership </span><em>Forum</em></>,
    meta: ['Quarterly', 'Free · Online'],
    leadership: true,
  },
  {
    index: '04',
    type: 'In-person',
    desc: 'Off-the-record in-person sessions for GTM leaders. Strategy, team structure, and the business of running a revenue function — by invitation only.',
    title: <><span>Leadership </span><em>Forum</em></>,
    meta: ['Quarterly', 'Pay your own way · BLR · BOM · HYD · DEL'],
    leadership: true,
  },
]

export function ProgramsSection() {
  return (
    <section className="programs" id="event-formats">
      <div className="container">
        <div className="programs__head">
          <h2>Event <em>formats</em>.</h2>
          <p className="programs__desc">
            Four formats, all practitioner-led. Zero fluff.
          </p>
        </div>

        <div className="programs__grid">
          {programs.map((p) => (
            <article
              key={p.index}
              className={`program${p.leadership ? ' program--leadership' : ''}`}
            >
              {p.leadership && (
                <span className="program__invite-badge">Invite only</span>
              )}
              <div className="program__top">
                <span className="program__index">{p.index} / {p.type}</span>
                <h3 className="program__title">{p.title}</h3>
              </div>
              <p className="program__desc">{p.desc}</p>
              <div className="program__meta">
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