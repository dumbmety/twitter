import { useEffect, useState } from 'react'
import * as authService from '../services/auth'

export default function Logout() {
  const [logouting, setLogouting] = useState<boolean>(false)

  useEffect(() => {
    setLogouting(true)
    authService.logout().then(() => {
      console.log('Then')
      setTimeout(() => {
        console.log('Timeout')
        setLogouting(false)
        window.location.reload()
      }, 3000)
    })
  }, [])

  return <h1>{logouting && 'Logging out...'}</h1>
}
