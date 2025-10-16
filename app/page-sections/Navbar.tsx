'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Menu, X } from 'lucide-react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow">
      <div className="flex justify-between items-center px-6 py-2">
        <Link href="/" className="text-lg font-bold flex flex-row items-center">
          <img className='h-12' src={"./DNALogo-2.PNG"} alt="DNA Auto Source Logo"/>
          <h1>DNA Auto Source</h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/#about">About</Link>
          <Link href="/#services">Services</Link>
          <Link href="mailto:dnaautosource@gmail.com">Email</Link>
          <Button variant="default" className="ml-2">
            <Link href="https://docs.google.com/forms/d/e/1FAIpQLSdWKgsSi188YHn0mxofNgdklR1E4aJADlrLF1zUBPR0yzIxXA/viewform">Make a Request</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden px-6 py-4 space-y-4 border-t">
          <Link 
            href="/#about" 
            className="block py-2"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link 
            href="/#services" 
            className="block py-2"
            onClick={() => setIsOpen(false)}
          >
            Services
          </Link>
          <Link 
            href="mailto:dnaautosource@gmail.com" 
            className="block py-2"
            onClick={() => setIsOpen(false)}
          >
            Email
          </Link>
          <Button variant="default" className="w-full">
            <Link href="https://docs.google.com/forms/d/e/1FAIpQLSdWKgsSi188YHn0mxofNgdklR1E4aJADlrLF1zUBPR0yzIxXA/viewform">
              Make a Request
            </Link>
          </Button>
        </div>
      )}
    </nav>
  )
}