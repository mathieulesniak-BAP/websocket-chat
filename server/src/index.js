import express from "express";
import cors from "cors";
import socket from "socket.io";
const port = process.env.PORT || 3333;
const app = new express()

const clients = {};
let admins = [];
const rooms = {};

app.use(cors())

const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

server.listen(port, function () {
  console.log('listening on *:' + port);
});


app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});

io.use(function(socket, next){
  socket.isAdmin = false;
  if (socket.handshake.query && socket.handshake.query.token){
    if (socket.handshake.query.token === 'admintoken') {
      socket.isAdmin = true;
    }
  }
  next();
})

io.on('connection', function (socket) {
  
  clients[socket.id] = { nick: "toto" + socket.id, room: "", socket };
  console.log(`${Object.keys(clients).length} client(s) connected`)
  console.log("IS ADMIN ? ", socket.isAdmin);
  if (socket.isAdmin) {
    admins.push(socket.id);
  }

  socket.on('MESSAGE', function (msg) {
    console.debug('RECEIVED MESSAGE on ', socket.id, msg);
    handleMessages(msg, socket);
  });

  socket.on("NOTIFICATION", function (msg) {
    console.debug("RECEIVED NOTIFICATION on ", socket.id, msg)
    handleNotifications(msg, socket);
  })

  socket.on('disconnect', () => {
    console.log('DISCO');
    delete clients[socket.id];
    if (socket.isAdmin) {
      admins = admins.filter(item => item !== socket.id)
    }
    //FIXME: leave room(s)
  })
});


function handleNotifications(notification, socket) {
  switch (notification.type) {
    case 'typing':
      const roomName = clients[socket.id].room;
      rooms[roomName].members[socket.id].typing = notification.payload;
      console.log(rooms);
      break;
  }
}

function handleMessages(message, socket) {
  switch (message.type) {
    case 'join': {
      const roomName = message.payload;
      console.debug("client joining room", socket.id, roomName);
      clients[socket.id].room = roomName;
      let newRoom = rooms[roomName] === undefined;
      if (newRoom) {
        rooms[roomName] = {
          name: roomName,
          members: {},
          messages: [],
        }
      }
      // FIXME: do not add if already member
      rooms[roomName].members[socket.id] = {id: socket.id, typing: false};
      if (newRoom) {
        broadcastNewRoom(roomName)
      }
      // ack(socket, message.type, roomName);
    }
      break;

      case 'text':{

        let roomName = clients[socket.id].room;
        let from = "client";
        if (socket.isAdmin && message.toRoom !== undefined) {
          roomName =  message.toRoom;
          from = "admin";
        }

        
        const newMessage = { ...message.payload, from};
        console.log("NEW MESSAGE", newMessage);
        rooms[roomName].messages.push(newMessage);
        
        Object.keys(rooms[roomName].members).forEach(socketId => {
          clients[socketId].socket.emit('MESSAGE', {type: 'MESSAGE_ADD', payload: message.payload});
        });
        broadcastAdminNewMessage(roomName, newMessage);
      }
      break;
    
      case 'roomsList': {
        if (socket.isAdmin) {
          const roomsList =[];
          Object.keys(rooms).forEach(roomName => {
            roomsList.push({name: roomName, messages: rooms[roomName].messages});
          })
          socket.emit('MESSAGE', {
            type: 'ROOMS_LIST',
            payload: { 
              rooms: roomsList
            }
          })
        }
      }
        break;
  }
  
}

function ack(socket, messageType, payload) {
  socket.emit('MESSAGE', {
    type: 'ACK',
    sourceType: messageType,
    sourcePayload: payload
  });
}


function broadcastNewRoom(roomName) {
  admins.forEach(clientId => {
    // console.log("notify admin " , room);
    clients[clientId].socket.emit('MESSAGE', {type: 'ROOM_ADD', payload: { name: rooms[roomName].name, messages: rooms[roomName].messages }});
  });
}

function broadcastAdminNewMessage(roomName, message) {
  admins.forEach(clientId => {
    // console.log("notify admin " , room);
    clients[clientId].socket.emit('MESSAGE', {type: 'MESSAGE_ADD', payload: { roomName: roomName, message }});
  });
}
function broadcastMembersList(socket, roomName) {
  console.log(rooms[roomName]);
  const room = rooms[roomName];
  if (room.members.length > 1) {
    room.members.forEach((member) => {
      clients[member].socket.emit(
        'MESSAGE',
        {
          type: 'MEMBERS_LIST',
          payload: room.members,
        }
      )
    })
  }

}

function getMemberNameFromSocket(socketId) {
  return clients[socketId].name
}
function removeClientFromRoom(client) {

}