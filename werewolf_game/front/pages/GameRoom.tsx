import { initScriptLoader } from "next/script";
import { useEffect } from "react";
import { initSocket, getSocket } from '../lib/socket';
interface GameRoomProps {
    playerName: string;
  }

const GameRoom: React.FC<GameRoomProps> = () => {

    useEffect(() => {
        const socket = initSocket(); 
     }
  return <>
    <h1>Game Room</h1>
    <p></p>
  </>;
};
export default GameRoom;
