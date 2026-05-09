export default function Home() {
  return (
    <main style={{
      background:"#050505",
      minHeight:"100vh",
      color:"white",
      fontFamily:"Arial",
      padding:"20px"
    }}>

      {/* NAVBAR */}
      <div style={{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        marginBottom:"30px"
      }}>
        <h1 style={{
          fontSize:"42px",
          fontWeight:"900"
        }}>
          TRACK<span style={{color:"red"}}>BET</span>
        </h1>

        <button style={{
          background:"red",
          border:"none",
          padding:"14px 24px",
          borderRadius:"12px",
          color:"white",
          fontWeight:"bold",
          cursor:"pointer"
        }}>
          LIVE NOW
        </button>
      </div>

      {/* HERO CARD */}
      <div style={{
        background:"linear-gradient(135deg,#111,#1a1a1a)",
        borderRadius:"28px",
        padding:"40px",
        marginBottom:"30px",
        border:"1px solid #222"
      }}>
        <p style={{
          color:"red",
          fontWeight:"bold",
          marginBottom:"10px"
        }}>
          TONIGHT'S MAIN EVENT
        </p>

        <h2 style={{
          fontSize:"52px",
          margin:"0"
        }}>
          LATE MODEL FEATURE
        </h2>

        <p style={{
          color:"#aaa",
          marginTop:"10px",
          fontSize:"18px"
        }}>
          Owosso Speedway • Green Flag 8:00 PM
        </p>

        <button style={{
          marginTop:"25px",
          background:"red",
          border:"none",
          padding:"16px 28px",
          borderRadius:"14px",
          color:"white",
          fontWeight:"bold",
          fontSize:"16px"
        }}>
          PLACE BET
        </button>
      </div>

      {/* DRIVER CARDS */}
      <h2 style={{
        marginBottom:"20px"
      }}>
        FEATURED DRIVERS
      </h2>

      <div style={{
        display:"grid",
        gridTemplateColumns:"1fr 1fr",
        gap:"20px",
        marginBottom:"30px"
      }}>

        <div style={{
          background:"#111",
          borderRadius:"22px",
          padding:"25px",
          border:"1px solid #222"
        }}>
          <h1 style={{
            fontSize:"50px",
            color:"red",
            margin:"0"
          }}>
            #21
          </h1>

          <h3>Brandon Thompson</h3>

          <p style={{
            color:"#aaa"
          }}>
            8 Wins • 21 Top 5s
          </p>

          <button style={{
            marginTop:"15px",
            background:"red",
            border:"none",
            padding:"12px 18px",
            borderRadius:"10px",
            color:"white",
            fontWeight:"bold"
          }}>
            BET +125
          </button>
        </div>

        <div style={{
          background:"#111",
          borderRadius:"22px",
          padding:"25px",
          border:"1px solid #222"
        }}>
          <h1 style={{
            fontSize:"50px",
            color:"red",
            margin:"0"
          }}>
            #24
          </h1>

          <h3>Tyler James</h3>

          <p style={{
            color:"#aaa"
          }}>
            5 Wins • 14 Top 5s
          </p>

          <button style={{
            marginTop:"15px",
            background:"red",
            border:"none",
            padding:"12px 18px",
            borderRadius:"10px",
            color:"white",
            fontWeight:"bold"
          }}>
            BET +180
          </button>
        </div>

      </div>

      {/* LIVE LEADERBOARD */}
      <div style={{
        background:"#111",
        borderRadius:"24px",
        padding:"30px",
        border:"1px solid #222"
      }}>
        <h2>LIVE LEADERBOARD</h2>

        <div style={{
          marginTop:"20px"
        }}>
          <p>🥇 Brandon Thompson</p>
          <p>🥈 Tyler James</p>
          <p>🥉 Justin Miller</p>
        </div>
      </div>

    </main>
  )
}
