'use client'

export const FakeStr1 = 'kahs3lahebblo2uwb00an~va5lwi_ad_fgaljdj'; // security stuff
export const FakeStr2 = 'klahewi_ad_fgalloanv;;aitalkjfajhsbbluwba==hn3vajd5j=+;'
export const LencoPubKey = 'pub-42fcf783d7e8d0428f9e94600e291e3d82e425d98359763b'; // security stuff
export const LencoApiKey = 'klahewi_ad_fgalloanv;;aitalkjfajhsbbluwba==hn3vajd5j=+;'
export const frontendUpdateKey = 'kahs3lahebblo2uwb00an~va5lwi_ad_fgaljdjklahewi_ad_fgalloanvaitalkjfajhsbbluwbahn3vajd5j'
export const publicUploadJwt = "388f5e98250e24e97f7dbef6d2d812f1b8d8f2007f607ea7a85c1b2e254b0746fb9f796438c49fa2e40d8ed61f293fbc8aa19c3dba34640349cfbf6e7be0f905f0936cf059487218f7967ce4e060af5443b6291f9e53b1f66c106d2836a8f436e8df395a4f4665f7e566805f1249643272b800ab967011f67eee145eb1e28553"

export const getJWT = () => {
  if (typeof document !== "undefined") {
    let jwt = localStorage.getItem('jwt')
    if (!jwt) {
      return null
    }
    else {
      jwt = jwt.split(FakeStr1)[1]
      if (jwt === undefined) {
        return null
      }
      return jwt.split(FakeStr2)[0]
    }
  }
}

export const saveJwt = (jwt) => {
  if (typeof document !== "undefined") {
    localStorage.setItem('jwt', FakeStr1 + jwt + FakeStr2)
  }
}