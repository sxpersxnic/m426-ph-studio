import { signup } from 'src/lib/authentication/auth';
import { useFormState, useFormStatus } from 'react-dom';

export function SignUpForm() {
  const [state, action] = useFormState(signup, undefined)

  return (
    <form action={action}>
      <div>
        <label htmlFor="username">
          Username
        </label>
        <input id="username" name="username" placeholder="Enter Username" required />
      </div>
      {state?.errors?.username && <p>{state.errors.username}</p>}
      <div>
        <label htmlFor="email">
          Email
        </label>
        <input id="email" name="email" type="email" placeholder="Enter Email" required />
      </div>
      {state?.errors?.username && <p>{state.errors.username}</p>}
      <div>
        <label htmlFor="password">
          Password
        </label>
        <input id="password" name="password" type="password" />
      </div>
      {state?.errors?.password && (
        <div>
          <p>Password must:</p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}
      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button disabled={pending} type="submit">
      Sign Up
    </button>
  )
}