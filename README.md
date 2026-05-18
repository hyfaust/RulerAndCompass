# Ruler and Compass Constructions

[English](README.md) | [简体中文](README_zh.md)

---

[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-blue?logo=github)](https://brakke-doc.github.io/RulerAndCompass/)
[![License](https://img.shields.io/github/license/hyfaust/RulerAndCompass)](LICENSE)
[![HTML](https://img.shields.io/badge/language-HTML%20%2F%20JavaScript-orange.svg)]()

> An interactive geometry teaching website that demonstrates 41 classic ruler and compass constructions through step-by-step animations, helping learners intuitively understand geometric principles.

## Table of Contents

- [Introduction](#introduction)
- [Live Demo](#live-demo)
- [Project Structure](#project-structure)
- [Construction List](#construction-list)
- [Architecture](#architecture)
- [License](#license)

## Introduction

**Ruler and Compass** is a web-based interactive geometry teaching tool developed by [Professor Ken Brakke](https://kenbrakke.com/default.htm). The project implements step-by-step visual demonstrations of 41 classic ruler and compass constructions using pure HTML, CSS, and JavaScript — ranging from basic perpendicular bisectors to the advanced regular 17-gon.

Each construction page provides:
- Step-by-step interactive animations controlled via radio buttons
- Detailed explanations and principles for each step
- Draggable dynamic geometric figures
- A complete "Why it works" section explaining the mathematical reasoning

This project is a Simplified Chinese translation of Professor Ken Brakke's [Ruler and compass constructions](https://kenbrakke.com/RulerAndCompass/default.html), intended for educational use only.

## Live Demo

Visit the [GitHub Pages deployment](https://brakke-doc.github.io/RulerAndCompass/) for a live demo.

## Project Structure

```
RulerAndCompass/
├── index.html              # Entry point (redirects to default.html)
├── default.html            # Main index page listing all constructions
├── rc-common.js            # Shared JavaScript geometry drawing library
├── constructions.css       # Shared stylesheet
│
├── 01-PerpBisector.html    # Perpendicular Bisector
├── 02-PerpToLine.html      # Perpendicular to a Line Through a Point
├── 03-*.html ~ 41-*.html   # Remaining 39 construction pages
├── Inversion.html          # Inversion of a Point with Respect to a Circle
├── big-gon.html            # Construction of Regular Polygons (Gauss theory)
│
├── 17-gon.m.txt            # Mathematica computation: Regular 17-gon
├── 257-gon.m.txt           # Mathematica computation: Regular 257-gon
├── 65537-gon.m.txt         # Mathematica computation: Regular 65537-gon
│
├── architecture-diagram.md # Project architecture Mermaid diagram
└── README.md               # This file
```

### Core Files

| File | Purpose |
|------|---------|
| `default.html` | Main index page with links and descriptions for all constructions |
| `rc-common.js` | Shared geometry drawing engine — provides point, line, circle primitives and Canvas rendering |
| `constructions.css` | Page layout and styling |
| `*-*.html` | Individual construction pages, each defining local geometry objects and calling the shared library |

## Construction List

### Beginner
| # | File | Construction |
|---|------|-------------|
| 01 | PerpBisector | Perpendicular Bisector |
| 02 | PerpToLine | Perpendicular to a Line Through a Point |
| 03 | PerpAtPointOnLine | Perpendicular at a Point on a Line |
| 04 | SquareOnSide | Square on a Given Side |
| 05 | EquilateralTriangle | Equilateral Triangle |
| 06 | Hexagon | Regular Hexagon |

### Basic
| # | File | Construction |
|---|------|-------------|
| 07 | CopyAngle | Copy an Angle |
| 08 | ParallelThroughPoint | Parallel Line Through a Point |
| 09 | ThreeParts | Trisect a Line Segment |
| 10 | AngleBisector | Angle Bisector |
| 11 | 30-degree | 30-Degree Angle |
| 12 | ThreePointCircle | Circle Through Three Points |

### Intermediate
| # | File | Construction |
|---|------|-------------|
| 13 | TriangleCircumCircle | Circumscribed Circle of a Triangle |
| 14 | Incircle | Inscribed Circle |
| 15 | Rectangle | Rectangle with Given Side Lengths |
| 16 | SimilarTriangle | Similar Triangle |
| 17 | CopyRatio | Divide a Segment in a Given Ratio |
| 18A | Medians | Medians of a Triangle |
| 18B | Altitudes | Altitudes of a Triangle |
| 19 | GoldenRectangle | Golden Rectangle |
| 20 | DoubledSquare | Square of Double Area |
| 21 | DoubledCircle | Circle of Double Area |
| 22 | ParallelDistance | Parallel Line at a Given Distance |
| 23 | CircleInAngle | Circle of Given Radius in an Angle |

### Advanced
| # | File | Construction |
|---|------|-------------|
| 24 | SquareRectangle | Square Equal in Area to a Rectangle |
| 25 | MirrorPoint | Mirror Image of a Point |
| 26 | Reflection | Reflection |
| 27 | TangentsToCircle | Tangents to a Circle |
| 28 | TangentCircle | Tangent Circle |
| 29 | ParallelMidline | Parallel Midline |

### Expert
| # | File | Construction |
|---|------|-------------|
| 30 | SquareThru4Points | Square Through Four Points |
| 31A | CircleTangents | Common External Tangents of Two Circles |
| 31B | CircleTangentsInner | Common Internal Tangents of Two Circles |
| 32 | CircleTanParLinesCircle | Tangent to Parallel Lines and a Circle |
| 33 | AngleCircTan | Tangent to an Angle and a Circle |
| 34 | CircleAnglePoint | Circle, Angle, and Point |
| 35 | CircleInAngle | Circle Tangent to a Given Circle Inside an Angle |
| 36 | LinePointsCircle | Circle Tangent to Two Points and a Line |
| 37 | PointCircleLine | Circle Tangent to a Line, Circle, and Point |
| 38 | TwoCirclesLine | Circle Tangent to a Line and Two Circles |
| 39 | ThreeCircles | Circle Tangent to Three Circles |
| 40 | RegularPentagon | Regular Pentagon Inscribed in a Circle |
| 41 | Regular-17-gon | Regular 17-gon Inscribed in a Circle |

### Special Topics
| File | Description |
|------|-------------|
| Inversion | Inversion of a Point with Respect to a Circle |
| big-gon | Construction of Regular Polygons (Gauss theory, including 257-gon and 65537-gon) |

## Architecture

```
┌─────────────────────────────────────────┐
│           Browser (Canvas 2D)            │
├─────────────────────────────────────────┤
│  Construction Pages (01~41, Inversion,   │
│  big-gon)                                │
│  ├── Local geometry object definitions   │
│  ├── calc_points() geometry calculations │
│  ├── draw() Canvas rendering             │
│  └── Step-by-step interaction (radio     │
│      buttons)                            │
├─────────────────────────────────────────┤
│  rc-common.js (Shared Geometry Engine)   │
│  ├── Point/Line/Circle data structures   │
│  ├── Intersection calculations (line-    │
│  │   line, line-circle, circle-circle)   │
│  ├── Canvas drawing functions            │
│  └── Mouse interaction handling          │
├─────────────────────────────────────────┤
│  constructions.css (Shared Styles)       │
└─────────────────────────────────────────┘
```

**Architecture Pattern:** Hub-and-Spoke
- `default.html` serves as the index hub
- `rc-common.js` is the shared utility library
- Each construction page (spoke) loads independently and calls the shared library

## Steps to Add a New Construction

1. Copy an existing construction file as a template (e.g., `06-Hexagon.html`)
2. Modify the title, geometry object definitions, and `calc_points()` function
3. Update the step labels and explanation text
4. Update the navigation links (previous / next construction)
5. Add an entry to the `default.html` index

## License

This project is licensed under the GPLV3 License. See the [LICENSE](LICENSE) file for details.

---

**Original Author:** Professor Ken Brakke
**Translation:** All content has been translated to Simplified Chinese (see [README_zh.md](README_zh.md))
