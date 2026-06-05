/**
 * Setup and initialize Socket.IO connection event listeners
 * @param {object} ioServer - The Socket.IO server instance
 */
function initSocket(ioServer) {
  ioServer.on("connection", (clientSocket) => {
    console.log(`🚀 New client connection established: ${clientSocket.id}`);

    // Register board subscription room join handler
    clientSocket.on("join:board", () => {
      clientSocket.join("board");
      console.log(`📂 Client ${clientSocket.id} subscribed to room: board`);
    });

    // Handle client disconnection logs
    clientSocket.on("disconnect", (reason) => {
      console.log(`⚠️ Client disconnected: ${clientSocket.id} (${reason})`);
    });
  });
}

/**
 * Helper utility to dispatch websocket events to the shared 'board' room
 * @param {object} ioServer - The Socket.IO server instance
 * @param {string} eventName - Name of the event topic to trigger
 * @param {any} payload - Associated event parameters data
 */
function emitToBoard(ioServer, eventName, payload) {
  if (ioServer) {
    ioServer.to("board").emit(eventName, payload);
  }
}

module.exports = {
  initSocket,
  emitToBoard,
};

