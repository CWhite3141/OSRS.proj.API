import React from 'react'
import { ThemeProvider } from '@/app/contexts/ThemeContext'
const ThemeToggle = () => {
  return (
    <div>
      <button onClick={ThemeProvider.toggleTheme}>Toggle Theme</button>
    </div>
  )
}

export default ThemeToggle
