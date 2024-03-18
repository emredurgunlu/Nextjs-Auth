"use client";

import { login } from "@/actions";
import { useFormState } from "react-dom";

const LoginForm = () => {
  // undefined is initial state so we don't have error message at the beginning
  const [state, formAction] = useFormState<any, FormData>(login, undefined);

  // login butonuna tıkladığımız zaman {formAction}'ı tetikleyecek.
  // bu formAction'ın bir state'i var ve bu state'in başlangıç değeri undefined
  // bu undefined değer login action'a paslanıyor
  return (
    <form action={formAction}>
      <input type="text" name="username" required placeholder="username" />
      <input type="password" name="password" required placeholder="password" />
      <button>Login</button>
      {state?.error && <p>{state.error}</p>}
    </form>
  );
};

export default LoginForm;
