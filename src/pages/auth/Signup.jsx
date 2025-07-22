import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import Logo from '../../Reusables/Logo';
import TextInputField from '../../Reusables/TextInputField';
import CustomButton from '../../Reusables/CustomButton';
import { Link } from '@tanstack/react-router';

export default function Authentication() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [touched, setTouched] = useState({})

    const signUpWithEmail = async (email, password) => {
        try {
            setLoading(true);
            setError('');
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // ✅ User signed up successfully
            console.log("User created:", user.uid);

            // You can now store additional user info in Realtime DB or Firestore

        } catch (error) {
            console.error("Signup error", error.code, error.message);
            setError(error.message);
            // Show error to user (e.g., email already in use, weak password)
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }
        await signUpWithEmail(email, password);
    };
    return (
        <>
            {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}
            <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-50">

                <Logo />
                <div className="sm:mx-auto sm:w-full sm:max-w-lg bg-white p-10 mt-10 rounded-md border ">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                            Create your account
                        </h2>
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
                                    placeholder={"example@mail.com"}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                                    touched={touched.email || error}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="mt-2">
                                <TextInputField
                                    id="password"
                                    name="password"
                                    required
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type={"password"}
                                    label={"Password"}
                                    placeholder={"**********"}
                                    onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
                                    touched={touched.password || error}
                                />
                            </div>
                        </div>

                        <div>
                            <CustomButton
                                type="submit"
                                disabled={loading}
                                className="btn-primary" >  {loading ? 'Signing up...' : 'Sign up'}
                            </CustomButton>
                        </div>
                    </form>

                    <p className="mt-5 text-center text-xs text-gray-500">
                        Already have an account?{' '}
                        <Link to={
                            '/login'
                        }>
                            <span className='underline text-gray-600 hover:text-gray-500'>
                                Sign In
                            </span>
                        </Link>
                    </p>
                </div>
                <p className="mt-10 text-center text-xs text-gray-500">
                    By signing up, you consent to receive occasional emails from us. 
                </p>
            </div>
        </>
    )
}