import { useRoom } from "../../context/RoomContext";

export default function ChoosingWord() {
  const { currentPlayer } = useRoom();
  return (
    <span className="font-bold text-white text-2xl">
      <span>{currentPlayer?.name}</span>{" "}
      is choosing a word
    </span>
  );
}
