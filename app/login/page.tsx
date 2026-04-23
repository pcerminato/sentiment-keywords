"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget)
    const userName = form.get("userName");
    const password = form.get("password");

    try {
      const resp = await fetch("http://localhost:8080/login", {
        method: "POST",
        body: JSON.stringify({
          "userName": userName,
          "password": password
        }),
        credentials: "include",
        headers: {
          "Content-type": "application/json"
        }
      });

      if (resp.ok) {
        router.push("/");
      } else {
        const value = await resp.json();
        setMessage(value?.message || "Access denied")
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form className="p-8 border rounded-lg shadow-md" id="login-form" onSubmit={handleLogin}>
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <input type="email" placeholder="Email" name="userName" className="block w-full mb-2 p-2 border" required />
        <input type="password" placeholder="Password" name="password" className="block w-full mb-4 p-2 border" required />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Login
        </button>
        <output name="message" className="mt-2 text-sm text-red-600">{message}</output>
      </form>
    </div>
  );
}