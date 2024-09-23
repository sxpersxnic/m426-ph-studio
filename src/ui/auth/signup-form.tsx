'use client'
 
import { signup } from '@/lib/auth/auth'
import { useFormState, useFormStatus } from 'react-dom'

export function SignupForm() {
  const [state, action] = useFormState(signup, undefined)
 
  return (
    <form action={action}>
      <div>
        <label htmlFor="username">Userame</label>
        <input id="username" name="username" placeholder="Enter Userame" />
      </div>
      {state?.errors?.username && <p>{state.errors.username}</p>}
 
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" placeholder="Email" />
      </div>
      {state?.errors?.email && <p>{state.errors.email}</p>}
 
      <div>
        <label htmlFor="password">Password</label>
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