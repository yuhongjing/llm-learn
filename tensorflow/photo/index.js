async function recognizeImage(model, imageElement) {
  // Renamed 'image' to 'imageElement' for clarity
  if (!model) {
    return Promise.reject(new Error("模型未加载"));
  }

  // 验证图像元素是否为 HTMLImageElement
  if (!imageElement || !(imageElement instanceof HTMLImageElement)) {
    console.error("传递给 recognizeImage 的不是有效的 HTMLImageElement");
    return Promise.reject(new Error("无效的图像元素"));
  }

  // 确保图像已加载 (这主要是一个安全措施，调用者应确保图像已加载)
  if (!imageElement.complete || imageElement.naturalWidth === 0) {
    console.log("图像元素正在加载或尚未设置源...");
    await new Promise((resolve, reject) => {
      imageElement.onload = () => {
        console.log("imageElement.onload 在 recognizeImage 内部触发");
        resolve();
      };
      imageElement.onerror = () => {
        console.error("imageElement.onerror 在 recognizeImage 内部触发");
        reject(new Error("图像元素加载失败"));
      };
    });
    console.log("图像元素加载完成 (在 recognizeImage 内部确认).");
  }

  const predictions = await model.classify(imageElement);
  console.log("预测结果:", predictions);

  if (predictions && predictions.length > 0) {
    // 返回所有预测结果，并格式化每一项
    return predictions.map((prediction) => ({
      label: prediction.className,
      confidence: parseFloat(prediction.probability.toFixed(4)), // 格式化置信度并确保为数字
      // MobileNet classify 不提供 boundingBox
    }));
  } else {
    console.warn("模型未返回预测结果或预测结果为空。");
    return Promise.reject(new Error("模型未能做出任何预测"));
  }
}

// 页面加载完成后初始化
window.onload = async () => {
  let model;
  try {
    model = await mobilenet.load();
    console.log("MobileNet模型加载完成");
  } catch (error) {
    console.error("MobileNet模型加载失败:", error);
    const resultText = document.getElementById("resultText");
    const imageUpload = document.getElementById("imageUpload");
    if (resultText) {
      resultText.textContent = "错误: 无法加载图像识别模型。 " + error.message;
      resultText.classList.remove("placeholder-text");
    }
    if (imageUpload) {
      imageUpload.disabled = true;
    }
    return; // 模型加载失败，停止后续操作
  }

  const imageUpload = document.getElementById("imageUpload");
  const imagePreview = document.getElementById("imagePreview");
  const resultText = document.getElementById("resultText");

  imageUpload.addEventListener("change", function (event) {
    const file = event.target.files[0];
    console.log("选择的文件:", file); // Log the selected file for debugging
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        imagePreview.src = e.target.result;
        imagePreview.style.display = "block";

        // 当 <img> 元素加载完图片后才进行识别
        imagePreview.onload = async () => {
          console.log("ImagePreview 已加载，调用 recognizeImage。");
          resultText.textContent = "正在识别中..."; // 更新状态
          resultText.classList.remove("placeholder-text");
          try {
            const allPredictions = await recognizeImage(model, imagePreview); // 获取所有预测结果
            if (allPredictions && allPredictions.length > 0) {
              let outputText = "";
              allPredictions.forEach((prediction, index) => {
                outputText += `#${index + 1}:\n   识别内容：${
                  prediction.label
                }\n   相似度：${prediction.confidence} \n\n `;
              });
              resultText.textContent = outputText;
            } else {
              // 此情况理论上会被 recognizeImage 中的 reject 覆盖
              resultText.textContent = "未能获取到有效的识别结果。";
            }
          } catch (error) {
            console.error("识别错误:", error);
            resultText.textContent = "识别失败: " + error.message;
          }
        };
        // 处理图片加载错误的情况
        imagePreview.onerror = () => {
          console.error("ImagePreview 加载失败。");
          resultText.textContent = "图片加载失败。";
          resultText.classList.remove("placeholder-text");
        };
      };
      reader.readAsDataURL(file);
      // 初始状态提示，识别操作已移至 imagePreview.onload
      resultText.textContent = "图片加载中...";
      resultText.classList.remove("placeholder-text");
    } else {
      imagePreview.style.display = "none";
      imagePreview.src = "#";
      resultText.textContent = "上传图片后，将在此处显示识别结果。";
      resultText.classList.add("placeholder-text");
    }
  });
};
