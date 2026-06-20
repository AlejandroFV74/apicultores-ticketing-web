import { useState, useEffect } from 'react'

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  // Inicializamos de forma segura comprobando si existe 'window'
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < MOBILE_BREAKPOINT
    }
    return false
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Función limpia que se ejecuta al cambiar el tamaño de la pantalla
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Escuchamos el evento resize del navegador directamente
    window.addEventListener('resize', handleResize)
    
    // Ejecución inicial limpia
    handleResize()

    // Limpieza al desmontar
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isMobile
}