import { useEffect } from 'react'

const DarkToggle = ({ className }) => {
  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true'
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const handleToggleDarkMode = () => {
    const isDarkMode = document.documentElement.classList.toggle('dark')
    localStorage.setItem('darkMode', isDarkMode.toString())
  }

  return (
    <button
      onClick={handleToggleDarkMode}
      className={`${className} bg-gray-800 text-white py-1 px-2 rounded`}
    >
      Toggle Dark Mode
    </button>
  )
}

export default DarkToggle
