"use client"
import Link from "next/link";
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";

export default function Navigation() {
    return (
        <header className="sticky top-0 z-50 bg-yellow-100 shadow-md">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="flex items-center">
            <Link href="/" className="text-yellow-700 hover:text-yellow-900">
                Lawify
            </Link>
          </div>
          <div>
            <SignedOut>
                <div className="text-yellow-700 hover:text-yellow-900">
                    <SignInButton mode="modal"> Entrar </SignInButton>
                </div>
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
          </div>
        </div>
      </header>
    );
}
