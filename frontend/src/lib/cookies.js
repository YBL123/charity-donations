export const setCookie = (cname, cvalue, exdays) => {
  let d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export const getCookie = (cname) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let I = 0; I <ca.length; I++) {
    let c = ca[I];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export const deleteCookie = (cname) => {
  document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
}

export const clearAllCookies = () => {
  let cookies = document.cookie.split(';')

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i]

    let eqPos = cookie.indexOf('=')

    let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie

    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  }
}