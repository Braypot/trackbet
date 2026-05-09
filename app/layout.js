export const metadata = {
  title: "TrackBet",
  description: "Owosso Speedway Racing"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{
        margin: 0,
        background: "#050505"
      }}>
        {children}
      </body>
    </html>
  )
}
