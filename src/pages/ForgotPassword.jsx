import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import Logo from "../Reusables/Logo";
import TextInputField from "../Reusables/TextInputField";
import CustomButton from "../Reusables/CustomButton";
import { Link, useNavigate } from "@tanstack/react-router";
import { getCleanErrorMessage } from "../utils/firebaseError.util";
import useAuthStore from "../stores/authStore";
import { Key, Mail } from "lucide-react";

const ForgotPassword = () => {

    const navigate = useNavigate();
    // Zustand auth store
    const setUser = useAuthStore((state) => state.setUser);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [touched, setTouched] = useState({});

    const signInWithEmail = async (email, password) => {
        try {
            setLoading(true);
            setError("");
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            setUser(user);
            navigate({ to: "/optimizer", replace: true });
        } catch (error) {
            setError(getCleanErrorMessage(error));
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }
        await signInWithEmail(email, password);
    };
    return (
        <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-50">
            <Logo />
            <div className="sm:mx-auto sm:w-full sm:max-w-lg bg-white p-10 mt-10 rounded-md border ">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900"> Forgot Password?</h2>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="rounded-md bg-red-50 p-4">
                            <div className="text-sm text-red-700">{error}</div>
                        </div>
                    )}
                    <div>
                        <div className="mt-2">
                            <TextInputField
                                id="email"
                                name="email"
                                required
                                type={"email"}
                                value={email}
                                autoComplete="email"
                                label={"Email"}
                                iconStart={<Mail size={20} />}
                                placeholder={"example@mail.com"}
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                                touched={touched.email || error}
                            />
                        </div>
                    </div>

                    <div>
                        <CustomButton type="submit" disabled={loading} className=" bg-red-600 hover:bg-red-500 transition-all duration-300">
                            {" "}
                            {loading ? "Resetting..." : "Reset Password"}
                        </CustomButton>
                    </div>
                </form>

                <p className="mt-5 text-center text-xs text-gray-500">
                    Don't have an account?{" "}
                    <Link to={"/signup"}>
                        <span className="underline text-gray-600 hover:text-gray-500">Sign Up</span>
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default ForgotPassword
