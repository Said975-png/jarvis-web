import { useEffect, useState } from 'react'

export default function CodeProtection() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return
    // Отключаем правую кнопку мыши
    const disableRightClick = (e: MouseEvent) => {
      e.preventDefault()
      return false
    }

    // Отключаем горячие клавиши
    const disableKeyboardShortcuts = (e: KeyboardEvent) => {
      // F12
      if (e.keyCode === 123) {
        e.preventDefault()
        return false
      }
      
      // Ctrl+Shift+I
      if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        e.preventDefault()
        return false
      }
      
      // Ctrl+Shift+C
      if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
        e.preventDefault()
        return false
      }
      
      // Ctrl+Shift+J
      if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
        e.preventDefault()
        return false
      }
      
      // Ctrl+U (просмотр исходного кода)
      if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault()
        return false
      }
      
      // Ctrl+S (сохранение страницы)
      if (e.ctrlKey && e.keyCode === 83) {
        e.preventDefault()
        return false
      }
      
      // Ctrl+A (выделить все)
      if (e.ctrlKey && e.keyCode === 65) {
        e.preventDefault()
        return false
      }
      
      // Ctrl+P (печать)
      if (e.ctrlKey && e.keyCode === 80) {
        e.preventDefault()
        return false
      }
    }

    // Отключаем ��ыделение текста
    const disableTextSelection = () => {
      document.body.style.userSelect = 'none'
      document.body.style.webkitUserSelect = 'none'
      document.body.style.mozUserSelect = 'none'
      document.body.style.msUserSelect = 'none'
    }

    // Обнаружение открытия DevTools
    const detectDevTools = () => {
      const threshold = 160
      let devtools = {
        open: false,
        orientation: null as string | null
      }
      
      const setDevtools = (state: boolean, orientation: string | null) => {
        devtools.open = state
        devtools.orientation = orientation
        if (state) {
          // Перенаправляем на другую страницу или показываем сообщение
          alert('Доступ запрещен!')
          window.location.href = 'about:blank'
        }
      }

      setInterval(() => {
        if (window.outerHeight - window.innerHeight > threshold || 
            window.outerWidth - window.innerWidth > threshold) {
          if (!devtools.open) {
            setDevtools(true, 'vertical')
          }
        } else {
          if (devtools.open) {
            setDevtools(false, null)
          }
        }
      }, 500)
    }

    // Защита от к��пирования
    const disableCopy = (e: Event) => {
      e.preventDefault()
      return false
    }

    // Защита от перетаскивания
    const disableDrag = (e: DragEvent) => {
      e.preventDefault()
      return false
    }

    // Отключаем функции печати
    const disablePrint = () => {
      window.print = () => {}
    }

    // Применяем все защитные меры
    document.addEventListener('contextmenu', disableRightClick)
    document.addEventListener('keydown', disableKeyboardShortcuts)
    document.addEventListener('selectstart', disableCopy)
    document.addEventListener('copy', disableCopy)
    document.addEventListener('cut', disableCopy)
    document.addEventListener('paste', disableCopy)
    document.addEventListener('dragstart', disableDrag)
    
    disableTextSelection()
    detectDevTools()
    disablePrint()

    // Отключаем drag and drop
    document.ondragstart = () => false
    document.onselectstart = () => false
    document.oncontextmenu = () => false

    // Блокируем сохранение страницы
    window.addEventListener('beforeunload', (e) => {
      e.preventDefault()
      e.returnValue = ''
    })

    // Очистка при размонтирова��ии
    return () => {
      document.removeEventListener('contextmenu', disableRightClick)
      document.removeEventListener('keydown', disableKeyboardShortcuts)
      document.removeEventListener('selectstart', disableCopy)
      document.removeEventListener('copy', disableCopy)
      document.removeEventListener('cut', disableCopy)
      document.removeEventListener('paste', disableCopy)
      document.removeEventListener('dragstart', disableDrag)
      
      document.body.style.userSelect = ''
      document.body.style.webkitUserSelect = ''
      document.body.style.mozUserSelect = ''
      document.body.style.msUserSelect = ''
    }
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <>
      <style jsx global>{`
        * {
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          user-select: none !important;
          -webkit-touch-callout: none !important;
          -webkit-tap-highlight-color: transparent !important;
        }
        
        body {
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          user-select: none !important;
        }
        
        img {
          -webkit-user-drag: none !important;
          -moz-user-drag: none !important;
          user-drag: none !important;
          pointer-events: none !important;
        }
        
        /* Отключаем выделение для всех элементов */
        ::selection {
          background: transparent !important;
        }
        
        ::-moz-selection {
          background: transparent !important;
        }
      `}</style>
    </>
  )
}
