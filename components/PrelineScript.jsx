"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

// Dynamically import preline/preline only when needed
const PrelineScript = () => {
  const path = usePathname()

  useEffect(() => {
    // Check for window existence in a more robust way
    if (typeof window !== "undefined") {
      import("preline/preline").then(() => {
        setTimeout(() => {
          if (window.HSStaticMethods) {
            window.HSStaticMethods.autoInit()
          } else {
            console.warn("window.HSStaticMethods is not available")
          }
        }, 100)
      })
    }
  }, [path])

  return null
}

export default PrelineScript
