'use client'
 
import { signin } from '@/lib/auth/auth'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
export function SigninForm() {
  const [state, action] = useActionState(signin, undefined)
 
  return (
    <form action={action}>
      <div>
        <label htmlFor="principal">Email or Userame</label>
        <input id="principal" name="principal" placeholder="Enter Email or Userame" />
      </div>
      {state?.errors?.principal && <p>{state.errors.principal}</p>}
 
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
      Sign In
    </button>
  )
}