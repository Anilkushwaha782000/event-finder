"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import {
  AiOutlineGoogle
} from "react-icons/ai";
import { useRouter } from "next/navigation";

const AuthPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [actionText, setActionText] = useState("");
  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      name: name,
      email: email,
      password: password,
    };
    setLoading(true);
    setActionText(isSignUp ? "Registering..." : "Signing in...");
    if (isSignUp) {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const result = await response.json();
        console.log("result>>",result);
        setIsSignUp(false);
      }
    } else {
     const result= await signIn("credentials", {
        redirect: true,
        callbackUrl: "/profile",
        email: email,
        password: password,
      });
      console.log("auth result>>",result);
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    await signIn("google", { callbackUrl: "/profile" });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center text-pink-600 mb-8">
          {isSignUp ? "Create an Account" : "Welcome Back"}
        </h2>
        <form onSubmit={handleAuth} className="space-y-6">
          {isSignUp && (
            <div>
              <label className="block text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Your Name"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div>
            <label className="block text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Your Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Your Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition duration-300"
          >
            {loading ? actionText : isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <div className="mt-6">
          <p className="text-center text-gray-600 mb-4">Or continue with</p>
          <div className="flex justify-between gap-4">
            <button
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300"
            >
              <AiOutlineGoogle className="mr-2" />
              Google
            </button>
          </div>
        </div>

        {/* Toggle Sign In / Sign Up */}
        <div className="mt-6 text-center">
          {isSignUp ? (
            <p className="text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => setIsSignUp(false)}
                className="text-pink-600 font-semibold hover:underline"
              >
                Sign In
              </button>
            </p>
          ) : (
            <p className="text-gray-600">
              Don&apos;t have an account?
              <button
                onClick={() => setIsSignUp(true)}
                className="text-pink-600 font-semibold hover:underline"
              >
                Sign Up
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
