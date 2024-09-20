import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";

export default function Logo() {
  return (
    <div
      className="flex flex-row ${size} items-center md:items-end justify-between md:justify-normal leading-none text-white"
    >
      <ChatBubbleLeftIcon />
    </div>
  );
}