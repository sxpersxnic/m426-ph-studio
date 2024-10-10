export default function Label({ text }: {text: string}) {
  
  const lowerCaseText = text.toLowerCase().trim();

  return (
    <label htmlFor={`${lowerCaseText}`} className="text-xs font-normal">{text}</label>
  );
}