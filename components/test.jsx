'use client'
// pages/index.js

import { useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Home() {
    const [session, loading] = useSession();

    useEffect(() => {
        // Optional: Fetch initial data or perform actions on session change
        console.log("Current session:", session);
    }, [session]);

    const handleSignIn = () => {
        signIn(); // Optional: You can specify provider or options if needed
    };

    const handleSignOut = () => {
        signOut();
    };

    return (
        <div>
            {loading && <p>Loading...</p>}
            {!session && (
                <button onClick={handleSignIn}>Sign in</button>
            )}
            {session && (
                <div>
                    <p>Signed in as {session.user.email}</p>
                    <p>User ID: {session.user.id}</p>
                    <p>Is Admin: {session.user.isadmin ? 'Yes' : 'No'}</p>
                    <button onClick={handleSignOut}>Sign out</button>
                </div>
            )}
        </div>
    );
}
