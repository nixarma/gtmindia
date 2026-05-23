export function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--color-lightest)',
        paddingBlock: '2.5rem',
        marginTop: '6rem',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.85rem',
            color: 'var(--color-ink)',
            opacity: 0.6,
          }}
        >
          GTM India &mdash; an initiative by{' '}
          <a
            href="https://gtmsolutions.co"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit', opacity: 1 }}
          >
            GTM Solutions Consulting
          </a>
        </p>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.85rem',
            color: 'var(--color-ink)',
            opacity: 0.5,
          }}
        >
          Non-commercial community initiative
        </p>
      </div>
    </footer>
  )
}
