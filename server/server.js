const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Root route (fixes "Cannot GET /")
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

app.listen(8000, () => {
  console.log("Server started on port 8000");
});

app.post("/api", async (req, res) => {
  const { text } = req.body;

  const fetchData = async () => {
    const res = await fetch(`https://api.api-ninjas.com/v1/qrcode?format=png&data=${text}`, {
      method: "GET",
      headers: {
        "X-Api-Key": "EWxbWJKngd2H10jCgnSq/g==NWtcWV3AZ5ghsemT"
      },
    });
    return res.text();
  };

  try {
    const data = await fetchData();
    res.json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});
