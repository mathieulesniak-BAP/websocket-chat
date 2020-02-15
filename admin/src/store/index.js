import Vue from "vue";
import Vuex from "vuex";
import app from "./modules/app";
import socket from "./modules/socket";
import * as io from "socket.io-client";

import { createSocketioPlugin } from "vuex-socketio-plugin";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { app, socket },
  plugins: [
    createSocketioPlugin(
      io("http://localhost:3333", {
        query: { token: "admintoken" }
      })
    )
  ]
});
