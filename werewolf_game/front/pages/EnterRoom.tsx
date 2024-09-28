import { useRouter } from "next/router";

const EnterRoom: React.FC = () => {
  const router = useRouter();

  const handleJoinRoom = () => {
    router.push(`/GameRoom`);
  };

  return (
    <div className="enter-room">
      <h1>Enter Room</h1>
      <input type="text" placeholder="Enter room code" />
      <button onClick={handleJoinRoom}>Join Room</button>
    </div>
  );
};

export default EnterRoom;
