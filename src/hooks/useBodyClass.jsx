import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const useBodyClass = () => {
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/wallet' || location.pathname === '/blockchain') {
      document.body.classList.add('light-theme')
      document.body.classList.remove('dark-theme')
    } else {
      document.body.classList.add('dark-theme')
      document.body.classList.remove('light-theme')
    }
  }, [location])
}

export default useBodyClass
