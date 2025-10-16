'use client'

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import Link from "next/link"

export function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-2 bg-white shadow">
      <Link href="/" className="text-lg font-bold flex flex-row items-center">
        <img className='h-12' src={"./DNALogo-2.PNG"}/>
        <h1>DNA Auto Source</h1>
      </Link>
      <div className="flex items-center space-x-6">
        <Link href="/">Home</Link>
        <Link href="/">Services</Link>
        <DropdownMenu>
          <DropdownMenuTrigger className="text-sm">Contact Us</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link href="mailto:dnaautosource@gmail.com">Email</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="tel:+1800229933">Phone</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="default" className="ml-2">
          <Link href="https://docs.google.com/forms/d/e/1FAIpQLSdWKgsSi188YHn0mxofNgdklR1E4aJADlrLF1zUBPR0yzIxXA/viewform">Make a Request</Link>
        </Button>
      </div>
    </nav>
  )
}
