import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";

export default function Logo() {
  return (
    <div
      className="flex flex-row items-center md:items-end justify-between md:justify-normal leading-none text-black"
    >
      <ChatBubbleLeftIcon className="w-6 md:w-10"/>
    </div>
  );
}