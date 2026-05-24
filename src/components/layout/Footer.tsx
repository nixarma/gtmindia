import Link from 'next/link'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__brand">
            <Link href="/" className="wm" aria-label="GTM India home">
              GTM <em>India</em>
            </Link>
            <p className="footer__tag">
              Building India&apos;s GTM community. A non-commercial initiative by{' '}
              <a href="https://gtmsolutions.co" target="_blank" rel="noopener" style={{ color: 'var(--accent)' }}>
                GTM Solutions Consulting
              </a>.
            </p>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-h">Community</h4>
            <ul>
              <li><Link href="/events">All events</Link></li>
              <li><Link href="/presales-india">Presales India</Link></li>
              <li><Link href="/about">GTM India</Link></li>
              <li><Link href="#">SELF (leadership)</Link></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-h">Cities</h4>
            <ul>
              <li><Link href="/events">Bangalore</Link></li>
              <li><Link href="/events">Hyderabad</Link></li>
              <li><Link href="/events">Mumbai</Link></li>
              <li><Link href="/events">Delhi</Link></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-h">Elsewhere</h4>
            <ul>
              <li><a href="https://lu.ma/gtmindia" target="_blank" rel="noopener">Luma &rarr;</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener">LinkedIn &rarr;</a></li>
              <li><a href="https://gtmsolutions.co" target="_blank" rel="noopener">GTM Solutions &rarr;</a></li>
            </ul>
          </div>
        </div>

        <div className="footer__legal">
          <span>&copy; 2026 GTM India &middot; Non-commercial community initiative</span>
        </div>
      </div>
    </footer>
  )
}