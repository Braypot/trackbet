export const metadata = {
  title: "TrackBet",
  description: "Owosso Speedway Betting Platform"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
