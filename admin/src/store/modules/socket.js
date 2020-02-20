let _client = null;

const state = {
  connected: false,
  rooms: {}
};

const getters = {};

const mutations = {
  SET_CONNECTED(state, flag) {
    state.connected = flag;
  },
  SOCKET_DISCONNECT(state) {
    console.log("client disconnected");
    state.connected = false;
    _client = null;
  },
  SET_ROOMS(state, rooms) {
    const newRooms = {};
    rooms.forEach(room => {
      newRooms[room.name] = { name: room.name, messages: room.messages };
    });
    state.rooms = newRooms;
  },
  SET_ROOM(state, room) {
    const newRooms = { ...state.rooms };
    newRooms[room.name] = room;
    state.rooms = newRooms;
  },
  MESSAGE_ADD(state, { room, message }) {
    //FIXME: check room existance
    state.rooms[room].messages.push(message);
  }
};

const actions = {
  // eslint-disable-next-line
  socket_connect({ commit, dispatch }, payload) {
    commit("SET_CONNECTED", true);
    _client = payload.client;
    dispatch("askForRooms");
  },
  // eslint-disable-next-line
  joinRoom({ commit }, payload) {
    if (!_client) {
      throw new Error("Disconnected");
    }
    _client.emit("MESSAGE", { type: "join", payload: payload.roomName });
  },
  askForRooms() {
    _client.emit("MESSAGE", { type: "roomsList" });
  },
  // eslint-disable-next-line
  sendTextMessage({ commit }, payload) {
    // commit("MESSAGE_ADD", {
    //   room: payload.roomName,
    //   message: payload.message
    // });
    _client.emit("MESSAGE", {
      type: "text",
      payload: payload.message,
      toRoom: payload.roomName
    });
  },
  // Handle received messages
  socket_MESSAGE({ commit }, { data }) {
    console.log("CALLED", data[0]);
    receivedMessageHandler(commit, data[0]);
  }
};

function receivedMessageHandler(commit, message) {
  switch (message.type) {
    case "ACK":
      if (message.sourceType === "join") {
        commit("SET_ROOM", message.sourcePayload);
      }
      break;

    case "ROOMS_LIST":
      console.log("received room list", message.payload);
      commit("SET_ROOMS", message.payload.rooms);
      break;
    case "ROOM_ADD":
      commit("SET_ROOM", message.payload);
      break;

    case "MESSAGE_ADD":
      commit("MESSAGE_ADD", {
        room: message.payload.roomName,
        message: message.payload.message
      });
      break;

    case "MEMBERS_LIST":
      console.log("RECEIVED MEMBERS_LIST", message);
      commit("SET_ROOM_MEMBERS", message.payload);
      break;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
};
