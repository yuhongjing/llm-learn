# TensorFlow 图像识别项目

## 项目描述

这是一个基于 TensorFlow.js 和 MobileNet 模型的图像识别 Web 应用，能够识别上传图片中的物体并显示识别结果。

## 功能特性

- 支持上传图片进行识别
- 显示图片预览
- 输出识别结果（物体名称和置信度）
- 响应式设计，适配不同设备

## 技术栈

- TensorFlow.js
- MobileNet 模型
- HTML/CSS/JavaScript

## 使用方法

1. 打开 index.html 文件
2. 点击"选择图片"按钮上传图片
3. 等待识别结果

## 项目结构

```
/photo/
  ├── index.html    # 主界面
  ├── index.css     # 样式文件
  └── index.js      # 主要逻辑
```

## 依赖

项目通过 CDN 引入以下库：

- @tensorflow/tfjs
- @tensorflow-models/mobilenet

## 注意事项

- 需要网络连接加载模型
- 首次加载可能需要较长时间下载模型
- 识别准确度取决于 MobileNet 模型的训练数据
