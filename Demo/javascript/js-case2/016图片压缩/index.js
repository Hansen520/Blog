/*
 * @Date: 2024-07-30 11:18:08
 * @Description: description
 */
const MAX_WIDTH = 800; // 图片最大宽度

const compress = (base64, quality, mimeType) => {
  let canvas = document.createElement("canvas");
  let img = document.createElement("img");
  img.crossOrigin = "anonymous";
  return new Promise((resolve, reject) => {
    img.src = base64;
    img.onload = () => {
      let targetWidth, targetHeight;
      if (img.width > MAX_WIDTH) {
        targetWidth = MAX_WIDTH;
        targetHeight = (img.height * MAX_WIDTH) / img.width;
      } else {
        targetWidth = img.width;
        targetHeight = img.height;
      }
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      let ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除画布
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
      let imageData = canvas.toDataURL(mimeType, quality / 100); // 转成base64对象
      resolve(imageData);
    };
  });
};

// 对于返回的 Data URL 格式的图片数据，为了进一步减少传输的数据量，我们可以把它转换为 Blob 对象：
function dataUrlToBlob(base64, mimeType) {
  let bytes = window.atob(base64.split(",")[1]);
  let ab = new ArrayBuffer(bytes.length);
  let ia = new Uint8Array(ab);
  
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }
  console.log(ia, 38);
  return new Blob([ab], { type: mimeType }); // new Blob(["一文彻底掌握 Blob Web API"], { type: "text/plain" });
}

function uploadFile(url, blob) {
  let formData = new FormData();
  let request = new XMLHttpRequest();
  formData.append("image", blob);
  request.open("POST", url, true);
  request.send(formData);
}

/*
    其实 Canvas 对象除了提供 toDataURL() 方法之外，它还提供了一个 toBlob() 方法，该方法的语法如下：

1
canvas.toBlob(callback, mimeType, qualityArgument)
　　

和 toDataURL() 方法相比，toBlob() 方法是异步的，因此多了个 callback 参数，这个 callback 回调方法默认的第一个参数就是转换好的 blob文件信息。
*/
