import { Notify, LocalStorage } from 'quasar'

export function upperLowerCase (str) {
  if (!str) {
    return
  }
  return str.toLowerCase().split(' ').map(x => x.charAt(0).toUpperCase() + x.slice(1)).join(' ')
}

export function notify (message, ifHtml) {
  if (typeof (message) === 'object') {
    Notify.create(message)
  } else {
    Notify.create({
      message: message,
      html: ifHtml
    })
  }
}

export async function getCameraImage (context) {
  return new Promise((resolve, reject) => {
    let camera = navigator.camera

    const options = {
      quality: 100,
      destinationType: camera.DestinationType.FILE_URI,
      encodingType: camera.EncodingType.JPG,
      mediaType: camera.MediaType.PICTURE,
      targetHeight: 400,
      targetWidth: 250,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      cameraDirection: 1 // Non funziona la scelta camera frontale/posteriore con Android
    }

    camera.getPicture(async imageURI => {
      const imgFileEntry = await getFileEntry(imageURI)
      const imgFile = await readFile(imgFileEntry)
      const imgScr = await arrayBufferToBase64(imgFile)
      resolve(imgScr)
    },
    function onError (error) {
      reject(error)
    },
    options
    )
  })
}

export function getFileEntry (fileURL) {
  return new Promise((resolve, reject) => {
    window.resolveLocalFileSystemURL(
      fileURL,
      fileEntry => {
        resolve(fileEntry)
      },
      err => {
        reject(err)
      }
    )
  })
}

export function readFile (fileEntry) {
  return new Promise((resolve, reject) => {
    fileEntry.file(
      file => {
        let reader = new FileReader()
        reader.readAsArrayBuffer(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      },
      err => {
        reject(err)
      }
    )
  })
}

export function arrayBufferToBase64 (buffer) {
  let binary = ''
  let bytes = new Uint8Array(buffer)
  let len = bytes.byteLength
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return window.btoa(binary)
}

export async function getCurrentPosition () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async function geolocationSuccess (position) {
        resolve(position)
      },
      function onError (error) {
        reject(error)
      },
      { timeout: 50000, enableHighAccuracy: true }
    )
  })
}

export function getDistanceFromLatLonInKm (lat1, lon1, lat2, lon2) {
  var R = 6371 // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1) // deg2rad below
  var dLon = deg2rad(lon2 - lon1)
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  var d = R * c // Distance in km
  return d
}

export function deg2rad (deg) {
  return deg * (Math.PI / 180)
}

export function stopWatchPosition (watchID) {
  // console.log('stop', watchID)
  navigator.geolocation.clearWatch(watchID)
}

export function setLogin (token) {
  LocalStorage.set('_login', token)
}

export function getLogin () {
  return LocalStorage.getItem('_login')
}

export function removeLogin () {
  LocalStorage.remove('_login')
}

export function setNome (nome) {
  // console.log('setNome', nome)
  LocalStorage.set('_nome', nome)
}

export function getNome () {
  // console.log('getNome', LocalStorage.getItem('_nome'))
  return LocalStorage.getItem('_nome')
}

export function setCoin (coin) {
  // console.log('setCoin', coin)
  LocalStorage.set('_coin', coin)
}

export function getCoin () {
  // console.log('getCoin', LocalStorage.getItem('_coin'))
  return LocalStorage.getItem('_coin')
}

export function setDistanzaPercorsa (dist) {
  // console.log('setDistanzaPercorsa', dist)
  LocalStorage.set('_dist', dist)
}

export function getDistanzaPercorsa () {
  // console.log('getDistanzaPercorsa', LocalStorage.getItem('_dist'))
  return LocalStorage.getItem('_dist')
}

export function setCoinTask (coin) {
  // console.log('setCoinTask', coin)
  LocalStorage.set('_coinTask', coin)
}

export function getCoinTask () {
  // console.log('getCoinTask', LocalStorage.getItem('_coinTask'))
  return LocalStorage.getItem('_coinTask')
}

export function setDistanzaPercorsaTask (dist) {
  // console.log('setDistanzaPercorsaTask', dist)
  LocalStorage.set('_distTask', dist)
}

export function getDistanzaPercorsaTask () {
  // console.log('getDistanzaPercorsaTask', LocalStorage.getItem('_distTask'))
  return LocalStorage.getItem('_distTask')
}

export function logout () {
  // removeLogin()
  stopWatchPosition()
  LocalStorage.remove('_foto')
  LocalStorage.remove('_nome')
  LocalStorage.remove('_coin')
  LocalStorage.remove('_dist')
}
