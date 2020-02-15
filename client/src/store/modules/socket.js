import { getClients } from "vuex-socketio-plugin";

let _client = null;

const state = {
  connected: false,
  roomName: "",
  messages: []
};

const getters = {
  messages: state => state.messages
};

const mutations = {
  SET_CONNECTED(state, flag) {
    state.connected = flag;
  },
  SET_ROOM_NAME(state, name) {
    state.roomName = name;
  },
  ADD_MESSAGE(state, message) {
    state.messages.push(message);
  },

  SOCKET_DISCONNECT(state) {
    console.log("client disconnected");
    state.connected = false;
    _client = null;
  }
};

const actions = {
  doConnect() {
    getClients().forEach(v => v.connect());
  },
  // eslint-disable-next-line
  socket_connect({ commit, dispatch }, payload) {
    console.log("RECEIVED CONN EVT");
    commit("SET_CONNECTED", true);
    _client = payload.client;
    dispatch("joinRoom");
  },
  setRoomName({ commit }, name) {
    commit("SET_ROOM_NAME", name);
  },
  // eslint-disable-next-line
  sendTextMessage({ commit }, text) {
    _client.emit("MESSAGE", {
      type: "text",
      payload: { from: "admin", content: text }
    });
    // commit("ADD_MESSAGE", { from: "me", content: text });
  },
  // eslint-disable-next-line
  sendTypingNotification({ commit }, flag) {
    _client.emit("NOTIFICATION", { type: "typing", payload: flag });
  },
  // eslint-disable-next-line
  joinRoom({ state }) {
    if (!_client) {
      throw new Error("Disconnected");
    }
    _client.emit("MESSAGE", { type: "join", payload: state.roomName });
  },
  // Handle received messages
  socket_MESSAGE({ commit }, { data }) {
    console.log("CALLED", data[0]);
    receivedMessageHandler(commit, data[0]);
  }
};

function receivedMessageHandler(commit, message) {
  switch (message.type) {
    case "MESSAGE_ADD":
      commit("ADD_MESSAGE", message.payload);
      break;
    case "ACK":
      if (message.sourceType === "join") {
        commit("SET_ROOM", message.sourcePayload);
      }
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
