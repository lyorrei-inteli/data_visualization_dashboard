'use client'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

interface SessionContextProviderProps {
  children: React.ReactNode
}

export const SessionContextProvider: React.FC<SessionContextProviderProps> = ({children}) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}
