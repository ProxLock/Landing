import { SignUp, SignedIn, SignedOut, ClerkProvider, ClerkLoaded } from '@clerk/clerk-react';
import { URLS } from '../constants';

const PUBLISHABLE_KEY = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
}

function HomeAuthContent() {
    return (
        <ClerkLoaded>
            <SignedOut>
                <div className="waitlist-container">
                    <SignUp />
                </div>
            </SignedOut>
            <SignedIn>
                <a href={URLS.APP} className="btn btn-primary"><span>Get Started</span></a>
            </SignedIn>
        </ClerkLoaded>
    );
}

export default function HomeAuthSection() {
    return (
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <HomeAuthContent />
        </ClerkProvider>
    );
}
