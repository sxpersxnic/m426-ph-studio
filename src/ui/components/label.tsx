export default function Label({ text }: {text: string}) {
  
  const lowerCaseText = text.toLowerCase().trim();

  return (
    <label htmlFor={`${lowerCaseText}`} className="mb-2 block text-sm font-medium">{text}</label>
  );
}