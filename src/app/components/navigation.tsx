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
            <nav className="ml-8 space-x-4">
                <Link href="/solution" className="text-yellow-700 hover:text-yellow-900">
                    Solução
                </Link>
            <Link href="/funcs" className="text-yellow-700 hover:text-yellow-900">
                Funcionalidades
            </Link>
            <Link href="/pricing-plans" className="text-yellow-700 hover:text-yellow-900">
                Preços
            </Link>
            </nav>
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
    


// <nav className="flex justify-center items-center p-4">
        //     <ul>
        //         <li>
        //             <Link href="/" className={pathName === "/" ? "font-bold" : ""}>
        //                 Home
        //             </Link>
        //         </li>
        //         <li>
        //             <Link href="/about" className={pathName === "/about" ? "font-bold" : ""}>
        //                 About
        //             </Link>
        //         </li>
        //         <li>
        //             <Link href="/(auth)/register">
        //                 Register
        //             </Link>
        //         </li>
        //         <li>
        //             <Link href="/(auth)/forgot-password">
        //                 Forgot Password
        //             </Link>
        //         </li>
        //         <li>
        //             <Link href="/(auth)/login">
        //                 Login
        //             </Link>
        //         </li>
        //     </ul>
            
        // </nav>