# chunk-visualizer-web

**单 HTML 文件**的切分效果可视化工具：粘贴文本、调整 chunk 大小与重叠参数，页面上用不同颜色块实时渲染切分边界与重叠部分。双击 `index.html` 即可使用，无需服务器、无需联网。

## 功能简介

- 文本框粘贴任意长文本；
- 滑块调节 **chunk_size（块大小）** 与 **overlap（重叠）**；
- 每个块渲染为一张彩色卡片，标注其 `[start:end]` 字符区间与长度；
- **橙色高亮**标出本块与下一块重叠的字符区域，直观看到"重复出现"的部分。

## 快速开始

直接用浏览器打开 `index.html` 即可。

或在本地起个静态服务器：

```bash
python3 -m http.server 8000
# 浏览器访问 http://localhost:8000/index.html
```

## 无 API key 如何运行

本项目**完全不需要 API key**，所有切分与渲染均在浏览器本地完成。

## 目录说明

```
chunk-visualizer-web/
├── index.html        # 单文件应用（HTML + CSS + JS），内含纯切分函数 chunkText
├── test_chunk.mjs    # Node 断言测试（从 HTML 提取 chunkText 校验）
└── README.md
```

## 运行测试

```bash
node test_chunk.mjs
```

## License

MIT License，Copyright (c) 2026 ljiang9
