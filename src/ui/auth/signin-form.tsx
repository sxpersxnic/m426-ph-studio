import { signin } from 'src/lib/authentication/auth';
import { useFormState, useFormStatus } from 'react-dom';

export function SignUpForm() {
  const [state, action] = useFormState(signin, undefined)

  return (
    <form action={action}>
      <div>
        <label htmlFor="username">
          Username
        </label>
        <input id="username" name="username" placeholder="Enter Username" required />
      </div>
      <div>
        <label htmlFor="password">
          Password
        </label>
        <input id="password" name="password" type="password" />
      </div>
      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button disabled={pending} type="submit">
      Sign in
    </button>
  )
}