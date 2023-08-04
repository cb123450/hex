    // Create WebSocket connection.
    const socket = new WebSocket("ws://localhost:3000");

    // Connection opened
    socket.addEventListener("open", (event) => {
        console.log("connected to WS Server")
    });

    // Listen for messages
    socket.addEventListener("message", (event) => {
    console.log("Message from server ", event.data);
    });

    const sendMessage = () => {
        socket.send("Hello from Client 1")
    }