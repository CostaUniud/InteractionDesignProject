import { LocalStorage } from 'quasar'
import store from '@/store'

export function formatDate (d) {
  let dd = d.getDate()
  let mm = d.getMonth() + 1
  let yyyy = d.getFullYear()

  return [
    (dd > 9 ? '' : '0') + dd,
    (mm > 9 ? '' : '0') + mm,
    yyyy
  ].join('/')
}

export function upperLowerCase (str) {
  if (!str) {
    return
  }
  return str.toLowerCase().split(' ').map(x => x.charAt(0).toUpperCase() + x.slice(1)).join(' ')
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
      cameraDirection: 1
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

export function stopWatchPosition (watchID) {
  // console.log('stop', watchID)
  navigator.geolocation.clearWatch(watchID)
}

export function nfcRead () {
  return new Promise((resolve, reject) => {
    window.nfc.addNdefListener(function (nfcEvent) {
      console.log(JSON.stringify(nfcEvent.tag))
      var tag = nfcEvent.tag

      if (tag.serialNumber) {
        tag.id = tag.serialNumber
        tag.isWritable = !tag.isLocked
        tag.canMakeReadOnly = tag.isLockable
      }

      let tagContents = window.nfc.bytesToString(tag.ndefMessage[0].payload)

      store.commit('conf/dialog', {
        visible: true,
        icon: 'mdi-nfc',
        color: 'blue',
        textColor: 'white',
        class: 'text-body1 gray1',
        label: 'Connessione NFC riuscita! Ecco il tuo risultato: ' + tagContents,
        actions: [
          {
            label: 'Chiudi',
            color: 'green',
            action: () => {
              store.commit('conf/dialog', {})
            }
          }
        ]
      })
      navigator.vibrate(2000)
      window.nfc.removeNdefListener()
      resolve(true)
    },
    function () {
      // console.log('Listening for NDEF tags')
      store.commit('conf/dialog', {
        visible: true,
        icon: 'mdi-cellphone-nfc',
        color: 'green',
        textColor: 'white',
        class: 'text-body1 gray1',
        label: 'Avvicina il tag NFC al tuo cellulare per leggerlo.',
        actions: [
          {
            label: 'Chiudi',
            color: 'green',
            action: () => {
              store.commit('conf/dialog', {})
            }
          }
        ]
      })
    },
    function (error) {
      console.log('Error adding non-NDEF listener', JSON.stringify(error))
      reject(error)
    })
  })

  // if (window.device.platform === 'Android') {
  //   return new Promise((resolve, reject) => {
  //     window.nfc.addTagDiscoveredListener(function (nfcEvent) {
  //       var tag = nfcEvent.tag
  //       console.log(JSON.stringify(nfcEvent.tag))

  //       let tagContents = window.nfc.bytesToString(tag)
  //       store.commit('conf/dialog', {
  //         visible: true,
  //         icon: 'mdi-nfc',
  //         color: 'blue',
  //         textColor: 'white',
  //         class: 'text-body1 gray1',
  //         label: 'Connessione NFC riuscita! Ecco il tuo risultato: ' + tagContents,
  //         actions: [
  //           {
  //             label: 'Chiudi',
  //             color: 'green',
  //             action: () => {
  //               store.commit('conf/dialog', {})
  //             }
  //           }
  //         ]
  //       })
  //       navigator.vibrate(2000)
  //       window.nfc.removeTagDiscoveredListener()
  //       resolve(true)
  //     },
  //     function () {
  //       // console.log('Listening for non-NDEF tags')
  //     },
  //     function (error) {
  //       console.log('Error adding non-NDEF listener', JSON.stringify(error))
  //       reject(error)
  //     })
  //   })
  // }
}

export function nfcWrite (text) {
  return new Promise((resolve, reject) => {
    window.nfc.addTagDiscoveredListener(function (nfcEvent) {
      var mimeType = 'text/plain'
      var payload = text
      var record = window.ndef.mimeMediaRecord(mimeType, window.nfc.stringToBytes(payload))

      window.nfc.write(
        [record],
        function () {
          console.log('Wrote data to tag')
          store.commit('conf/dialog', {
            visible: true,
            icon: 'mdi-nfc',
            color: 'blue',
            textColor: 'white',
            class: 'text-body1 gray1',
            label: 'Scrittura effettuata!',
            actions: [
              {
                label: 'Chiudi',
                color: 'green',
                action: () => {
                  store.commit('conf/dialog', {})
                }
              }
            ]
          })
          navigator.vibrate(2000)
          window.nfc.removeTagDiscoveredListener()
          resolve(true)
        },
        function (error) {
          console.log(error)
        }
      )
    },
    function () {
      // console.log('Listening for non-NDEF tags')
      setTimeout(function () {
        store.commit('conf/dialog', {
          visible: true,
          icon: 'mdi-cellphone-nfc',
          color: 'green',
          textColor: 'white',
          class: 'text-body1 gray1',
          label: 'Avvicina il tag NFC al tuo cellulare per scriverlo.',
          actions: [
            {
              label: 'Chiudi',
              color: 'green',
              action: () => {
                store.commit('conf/dialog', {})
              }
            }
          ]
        })
      }, 1000)
    },
    function (error) {
      console.log('Error adding non-NDEF listener', JSON.stringify(error))
      reject(error)
    })
  })
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

export function setFoto (foto) {
  // console.log('setfoto')
  LocalStorage.set('_foto', foto)
}

export function getFoto () {
  // console.log('getfoto')
  return LocalStorage.getItem('_foto')
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

export function setCoinAria (coin) {
  // console.log('setCoinAria', coin)
  LocalStorage.set('_coinAria', coin)
}

export function getCoinAria () {
  // console.log('getCoinAria', LocalStorage.getItem('_coinAria'))
  return LocalStorage.getItem('_coinAria')
}

export function setFirstTime (value) {
  console.log('setFirstTime', value)
  LocalStorage.set('_first', value)
}

export function getFirstTime () {
  console.log('getFirstTime', LocalStorage.getItem('_first'))
  return LocalStorage.getItem('_first')
}

export function logout () {
  // removeLogin()
  stopWatchPosition()
  window.QRScanner.destroy()
  LocalStorage.remove('_foto')
  LocalStorage.remove('_nome')
  LocalStorage.remove('_coin')
  LocalStorage.remove('_dist')
  LocalStorage.remove('_coinAria')
  // LocalStorage.remove('_first')
}
