// function timeout (ms) {
//   return new Promise((resolve, reject) => {
//     console.log(1)
//     resolve(10)
//     setTimeout(function resolve () {
//       console.log('ppp')
//     }, ms)
//   })
// }
// timeout(100).then((value) => {
//   console.log(value)
// })

// let promise = new Promise(function (resolve, reject) {
//   resolve()
//   console.log('Promise')
// })

// promise.then(function () {
//   console.log('resolve')
// })
// console.log('hi')
// Promise hi resolve

// 异步加载图片
// function loadImageAsync (url) {
//   return new Promise(function (resolve, reject) {
//     const image = new Image()

//     image.onload = function () {
//       resolve(image)
//     }

//     image.onerror = function () {
//       reject(new Error('Colude not load image at ' + url))
//     }
//     image.src = url
//   })
// }

// loadImageAsync('https://www.hongtu.com.cn/public/static/ht_home/images/j.png')
//   .then((success) => {
//     console.log(success)
//   }, (err) => {
//     console.log(err)
//   })

// Promise对象实现的 Ajax 操作的例子。
// const getJSON = function (url) {
//   return new Promise((resolve, reject) => {
//     const handler = () => {
//       if (this.readyState !== 4) {
//         return false
//       }
//       if (this.status === 200) {
//         resolve(this.response)
//       } else {
//         reject(new Error(this.statusText))
//       }
//     }
//     const client = new XMLHttpRequest()
//     client.open('GET', url)
//     client.onreadystatechange = handler
//     client.responseType = 'json'
//     client.setRequestHeader('Accept', 'application/json')
//     client.send()
//   })
// }

// getJSON('http://mall-pre.springboot.cn//products').then((json) => {
//   console.log('Contents: ' + json)
//   console.log(2)
// }, (error) => {
//   console.log('出错了', error)
// })
