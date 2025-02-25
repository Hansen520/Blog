/*
 * @Date: 2025-02-25 09:46:33
 * @Description: description
 */
const inp = document.querySelector("input[type=file]");

const captureFrame = (videoFile, time = 0) => {
  return new Promise((resolve) => {
    const vdo = document.createElement("video");
    vdo.currentTime = time;
    vdo.muted = true;
    vdo.autoplay = true;
    vdo.src = URL.createObjectURL(videoFile); // videoFile is a File object

    vdo.oncanplay = () => {
      const cvs = document.createElement("canvas");
      cvs.width = vdo.videoWidth / 2;
      cvs.height = vdo.videoHeight / 2;
      const ctx = cvs.getContext("2d");

      ctx.drawImage(vdo, 0, 0, cvs.width, cvs.height); // 获取视频帧的画面
      cvs.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        resolve({
          url,
          blob,
        });
      });
    };
  });
};

inp.onchange = async (e) => {
  const file = e.target.files[0];
  console.log(file);
  const result = await captureFrame(file, 1);
  console.log(result);
  previewImage(result.url);
  //   for (let i = 0; i < 4; i++) {
  //     const result = await captureFrame(file, i * 1);
  //     console.log(result, i)
  //     previewImage(result.url);
  //   }
};

const previewImage = (url) => {
  const img = document.createElement("img");
  img.src = url;
  document.body.appendChild(img);
};
