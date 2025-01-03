"use client"

import Link from "next/link"
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs"

export default function Navigation() {
  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-blue-700 shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center">
          <Link href="/" className="text-white hover:text-blue-100 text-xl font-semibold">
            Lawify
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <SignedOut>
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-blue-300 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              <SignInButton mode="modal">
                <button className="relative px-6 py-3 bg-blue-600 rounded-lg leading-none flex items-center divide-x divide-gray-300">
                  <span className="flex items-center space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-200 group-hover:text-blue-100 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    <span className="pr-3 text-white font-semibold">Entrar</span>
                  </span>
                  <span className="pl-3 text-blue-200 group-hover:text-white transition duration-200 hidden sm:inline-block">Acesse agora</span>
                </button>
              </SignInButton>
            </div>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white hover:text-blue-100">
          <svg
            className="h-6 w-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu (hidden by default) */}
      <div className="hidden md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 bg-blue-700">
          <Link
            href="/analise"
            className="block px-3 py-2 text-white/90 hover:text-white hover:bg-blue-600"
          >
            Análise de Contratos
          </Link>
          <Link
            href="/sobre"
            className="block px-3 py-2 text-white/90 hover:text-white hover:bg-blue-600"
          >
            Sobre
          </Link>
          <Link
            href="/contato"
            className="block px-3 py-2 text-white/90 hover:text-white hover:bg-blue-600"
          >
            Contato
          </Link>
        </div>
      </div>
    </nav>
  )
}

