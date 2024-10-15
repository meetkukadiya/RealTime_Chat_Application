import express from "express";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
// import { fileURLToPath } from "url";
// import { dirname } from "path";
// import path from "path";

dotenv.config();

const PORT = 3001;

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// console.log("Supabase Setup : ==> ", supabase);

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

let onlineUsers = [];

const io = new Server(server, {
  cors: {
    origin: "http://localhost:4200", // Adjust as needed
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  },
});

const formatTime = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return hours + ":" + minutes + " " + ampm;
};

io.on("connection", (socket) => {
  console.log("Socket Details :", socket);
  socket.on("userConnected", (data) => {
    console.log("User connected: ", data);
    if (!onlineUsers.includes(data)) {
      onlineUsers.push(data);
    }
    io.emit("onlineUsers", onlineUsers);
  });

  // socket.on("message", (message) => {
  //   io.emit("message", message);

  //   io.emit("newMessage", {
  //     text: message,
  //     createdAt: new Date().toISOString(),
  //   });

  //   const messageWithTimestamp = {
  //     ...data,
  //     timestamp: new Date().toLocaleString(),
  //   };

  //   // Emit the message to the intended recipient
  //   io.emit("message", messageWithTimestamp);

  //   console.log("Message the Sender:", message, new Date().toISOString());
  // });

  socket.on("message", (message) => {
    const timestamp = formatTime(new Date());

    // console.log("Socket msg ", message.SenderID);

    const messageWithTimestamp = {
      ...message,
      timestamp: timestamp,
    };

    io.emit("message", messageWithTimestamp);

    console.log("Message sent:", messageWithTimestamp);
  });

  // socket.on("disconnect", () => {
  //   console.log("A user disconnected");
  // });
});

// const server = createServer(app);
// const io = new SocketServer(server);
// console.log("Socket Connection Started : " , io)

// const io = new Server(httpServer, {
//   /* options */
// });

// const server = http.createServer(app);

// console.log("Server Name :", server);

// const io = new Server(server);

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:4200",
//   },
// });

// console.log()

// const io = Server(server, {
//   cors: {
//     origin: "http://localhost:4200",
//     methods: ["GET", "POST"],
//   },
// });\

// app.post("/api/register", async (req, res) => {
//   const { email, password, username } = req.body;

//   try {
//     const { data, error } = await supabase.auth.signUp({
//       email,
//       password,
//       options: {
//         data: {
//           username: username,
//         },
//       },
//     });
//     console.log("User Data : ", data);

//     if (error) {
//       return res.status(400).json({ error: error.message });
//     }

//     res.status(200).json({ message: "Registration successful", data });
//   } catch (error) {
//     console.error("Server error: ", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

app.post("/api/register", async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username,
        },
      },
    });

    if (error) {
      console.error("SignUp Error: ", error);
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ message: "Registration successful", data });
  } catch (error) {
    console.error("Server error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // console.log("Login Data : ", data);

    if (error) {
      console.error("Login Error: ", error);
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ message: "Login successful", data });
  } catch (error) {
    console.error("Server error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/all_users", async (req, res) => {
  try {
    // Query the identities table
    const { data, error } = await supabase
      .from("all_user")
      .select("id,user_id, email");

    if (error) {
      console.error("Error fetching users: ", error);
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ data });
  } catch (err) {
    console.error("Server error: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
export default supabase;
