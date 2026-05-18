# 尺规作图 — Ruler and Compass Constructions

[English](README.md) | [简体中文](README_zh.md)

---

[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-blue?logo=github)](https://hyfaust.github.io/RulerAndCompass/)
[![License](https://img.shields.io/github/license/hyfaust/RulerAndCompass)](LICENSE)
[![HTML](https://img.shields.io/badge/language-HTML%20%2F%20JavaScript-orange.svg)]()

> 一个交互式尺规作图教学网站，通过逐步动画演示 41 种经典几何作图方法，帮助学习者直观理解几何原理。

## 目录

- [项目简介](#项目简介)
- [功能特性](#功能特性)
- [在线演示](#在线演示)
- [项目结构](#项目结构)
- [作图列表](#作图列表)
- [技术架构](#技术架构)
- [参与贡献](#参与贡献)
- [许可证](#许可证)

## 项目简介

**Ruler and Compass** 是一个基于 Web 的交互式几何教学工具，由 [Ken Brakke]([Ken Brakke's Home Page](https://kenbrakke.com/default.htm)) 教授开发。项目通过纯 HTML、CSS 和 JavaScript 实现了 41 种经典尺规作图法的逐步可视化演示，涵盖从基础的垂直平分线到高级的正十七边形作图。

每个作图页面都提供了：
- 逐步交互式动画，通过单选按钮控制作图进度
- 每一步的详细说明和原理讲解
- 可拖拽的动态几何图形
- 完整的"原理说明"（Why it works）部分

本项目是Ken 教授 [Ruler and compass constructions](https://kenbrakke.com/RulerAndCompass/default.html) 的简体中文翻译，仅用于学习用途

## 在线演示

访问 [GitHub Pages 部署地址](https://hyfaust.github.io/RulerAndCompass/) 查看在线演示。

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

## 添加新作图的步骤

1. 复制一个现有作图文件作为模板（如 `06-Hexagon.html`）
2. 修改标题、几何对象定义和 `calc_points()` 函数
3. 更新步骤标签和原理说明
4. 更新导航链接（上一个 / 下一个作图）
5. 在 `default.html` 索引中添加条目

## 许可证

本项目基于 GPLV3许可证开源。详情请参阅 [LICENSE](LICENSE) 文件。

---

**原作者：** Ken Brakke 教授
**翻译：** 全部内容已翻译为简体中文
