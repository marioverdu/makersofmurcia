/**
 * DISABLED: Cookie system teardown
 * All cookie utility functions preserved but disabled for future restoration
 */

// DISABLED: Get a cookie value by name
export function getCookie(name: string): string | null {
  // DISABLED: Cookie system teardown
  console.log("Cookie system disabled - getCookie", name)
  return null

  // PRESERVED: Original logic for future restoration
  // if (typeof document === "undefined") return null
  // const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"))
  // return match ? match[2] : null
}

// DISABLED: Set a cookie with options
export function setCookie(
  name: string,
  value: string,
  options: {
    days?: number
    path?: string
    domain?: string
    secure?: boolean
    sameSite?: "Strict" | "Lax" | "None"
  } = {},
): void {
  // DISABLED: Cookie system teardown
  console.log("Cookie system disabled - setCookie", name, value, options)
  return

  // PRESERVED: Original logic for future restoration
  // if (typeof document === "undefined") return
  // const { days = 180, path = "/", domain, secure = false, sameSite = "Lax" } = options
  // const expiryDate = new Date()
  // if (days) {
  //   expiryDate.setDate(expiryDate.getDate() + days)
  // }
  // let cookieString = `${name}=${value}; path=${path}`
  // if (days) {
  //   cookieString += `; expires=${expiryDate.toUTCString()}`
  // }
  // if (domain) {
  //   cookieString += `; domain=${domain}`
  // }
  // if (secure) {
  //   cookieString += "; secure"
  // }
  // cookieString += `; SameSite=${sameSite}`
  // document.cookie = cookieString
}

// DISABLED: Delete a cookie
export function deleteCookie(
  name: string,
  options: {
    path?: string
    domain?: string
  } = {},
): void {
  // DISABLED: Cookie system teardown
  console.log("Cookie system disabled - deleteCookie", name, options)
  return

  // PRESERVED: Original logic for future restoration
  // if (typeof document === "undefined") return
  // const { path = "/", domain } = options
  // setCookie(name, "", {
  //   days: -1,
  //   path,
  //   domain,
  //   secure: false,
  //   sameSite: "Lax",
  // })
}

// DISABLED: Check if cookies are enabled
export function areCookiesEnabled(): boolean {
  // DISABLED: Cookie system teardown - Always return true to avoid blocking
  console.log("Cookie system disabled - areCookiesEnabled")
  return true

  // PRESERVED: Original logic for future restoration
  // if (typeof document === "undefined") return false
  // try {
  //   setCookie("cookietest", "1", { days: 1 })
  //   const cookieEnabled = getCookie("cookietest") === "1"
  //   deleteCookie("cookietest")
  //   return cookieEnabled
  // } catch (e) {
  //   console.error("Error checking if cookies are enabled:", e)
  //   return false
  // }
}

// DISABLED: Get all cookie preferences
export function getCookiePreferences(): {
  consent: "accept_all" | "reject_non_essential" | "custom" | null
  preferences: {
    essential: boolean
    functional: boolean
    analytics: boolean
    marketing: boolean
  }
} {
  // DISABLED: Cookie system teardown - Always return accepted state
  console.log("Cookie system disabled - getCookiePreferences")
  return {
    consent: "accept_all", // Force accepted state
    preferences: {
      essential: true,
      functional: true,
      analytics: true,
      marketing: true,
    },
  }

  // PRESERVED: Original logic for future restoration
  // const defaultPreferences = {
  //   essential: true,
  //   functional: false,
  //   analytics: false,
  //   marketing: false,
  // }
  // const consentType = getCookie("cookieConsent") as "accept_all" | "reject_non_essential" | "custom" | null
  // if (!consentType) {
  //   try {
  //     const localStorageConsent =
  //       typeof localStorage !== "undefined"
  //         ? (localStorage.getItem("cookie-preference") as "accept_all" | "reject_non_essential" | "custom" | null)
  //         : null
  //     if (localStorageConsent) {
  //       const storedPrefs = typeof localStorage !== "undefined" ? localStorage.getItem("cookiePreferences") : null
  //       if (storedPrefs) {
  //         try {
  //           const parsedPrefs = JSON.parse(storedPrefs)
  //           return {
  //             consent: localStorageConsent,
  //             preferences: {
  //               essential: true,
  //               functional: !!parsedPrefs.functional,
  //               analytics: !!parsedPrefs.analytics,
  //               marketing: !!parsedPrefs.marketing,
  //             },
  //           }
  //         } catch (e) {
  //           console.error("Error parsing stored cookie preferences", e)
  //         }
  //       }
  //       return {
  //         consent: localStorageConsent,
  //         preferences:
  //           localStorageConsent === "accept_all"
  //             ? { essential: true, functional: true, analytics: true, marketing: true }
  //             : defaultPreferences,
  //       }
  //     }
  //   } catch (e) {
  //     console.error("Error accessing localStorage", e)
  //   }
  //   return { consent: null, preferences: defaultPreferences }
  // }
  // const functional = getCookie("functional") === "true"
  // const analytics = getCookie("analytics") === "true"
  // const marketing = getCookie("marketing") === "true"
  // return {
  //   consent: consentType,
  //   preferences: {
  //     essential: true,
  //     functional,
  //     analytics,
  //     marketing,
  //   },
  // }
}

// DISABLED: Check if a specific cookie type is allowed
export function isCookieTypeAllowed(type: "essential" | "functional" | "analytics" | "marketing"): boolean {
  // DISABLED: Cookie system teardown - Always allow all types
  console.log("Cookie system disabled - isCookieTypeAllowed", type)
  return true

  // PRESERVED: Original logic for future restoration
  // if (type === "essential") return true
  // const { preferences } = getCookiePreferences()
  // return preferences[type]
}
