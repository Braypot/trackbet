export default function Home() {
  return (
    <main style={{
      background: "#050505",
      minHeight: "100vh",
      color: "white",
      fontFamily: "Arial",
      padding: "40px"
    }}>

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "40px"
      }}>
        <h1 style={{
          fontSize: "50px",
          fontWeight: "900"
        }}>
          TRACK<span style={{color:"red"}}>BET</span>
        </h1>

        <button style={{
          background: "red",
          color: "white",
          border: "none",
          padding: "12px 24px",
          borderRadius: "12px",
          fontWeight: "bold"
        }}>
          LIVE RACES
        </button>
      </div>

      <div style={{
        background: "#111",
        borderRadius: "24px",
        padding: "30px",
        border: "1px solid #222"
      }}>
        <h2 style={{
          fontSize: "36px"
        }}>
          TONIGHT'S MAIN EVENT
        </h2>

        <p style={{
          color: "#aaa"
        }}>
          Owosso Speedway • Late Model Feature
        </p>

        <div style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px"
        }}>
          <div style={{
            background: "#1a1a1a",
            padding: "20px",
            borderRadius: "18px",
            flex: 1
          }}>
            <h3>#21 Brandon Thompson</h3>
            <p style={{color:"#00ff66"}}>+125</p>
          </div>

          <div style={{
            background: "#1a1a1a",
            padding: "20px",
            borderRadius: "18px",
            flex: 1
          }}>
            <h3>#24 Tyler James</h3>
            <p style={{color:"#00ff66"}}>+180</p>
          </div>
        </div>
      </div>

    </main>
  )
}
