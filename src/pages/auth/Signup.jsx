import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { z } from "zod";
import { Check, Key, KeyRound, Mail, X } from "lucide-react";
import { auth, db } from "../../lib/firebase";
import { saveNewsletterSubscription } from "../../utils/firebase.util";
import { getCleanErrorMessage } from "../../utils/firebaseError.util";
import Logo from "../../Reusables/Logo";
import TextInputField from "../../Reusables/TextInputField";
import CustomButton from "../../Reusables/CustomButton";
import { Link, useNavigate } from "@tanstack/react-router";
import useAuthStore from "../../stores/authStore";
import UserName from "./UserName";
import CustomSnackbar from "../../Reusables/CustomSnackbar";

// Zod schema for signup form
const signupSchema = z.object({
    email: z.string().min(1, "Email is required").email("Enter a valid email address"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/(?=.*[a-zA-Z])/, "Must contain at least one letter")
        .regex(/(?=.*\d)/, "Must contain at least one number")
        .regex(/(?=.*[!@#$%^&*(),.?":{}|<>])/, "Must contain at least one special character"),
});

export default function Authentication() {
    const navigate = useNavigate();
    // Zustand auth store
    const setUser = useAuthStore((state) => state.setUser);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [touched, setTouched] = useState({});
    const [validationErrors, setValidationErrors] = useState({});

    const checkPasswordRequirements = (password) => {
        return {
            minLength: password.length >= 8,
            hasLetter: /(?=.*[a-zA-Z])/.test(password),
            hasNumber: /(?=.*\d)/.test(password),
            hasSpecial: /(?=.*[!@#$%^&*(),.?":{}|<>])/.test(password),
        };
    };

    const getRequirementsList = (requirements) => [
        { key: "minLength", label: "Minimum 8 characters", met: requirements.minLength },
        { key: "hasLetter", label: "At least 1 letter", met: requirements.hasLetter },
        { key: "hasNumber", label: "At least 1 number", met: requirements.hasNumber },
        { key: "hasSpecial", label: "At least 1 special character", met: requirements.hasSpecial },
    ];

    const validateField = (name, value) => {
        try {
            if (name === "email") {
                signupSchema.shape.email.parse(value);
                setValidationErrors((prev) => ({ ...prev, email: "" }));
            } else if (name === "password") {
                signupSchema.shape.password.parse(value);
                setValidationErrors((prev) => ({ ...prev, password: "" }));
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                // Safely access the first error message
                const errorMessage = error.errors?.[0]?.message || "Invalid input";
                setValidationErrors((prev) => ({
                    ...prev,
                    [name]: errorMessage,
                }));
            }
        }
    };

    const signUpWithEmail = async (email, password) => {
        try {
            setLoading(true);
            setError("");

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const userData = {
                uid: user.uid,
                email: user.email,
                emailVerified: user.emailVerified,
                displayName: user.displayName,
                photoURL: user.photoURL,
                createdAt: user.metadata.creationTime,
                lastLoginAt: user.metadata.lastSignInTime,
            };

            setUser(userData);

            // Save email to newsletter subscription with retry
            await saveNewsletterSubscription(db, email, user.uid, true);
            navigate({ to: "/optimizer", replace: true });
        } catch (error) {
            setError(getCleanErrorMessage(error));
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Run form validation
        const validationResult = signupSchema.safeParse({ email, password });

        if (!validationResult.success) {
            const newErrors = {};
            validationResult.error.errors?.forEach((error) => {
                if (error.path?.[0]) {
                    newErrors[error.path[0]] = error.message || "Invalid input";
                }
            });
            setValidationErrors(newErrors);
            setError("Please fix the errors below");
            return;
        }

        // Clear any previous errors
        setValidationErrors({});
        setError("");

        await signUpWithEmail(email, password);
    };

    const requirements = checkPasswordRequirements(password);
    const requirementsList = getRequirementsList(requirements);

    return (
        <>
            <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-50">
                <Logo />
                <div className="sm:mx-auto sm:w-full sm:max-w-lg bg-white p-10 mt-10 rounded-md border ">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="text-center text-2xl/9 font-medium tracking-tight text-gray-900">Create your account</h2>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* {error && (
                            <div className="rounded-md bg-red-50 p-4">
                                <div className="text-sm text-red-700">{error}</div>
                            </div>
                        )} */}

                        {/* Email Field */}
                        <div>
                            <div className="mt-2">
                                <TextInputField
                                    id="email"
                                    name="email"
                                    required
                                    type="email"
                                    value={email}
                                    autoComplete="email"
                                    label="Email"
                                    placeholder="example@mail.com"
                                    iconStart={<Mail size={20} />}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        validateField("email", e.target.value);
                                    }}
                                    onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                                    touched={touched.email || validationErrors.email}
                                    error={validationErrors.email}
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <div className="mt-2">
                                <TextInputField
                                    id="password"
                                    name="password"
                                    required
                                    autoComplete="current-password"
                                    value={password}
                                    iconStart={<Key size={20} />}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        validateField("password", e.target.value);
                                    }}
                                    onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
                                    type="password"
                                    label="Password"
                                    placeholder="**********"
                                    touched={touched.password || validationErrors.password}
                                    error={validationErrors.password}
                                />

                                {/* Password Requirements */}
                                <div className="mt-3 flex flex-wrap gap-2 items-center">
                                    {requirementsList.map((requirement) => (
                                        <div key={requirement.key} className={`flex items-center gap-1 h-full px-1.5 py-1 rounded ${requirement.met ? "bg-green-100" : "bg-gray-100"}`}>
                                            {requirement.met ? <Check size={14} className="text-green-600" /> : <X size={14} className="text-gray-500" />}
                                            <span className={`text-xs font-medium ${requirement.met ? "text-green-600" : "text-gray-500"}`}>{requirement.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div>
                            <CustomButton type="submit" disabled={loading} className="btn-primary">
                                {loading ? "Signing up..." : "Sign up"}
                            </CustomButton>
                        </div>
                    </form>

                    <p className="mt-5 text-center text-xs text-gray-500">
                        Already have an account?{" "}
                        <Link to={"/login"}>
                            <span className="underline text-gray-600 hover:text-gray-500">Sign In</span>
                        </Link>
                    </p>
                </div>
                {error && (
                    <>
                        <CustomSnackbar open={error} snackbarColor={"danger"} snackbarMessage={error} />
                    </>
                )}
                <p className="mt-10 text-center text-xs text-gray-500">By signing up, you consent to receive occasional emails from us.</p>
            </div>
            <UserName
                Title={"What Should We Call You?"}
            >
                <div>

                </div>
            </UserName>
        </>
    );
}
