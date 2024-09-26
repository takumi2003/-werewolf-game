import { Server, Socket } from "socket.io";
import { NextApiResponse } from "next";

interface Player {
  id: string;
  displayedRole: string;
}

const handler = (req: any, res: NextApiResponse) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);

    io.on("connection", (socket: Socket) => {
      console.log("A user connected");

      socket.on("startGame", (players) => {
        const roles = ["werewolf", "villager", "villager", "villager"];
        const foolIndex = Math.floor(Math.random() * roles.length);
        
        const playerRoles = players.map((player, index) => {
          if (index === foolIndex) {
            return { ...player, actualRole: roles[index], displayedRole: "werewolf" };
          } else {
            return { ...player, actualRole: roles[index], displayedRole: roles[index] };
          }
        });

        notifyRoles(socket, playerRoles);
        io.emit("gameStarted");
      });

      socket.on("vote", (data) => {
        io.emit("voted", data);
      });

      socket.on("disconnect", () => {
        console.log("A user disconnected");
      });
    });

    res.socket.server.io = io;
  }
  res.end();
};

const notifyRoles = (socket: Socket, players: Player[]) => {
  players.forEach(player => {
    socket.to(player.id).emit("yourRole", player.displayedRole);
  });
};

export default handler;
