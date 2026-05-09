export default function Home() {
  return (
    <main style={{
      background: "black",
      color: "white",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      fontFamily: "Arial"
    }}>
      <h1 style={{
        fontSize: "80px",
        fontWeight: "900"
      }}>
        TRACK<span style={{color:"red"}}>BET</span>
      </h1>

      <p style={{
        fontSize: "22px",
        color: "#aaa"
      }}>
        Owosso Speedway Live Racing
      </p>

      <button style={{
        marginTop: "30px",
        background: "red",
        border: "none",
        padding: "18px 40px",
        borderRadius: "12px",
        color: "white",
        fontSize: "18px",
        fontWeight: "bold",
        cursor: "pointer"
      }}>
        LIVE RACES
      </button>
    </main>
  )
}
