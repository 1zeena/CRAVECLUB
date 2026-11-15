import { Link } from '@tanstack/react-router'
export function NotFoundPage() {
  return (
    <main className="empty-bag" style={{ padding: '15vh 5%' }}>
      <p>404 / CRAVING NOT FOUND</p>
      <h1
        style={{
          fontFamily: 'Barlow Condensed',
          fontSize: 'clamp(55px,10vw,140px)',
          lineHeight: 1,
          margin: '30px 0',
        }}
      >
        TOOK A WRONG BITE?
      </h1>
      <p>There’s something good waiting back at the club.</p>
      <Link to="/" className="pill dark">
        BACK TO CRAVE CLUB <span aria-hidden="true">↗</span>
      </Link>
    </main>
  )
}
