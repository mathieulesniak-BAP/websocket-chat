import Vue from "vue";
import Vuex from "vuex";
import * as io from "socket.io-client";
import socket from "./modules/socket";

import { createSocketioPlugin } from "vuex-socketio-plugin";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { socket },
  plugins: [
    createSocketioPlugin(io("http://localhost:3333", { autoConnect: false }))
  ]
});
