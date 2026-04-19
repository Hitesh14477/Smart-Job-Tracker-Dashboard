/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from 'react'
import { useApplications } from '../hooks/useApplications'

const ApplicationContext = createContext(null)

export function ApplicationProvider({ children }) {
  const value = useApplications()
  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  )
}

export function useApplicationContext() {
  const context = useContext(ApplicationContext)
  if (!context) {
    throw new Error('useApplicationContext must be used within ApplicationProvider')
  }
  return context
}
