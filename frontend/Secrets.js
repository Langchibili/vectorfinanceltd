'use client'

export const FakeStr1 = 'kahs3lahebblo2uwb00an~va5lwi_ad_fgaljdj'; // security stuff
export const FakeStr2 ='klahewi_ad_fgalloanv;;aitalkjfajhsbbluwba==hn3vajd5j=+;'


export const getJWT = ()=>{
    if(typeof document !== "undefined"){
      let jwt = localStorage.getItem('jwt')
      if(!jwt){
          return null
      }
      else{
          jwt = jwt.split(FakeStr1)[1]
          if(jwt === undefined){
            return null
          }
          return jwt.split(FakeStr2)[0]
      }
    }
}

export const saveJwt = (jwt)=>{
    if(typeof document !== "undefined"){
      localStorage.setItem('jwt',FakeStr1+jwt+FakeStr2)
    }
}

