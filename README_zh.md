[English](README.md) | [简体中文](README_zh.md)

---

# 尺规作图 — Ruler and Compass Constructions

[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-blue?logo=github)](https://brakke-doc.github.io/RulerAndCompass/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![HTML](https://img.shields.io/badge/language-HTML%20%2F%20JavaScript-orange.svg)]()
[![Constructions](https://img.shields.io/badge/constructions-41-brightgreen.svg)]()

> 一个交互式尺规作图教学网站，通过逐步动画演示 41 种经典几何作图方法，帮助学习者直观理解几何原理。

## 目录

- [项目简介](#项目简介)
- [功能特性](#功能特性)
- [在线演示](#在线演示)
- [环境依赖](#环境依赖)
- [快速开始](#快速开始)
- [项目结构](#项目结构)
- [作图列表](#作图列表)
- [技术架构](#技术架构)
- [参与贡献](#参与贡献)
- [许可证](#许可证)

## 项目简介

**Ruler and Compass** 是一个基于 Web 的交互式几何教学工具，由 Ken Brakke 教授开发。项目通过纯 HTML、CSS 和 JavaScript 实现了 41 种经典尺规作图法的逐步可视化演示，涵盖从基础的垂直平分线到高级的正十七边形作图。

每个作图页面都提供了：
- 逐步交互式动画，通过单选按钮控制作图进度
- 每一步的详细说明和原理讲解
- 可拖拽的动态几何图形
- 完整的"原理说明"（Why it works）部分

## 功能特性

- 🎯 **41 种经典作图法** — 从入门到专家级的完整教程
- 🖱️ **交互式操作** — 拖拽控制点，实时观察几何图形变化
- 📖 **逐步演示** — 每个作图分解为清晰的步骤
- 📐 **原理讲解** — 每个作图附带数学原理说明
- 🌐 **纯静态部署** — 无需后端服务器，可部署到任何静态托管平台
- 📱 **跨平台兼容** — 支持主流现代浏览器

## 在线演示

访问 [GitHub Pages 部署地址](https://brakke-doc.github.io/RulerAndCompass/) 查看在线演示。

## 环境依赖

本项目为纯静态网站，**无需安装任何依赖**。

| 依赖项 | 版本要求 | 说明 |
|--------|---------|------|
| 现代浏览器 | Chrome / Firefox / Edge / Safari | 支持 HTML5 Canvas 即可 |
| Web 服务器 | 可选 | 本地浏览可直接打开 HTML 文件，或使用任意静态服务器 |

### 本地浏览方式

**方式一：直接打开**
```bash
# 双击 default.html 或在浏览器中打开
start default.html          # Windows
open default.html           # macOS
xdg-open default.html       # Linux
```

**方式二：使用 Python 内置服务器**
```bash
# Python 3
python -m http.server 8000

# 然后在浏览器中访问 http://localhost:8000
```

**方式三：使用 Node.js 服务器**
```bash
# 使用 npx 一键启动
npx serve .

# 或使用 http-server
npx http-server . -p 8000
```

## 项目结构

```
RulerAndCompass/
├── index.html              # 入口文件（自动跳转到 default.html）
├── default.html            # 主页索引，列出所有作图
├── rc-common.js            # 共享 JavaScript 几何绘图库
├── constructions.css       # 共享样式表
│
├── 01-PerpBisector.html    # 垂直平分线
├── 02-PerpToLine.html      # 过点作垂线
├── 03-*.html ~ 41-*.html   # 其余 39 个作图页面
├── Inversion.html          # 点关于圆的反演
├── big-gon.html            # 正多边形的构造（高斯理论）
│
├── 17-gon.m.txt            # Mathematica 计算：正十七边形
├── 257-gon.m.txt           # Mathematica 计算：正 257 边形
├── 65537-gon.m.txt         # Mathematica 计算：正 65537 边形
│
├── architecture-diagram.md # 项目架构 Mermaid 图
└── README.md               # 本文件
```

### 核心文件说明

| 文件 | 作用 |
|------|------|
| `default.html` | 主页索引，包含所有作图的链接和简介 |
| `rc-common.js` | 共享的几何绘图引擎，提供点、线、圆的基础操作和 Canvas 渲染 |
| `constructions.css` | 页面布局和样式 |
| `*-*.html` | 各个独立的作图页面，每个页面定义局部几何对象并调用公共库 |

## 作图列表

### 入门级
| 编号 | 文件名 | 作图名称 |
|------|--------|---------|
| 01 | PerpBisector | 垂直平分线 |
| 02 | PerpToLine | 过点作垂线 |
| 03 | PerpAtPointOnLine | 线上定点作垂线 |
| 04 | SquareOnSide | 以线段为边作正方形 |
| 05 | EquilateralTriangle | 等边三角形 |
| 06 | Hexagon | 正六边形 |

### 基础级
| 编号 | 文件名 | 作图名称 |
|------|--------|---------|
| 07 | CopyAngle | 复制角 |
| 08 | ParallelThroughPoint | 过点作平行线 |
| 09 | ThreeParts | 等分线段 |
| 10 | AngleBisector | 角平分线 |
| 11 | 30-degree | 30度角 |
| 12 | ThreePointCircle | 三点定圆 |

### 进阶级
| 编号 | 文件名 | 作图名称 |
|------|--------|---------|
| 13 | TriangleCircumCircle | 三角形外接圆 |
| 14 | Incircle | 内切圆 |
| 15 | Rectangle | 给定边长的矩形 |
| 16 | SimilarTriangle | 相似三角形 |
| 17 | CopyRatio | 按比例分割线段 |
| 18A | Medians | 三角形的中线 |
| 18B | Altitudes | 三角形的高线 |
| 19 | GoldenRectangle | 黄金矩形 |
| 20 | DoubledSquare | 倍积正方形 |
| 21 | DoubledCircle | 倍积圆 |
| 22 | ParallelDistance | 等距平行线 |
| 23 | CircleInAngle | 角内的圆 |

### 高级
| 编号 | 文件名 | 作图名称 |
|------|--------|---------|
| 24 | SquareRectangle | 等积正方形 |
| 25 | MirrorPoint | 镜像点 |
| 26 | Reflection | 反射 |
| 27 | TangentsToCircle | 圆的切线 |
| 28 | TangentCircle | 相切圆 |
| 29 | ParallelMidline | 平行中位线 |

### 专家级
| 编号 | 文件名 | 作图名称 |
|------|--------|---------|
| 30 | SquareThru4Points | 过四点作正方形 |
| 31A | CircleTangents | 圆的外公切线 |
| 31B | CircleTangentsInner | 圆的内公切线 |
| 32 | CircleTanParLinesCircle | 与平行线和圆相切 |
| 33 | AngleCircTan | 角与圆的切线 |
| 34 | CircleAnglePoint | 圆、角与点 |
| 35 | CircleInAngle | 与圆相切且在角内的圆 |
| 36 | LinePointsCircle | 与两点和线相切的圆 |
| 37 | PointCircleLine | 与线、圆和点相切的圆 |
| 38 | TwoCirclesLine | 与线和两圆相切的圆 |
| 39 | ThreeCircles | 与三圆相切的圆 |
| 40 | RegularPentagon | 圆内接正五边形 |
| 41 | Regular-17-gon | 圆内接正十七边形 |

### 特别篇
| 文件名 | 说明 |
|--------|------|
| Inversion | 点关于圆的反演 |
| big-gon | 正多边形的构造（高斯理论，含 257 边形和 65537 边形） |

## 技术架构

```
┌─────────────────────────────────────────┐
│           浏览器 (Canvas 2D)             │
├─────────────────────────────────────────┤
│  构建页面 (01~41, Inversion, big-gon)    │
│  ├── 局部几何对象定义                     │
│  ├── calc_points() 几何计算              │
│  ├── draw() Canvas 渲染                  │
│  └── 步骤式交互 (radio buttons)          │
├─────────────────────────────────────────┤
│  rc-common.js (共享几何绘图引擎)          │
│  ├── 点/线/圆 基础数据结构               │
│  ├── 几何交点计算 (line_line,            │
│  │   line_circle, circle_circle)         │
│  ├── Canvas 绘图函数                     │
│  └── 鼠标交互处理                        │
├─────────────────────────────────────────┤
│  constructions.css (共享样式)             │
└─────────────────────────────────────────┘
```

**架构模式：** Hub-and-Spoke（中心辐射式）
- `default.html` 为索引中心（Hub）
- `rc-common.js` 为共享功能库
- 各作图页面（Spoke）独立加载并调用公共库

## 参与贡献

欢迎贡献新的作图方法或改进现有内容！

1. Fork 本仓库
2. 创建功能分支：`git checkout -b feature/new-construction`
3. 参考现有作图页面的结构创建新的 HTML 文件
4. 在 `default.html` 中添加新作图的链接
5. 提交更改：`git commit -m "Add: new construction"`
6. 推送分支：`git push origin feature/new-construction`
7. 创建 Pull Request

### 添加新作图的步骤

1. 复制一个现有作图文件作为模板（如 `06-Hexagon.html`）
2. 修改标题、几何对象定义和 `calc_points()` 函数
3. 更新步骤标签和原理说明
4. 更新导航链接（上一个 / 下一个作图）
5. 在 `default.html` 索引中添加条目

## 许可证

本项目基于 MIT 许可证开源。详情请参阅 [LICENSE](LICENSE) 文件。

---

**原作者：** Ken Brakke 教授
**翻译：** 全部内容已翻译为简体中文
