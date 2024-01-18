/**
 * Set a cookie with the given name and value. The cookie is saved without a specific path, so it will be accessible on the same page or under that.
 * @param name - The name of the cookie.
 * @param value - The value of the cookie.
 * @param days - The number of days until the cookie expires. If not provided, the cookie will expire at the end of the session.
 */
export function setCookie(name: string, value: string, days?: number) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + ";";
}

/**
 * Get the value of a cookie with the given name.
 * @param name - The name of the cookie.
 * @return The value of the cookie, or null if the cookie does not exist.
 */
export function getCookie(name: string) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
