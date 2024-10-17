import TextInput from "./input";
import Label from "./label";

export default function InputField({ type }: { type: string }) {
  
  return (
    <fieldset className="flex flex-col items-start justify-center my-1 w-full">
      <Label text={`${type}`}/>
      <TextInput text={`${type}`}/>
    </fieldset>
  );
}