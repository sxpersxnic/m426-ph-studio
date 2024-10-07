import TextInput from "./input";
import Label from "./label";

export default function InputField({ type }: { type: string }) {
  
  return (
    <fieldset>
      <Label text={`${type}`}/>
      <TextInput text={`${type}`}/>
    </fieldset>
  );
}