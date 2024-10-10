export default function TextInput({ text }: { text: string }) {
  
  const lowerCaseText = text.toLowerCase().trim();
  return (
    <input 
      id={`${lowerCaseText}`}
      name={`${lowerCaseText}`}
      type="text"
      placeholder={`Enter ${text}`}
      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-none focus:mt-2 focus:placeholder:opacity-0"
      required
    />
  );
}