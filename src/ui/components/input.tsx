export default function TextInput({ text }: { text: string }) {
  
  const lowerCaseText = text.toLowerCase().trim();
  return (
    <input 
      id={`${lowerCaseText}`}
      name={`${lowerCaseText}`}
      type="text"
      placeholder={`Enter ${text}`}
      className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
      required
    />
  );
}