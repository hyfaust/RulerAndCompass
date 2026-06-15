# 两圆的内公切线 —— 数学分析

## 1. 问题描述

给定平面上两个不相交的圆：

$$
\omega_1: \text{圆心 } A,\; \text{半径 } r_1 \qquad \omega_2: \text{圆心 } B,\; \text{半径 } r_2
$$

**内公切线**是指一条与两个圆都相切、且切线**穿过两圆之间**的直线。具体而言，内公切线与线段 $AB$ 相交，交点位于两圆之间。本作图要求使用尺规作图法，构造出两圆的全部内公切线。

---

## 2. 数学模型

### 2.1 内公切线的定义

设直线 $\ell$ 与 $\omega_1$ 切于点 $G$，与 $\omega_2$ 切于点 $K$。若 $\ell$ 与线段 $AB$ 相交（交点在 $A$、$B$ 之间），则 $\ell$ 称为两圆的一条**内公切线**（internal common tangent）。

内公切线的几何特征：直线从两圆之间穿过，两个切点分别位于 $AB$ 的两侧（或切线本身穿越连心线区域）。

由对称性，若存在一条内公切线，则在 $AB$ 的另一侧必存在第二条内公切线。因此内公切线的数目为 0 或 2（退化情形下可能为 1）。

### 2.2 内位似中心（Internal Center of Similitude）

**定义.** 点 $E$ 称为 $\omega_1$ 和 $\omega_2$ 的**内位似中心**（internal center of similitude），若 $E$ 在直线 $AB$ 上，且满足：

$$
\frac{EA}{EB} = \frac{r_1}{r_2}
$$

其中 $E$ 在线段 $AB$ 的**内部**（即 $A$、$E$、$B$ 依次排列）。等价地，$E$ 以比例 $r_1 : r_2$ **内分**线段 $AB$。

用向量表示：

$$
E = \frac{r_2 \cdot A + r_1 \cdot B}{r_1 + r_2}
$$

**内位似变换.** 以 $E$ 为中心、位似比 $-r_2/r_1$（**负号**表示方向反转）的位似变换 $\mathcal{H}_{\text{int}}$：

$$
\mathcal{H}_{\text{int}}: P \mapsto E - \frac{r_2}{r_1}(P - E) = \left(1 + \frac{r_2}{r_1}\right)E - \frac{r_2}{r_1}P
$$

此变换满足 $\mathcal{H}_{\text{int}}(A) = B$，因此将 $\omega_1$ 映为 $\omega_2$。

**关键性质.** 若 $E$ 是内位似中心，则从 $E$ 向 $\omega_1$ 所作的切线，同时也是 $\omega_2$ 的切线。

**证明.** 设 $\ell$ 是从 $E$ 向 $\omega_1$ 所作的切线，切点为 $G$，即 $EG \perp AG$。令 $G' = \mathcal{H}_{\text{int}}(G)$，则 $G' \in \omega_2$。由位似变换保持角度，$\angle EG'B = \angle EGA = 90°$，故 $\ell$ 与 $\omega_2$ 也相切于 $G'$。$\blacksquare$

> **与外位似中心的区别.** 外位似中心 $E'$ 在线段 $AB$ 的**外部**（$A$、$B$ 在 $E'$ 同侧），对应位似比 $+r_2/r_1$（同向位似），产生外公切线。内位似中心 $E$ 在线段 $AB$ 的**内部**，对应位似比 $-r_2/r_1$（反向位似），产生内公切线。

### 2.3 圆外一点的切线构造（作图 27 的原理）

从圆外一点 $E$ 向圆 $\omega_1(A, r_1)$ 作切线，切点 $G$ 满足 $EG \perp AG$。由**泰勒斯定理（Thales' Theorem）**，$G$ 位于以 $AE$ 为直径的圆上。

构造方法：设 $F$ 为 $AE$ 的中点，以 $F$ 为圆心、$|FA| = |AE|/2$ 为半径作辅助圆 $\Omega$。则 $\Omega \cap \omega_1$ 的交点即为切点 $G$、$H$。

---

## 3. 构造步骤详细推导

以下逐步分析源码中的构造过程。

**输入.** 两点 $A$、$B$ 及两个圆 $\omega_1(A, r_1)$、$\omega_2(B, r_2)$。

### 步骤 1：射线 $AB$

过 $A$、$B$ 作射线 $\overrightarrow{AB}$，确定两圆心的方向。

```javascript
L3.x1 = a.x; L3.y1 = a.y; L3.x2 = b.x; L3.y2 = b.y;
```

### 步骤 2：过 $A$ 和 $B$ 作 $AB$ 的垂线

- $L_1$：过点 $A$，垂直于 $AB$。
- $L_2$：过点 $B$，垂直于 $AB$。

```javascript
perp_to_line(a, b, L1);  // L1 ⊥ AB, 过 A
perp_to_line(b, a, L2);  // L2 ⊥ AB, 过 B
```

几何意义：$L_1$、$L_2$ 分别是 $\omega_1$、$\omega_2$ 在连心线方向上的**直径线**。$L_1 \cap \omega_1$ 的两个交点是 $\omega_1$ 的"最高点"和"最低点"（以 $AB$ 方向为水平基准），$L_2 \cap \omega_2$ 同理。

### 步骤 3：取两圆的**异侧**顶点 $C$、$D$

- $C$：$L_1$ 与 $\omega_1$ 的交点中，$y$ 坐标**较大**者（取"上方"顶点）。
- $D$：$L_2$ 与 $\omega_2$ 的交点中，$y$ 坐标**较小**者（取"下方"顶点）。

```javascript
line_circle(L1, c1, c, m); if (m.y < c.y) { c.x = m.x; c.y = m.y; }  // C = 上方交点
line_circle(L2, c2, d, m); if (m.y > d.y) { d.x = m.x; d.y = m.y; }  // D = 下方交点
```

**这是与 31A 外公切线构造的关键区别.** 31A 选取 $C$、$D$ 在 $AB$ 的**同侧**（都取 $y$ 较大者），而 31B 选取 $C$、$D$ 在 $AB$ 的**异侧**（$C$ 取上方，$D$ 取下方）。

因此 $AC = r_1$，$BD = r_2$，且 $AC$ 和 $BD$ **方向相反**——$AC$ 向上，$BD$ 向下。

### 步骤 4：射线 $CD$ 与 $AB$ 的交点 $E$

连接 $C$、$D$ 作射线 $CD$，与直线 $AB$（即 $L_3$）交于点 $E$。

```javascript
L4.x1 = c.x; L4.y1 = c.y; L4.x2 = d.x; L4.y2 = d.y;
line_line(L3, L4, e);
```

**定理.** 此交点 $E$ 即为 $\omega_1$、$\omega_2$ 的**内位似中心**。

**证明.** 以 $A$ 为原点建立坐标系，设 $AB$ 为 $x$ 轴，则：

- $L_1 \perp AB$ 过 $A$ 为竖直线 $x = 0$。
- $L_2 \perp AB$ 过 $B$ 为竖直线 $x = d$，其中 $d = |AB|$。
- $C$ 取 $L_1 \cap \omega_1$ 中 $y$ 较大者：$C = (0,\; r_1)$。
- $D$ 取 $L_2 \cap \omega_2$ 中 $y$ 较小者：$D = (d,\; -r_2)$。

直线 $CD$ 的斜率：

$$
\frac{y_C - y_D}{x_C - x_D} = \frac{r_1 - (-r_2)}{0 - d} = -\frac{r_1 + r_2}{d}
$$

令 $y = 0$ 求 $E$ 的横坐标：

$$
\frac{0 - r_1}{e - 0} = -\frac{r_1 + r_2}{d} \implies e = \frac{r_1 \cdot d}{r_1 + r_2}
$$

因此：

$$
EA = e = \frac{r_1 \cdot d}{r_1 + r_2}, \qquad EB = d - e = \frac{r_2 \cdot d}{r_1 + r_2}
$$

$$
\frac{EA}{EB} = \frac{r_1}{r_2}
$$

且 $0 < e < d$，即 $E$ 在线段 $AB$ 内部。这正是内位似中心的定义条件。$\blacksquare$

> **几何直觉.** 由于 $C$ 在 $AB$ 上方而 $D$ 在 $AB$ 下方，线段 $CD$ 必须穿过 $AB$。穿过点 $E$ 将 $AB$ 按 $r_1 : r_2$ 内分。这是因为 $\triangle EAC \sim \triangle EBD$（AA 相似，$\angle EAC = \angle EBD = 90°$，$\angle AEC = \angle BED$ 为对顶角），其中 $C$ 和 $D$ 在 $AB$ 的异侧使得 $E$ 落在线段 $AB$ 内部而非外部。

### 步骤 5：$AE$ 的中点 $F$

```javascript
f.x = (a.x + e.x) / 2; f.y = (a.y + e.y) / 2;
```

### 步骤 6：以 $F$ 为圆心、$|FA|$ 为半径作圆

```javascript
c3.x = f.x; c3.y = f.y; c3.r = dist(f, a);
```

此圆的半径为 $|FA| = |AE|/2$，圆心为 $AE$ 的中点 $F$。因此 **$AE$ 是此辅助圆 $\Omega$ 的直径**。

### 步骤 7：$\Omega$ 与 $\omega_1$ 的交点 $G$、$H$

```javascript
circle_circle(c1, c3, g, h);
```

$\Omega \cap \omega_1 = \{G, H\}$。

几何意义：$G$、$H$ 是 $\omega_1$ 上使得 $AG \perp EG$、$AH \perp EH$ 的两个点，即从 $E$ 向 $\omega_1$ 所作切线的切点。

### 步骤 8：切线 $EG$、$EH$

连接 $E$ 与 $G$、$E$ 与 $H$，得到两条内公切线。

```javascript
draw_line(e, g);
draw_line(e, h);
```

---

## 4. 正确性证明

**定理.** 直线 $EG$ 和 $EH$ 是 $\omega_1$ 和 $\omega_2$ 的两条内公切线。

### 4.1 $EG$ 与 $\omega_1$ 相切于 $G$（泰勒斯定理）

由于 $AE$ 是 $\Omega$ 的直径，$G$ 在 $\Omega$ 上，由**泰勒斯定理（Thales' Theorem）**：

$$
\angle AGE = 90°
$$

即 $EG \perp AG$。

又因为 $A$ 是 $\omega_1$ 的圆心，$G$ 在 $\omega_1$ 上，$EG \perp AG$ 意味着 $EG$ 恰好是 $\omega_1$ 在点 $G$ 处的切线。

同理，$EH$ 与 $\omega_1$ 相切于 $H$。

### 4.2 $EG$ 与 $\omega_2$ 相切（内位似变换法）

考虑内位似变换 $\mathcal{H}_{\text{int}}$，以 $E$ 为中心、位似比 $-r_2/r_1$：

$$
\mathcal{H}_{\text{int}}(P) = E - \frac{r_2}{r_1}(P - E)
$$

令 $G' = \mathcal{H}_{\text{int}}(G)$。由于 $\mathcal{H}_{\text{int}}$ 将 $\omega_1$ 映为 $\omega_2$，有 $G' \in \omega_2$。

**第一步：证明 $\vec{BG'} = -\dfrac{r_2}{r_1}\vec{AG}$。**

由 $\mathcal{H}_{\text{int}}(A) = B$，展开得：

$$
\left(1 + \frac{r_2}{r_1}\right)E - \frac{r_2}{r_1}A = B
$$

因此：

$$
\vec{BG'} = G' - B = \left[\left(1 + \frac{r_2}{r_1}\right)E - \frac{r_2}{r_1}G\right] - B
$$

$$
= \left[\left(1 + \frac{r_2}{r_1}\right)E - B\right] - \frac{r_2}{r_1}G = \frac{r_2}{r_1}A - \frac{r_2}{r_1}G = -\frac{r_2}{r_1}\vec{AG}
$$

**第二步：证明 $BG' \perp EG'$。**

计算点积：

$$
\vec{BG'} \cdot \vec{EG'} = \left(-\frac{r_2}{r_1}\vec{AG}\right) \cdot \left(\frac{r_2}{r_1}\vec{GE}\right) = -\left(\frac{r_2}{r_1}\right)^2 (\vec{AG} \cdot \vec{GE})
$$

由于 $\angle AGE = 90°$（已证），$\vec{AG} \perp \vec{GE}$，故 $\vec{AG} \cdot \vec{GE} = 0$：

$$
\vec{BG'} \cdot \vec{EG'} = 0
$$

即 $BG' \perp EG'$，$EG$ 在 $G'$ 处与 $\omega_2$ 相切。$\blacksquare$

> **关键洞察.** 内位似变换将 $\vec{AG}$ 映为 $\vec{BG'} = -\dfrac{r_2}{r_1}\vec{AG}$，**负号**表明方向反转——这正是内位似（反向位似）的特征。与外位似中 $\vec{BG'} = +\dfrac{r_2}{r_1}\vec{AG}$（方向相同）形成对比。由于位似变换保持正交性，$\vec{AG} \perp \vec{GE}$ 推出 $\vec{BG'} \perp \vec{GE}$，切线条件自动满足。

### 4.3 内公切线的性质

内位似变换中 $G' = E - \dfrac{r_2}{r_1}(G - E)$。在默认坐标系下，$G$ 的 $y$ 坐标为正，$G'$ 的 $y$ 坐标为负（因为 $E_y = 0$，$G'_y = -\dfrac{r_2}{r_1}G_y < 0$）。即 $G$ 在 $AB$ 上方而 $G'$ 在 $AB$ 下方。

**这正是内公切线的核心特征：切点在 $AB$ 的异侧，切线穿过两圆之间。**

从 $E$（位于 $AB$ 上、两圆之间）出发，切线 $EG$ 向上方到达 $\omega_1$ 的切点 $G$，同时向下方到达 $\omega_2$ 的切点 $G'$。

同理，$H$ 在 $AB$ 下方，$H'$ 在 $AB$ 上方，$EH$ 为第二条内公切线。

综上，$EG$ 和 $EH$ 是两圆的两条内公切线。$\blacksquare$

---

## 5. 唯一性与存在性分析

设 $d = |AB|$ 为两圆心距离。

### 5.1 存在性条件

**定理.** 两圆 $\omega_1(A, r_1)$ 和 $\omega_2(B, r_2)$ 存在两条内公切线的充要条件为：

$$
d > r_1 + r_2
$$

即两圆**外离**。

**证明.** 内公切线存在的前提是内位似中心 $E$ 位于两圆之外，能够向两圆作切线。

$E$ 到 $A$ 的距离：

$$
EA = \frac{r_1 \cdot d}{r_1 + r_2}
$$

$E$ 在 $\omega_1$ 外的条件 $EA > r_1$：

$$
\frac{r_1 \cdot d}{r_1 + r_2} > r_1 \iff d > r_1 + r_2
$$

同理，$E$ 到 $B$ 的距离 $EB = r_2 d/(r_1 + r_2) > r_2$ 也给出 $d > r_1 + r_2$。

当 $d > r_1 + r_2$ 时，$E$ 在两圆之外，从 $E$ 向 $\omega_1$ 恰可作两条切线，对应两条内公切线。$\blacksquare$

### 5.2 完整分类

| 条件 | 内公切线数目 | 说明 |
|------|:---:|------|
| $d > r_1 + r_2$ | **2** | 两圆外离，标准情形 |
| $d = r_1 + r_2$ | **1** | 两圆外切，内公切线退化为过切点的公切线 |
| $\|r_1 - r_2\| < d < r_1 + r_2$ | **0** | 两圆相交，不存在内公切线 |
| $d = \|r_1 - r_2\|$ | **0** | 两圆内切 |
| $0 < d < \|r_1 - r_2\|$ | **0** | 一圆包含另一圆 |
| $d = 0$ | **0** | 同心圆 |

> **与外公切线的对比.** 外公切线只需 $d > |r_1 - r_2|$（即两圆不内含），存在范围更广。内公切线需要更严格的条件 $d > r_1 + r_2$（两圆外离）。

### 5.3 构造中各步骤的存在性条件

| 步骤 | 所需条件 | 不满足时的含义 |
|------|---------|--------------|
| 步骤 3: $L_1 \cap \omega_1$ | 恒成立 | $L_1$ 过圆心 $A$，必与 $\omega_1$ 相交 |
| 步骤 3: $L_2 \cap \omega_2$ | 恒成立 | $L_2$ 过圆心 $B$，必与 $\omega_2$ 相交 |
| 步骤 4: $CD \cap AB$ | $r_1 + r_2 > 0$ | 恒成立（$C$、$D$ 在 $AB$ 异侧，$CD$ 必与 $AB$ 相交） |
| 步骤 7: $\Omega \cap \omega_1$ | $EA > r_1$ | 当 $d \leq r_1 + r_2$ 时，$E$ 在 $\omega_1$ 内或圆周上，$\Omega$ 与 $\omega_1$ 可能不交 |

**步骤 7 存在性的补充论证.** $\Omega$ 的圆心 $F$ 为 $AE$ 中点，半径 $R_\Omega = |AE|/2$。点 $A$ 到 $F$ 的距离恰为 $R_\Omega$，故 $A \in \Omega$。又 $A \in \omega_1$。当 $EA > r_1$（即 $d > r_1 + r_2$）时，$E$ 在 $\omega_1$ 外，$\Omega$ 的直径 $AE$ 大于 $r_1$，$\Omega$ 与 $\omega_1$ 在 $A$ 处横截相交，必有另一交点。实际上，$\Omega$ 与 $\omega_1$ 的两个交点 $G$、$H$ 正是从 $E$ 向 $\omega_1$ 所作两条切线的切点。

### 5.4 等半径的特殊情形

当 $r_1 = r_2 = r$ 时，内位似中心 $E$ 位于 $AB$ 的中点。此时两条内公切线**关于 $AB$ 对称**，斜率互为相反数。当 $AB$ 沿水平方向时，两条内公切线分别从 $AB$ 中点向上和向下延伸，与两圆相切。

源码中的构造在此情形下仍然有效：$C = (0, r)$，$D = (d, -r)$，$CD$ 与 $AB$ 的交点 $E = (d/2, 0)$，即 $AB$ 中点。

---

## 6. 与 31A（外公切线）的对比

### 6.1 核心代码差异

31A 和 31B 的构造步骤几乎完全相同，唯一的代码差异在于步骤 3 选取顶点时的条件：

**31A（外公切线）——同侧选取：**

```javascript
line_circle(L1, c1, c, m); if (m.y < c.y) { c.x = m.x; c.y = m.y; }  // C = 上方
line_circle(L2, c2, d, m); if (m.y < d.y) { d.x = m.x; d.y = m.y; }  // D = 上方（同侧！）
```

**31B（内公切线）——异侧选取：**

```javascript
line_circle(L1, c1, c, m); if (m.y < c.y) { c.x = m.x; c.y = m.y; }  // C = 上方
line_circle(L2, c2, d, m); if (m.y > d.y) { d.x = m.x; d.y = m.y; }  // D = 下方（异侧！）
```

仅一处条件从 `m.y < d.y` 变为 `m.y > d.y`，即 $D$ 的选取从"上方"变为"下方"。

### 6.2 几何意义对比

| 特征 | 31A 外公切线 | 31B 内公切线 |
|------|:-----------:|:-----------:|
| $C$、$D$ 的选取 | $AB$ **同侧** | $AB$ **异侧** |
| $AC$ 与 $BD$ 的方向 | 同向（平行且同向） | 反向（平行且反向） |
| $\triangle EAC$ 与 $\triangle EBD$ | 位似比为正（同向位似） | 位似比为负（反向位似） |
| 位似中心 $E$ 的位置 | 线段 $AB$ **外部** | 线段 $AB$ **内部** |
| $E$ 分 $AB$ 的方式 | 外分（$A$、$B$ 在 $E$ 同侧） | 内分（$A$、$E$、$B$ 依次排列） |
| $\vec{BG'}$ 与 $\vec{AG}$ 的关系 | $\vec{BG'} = +\dfrac{r_2}{r_1}\vec{AG}$（同向） | $\vec{BG'} = -\dfrac{r_2}{r_1}\vec{AG}$（反向） |
| 切线与 $AB$ 的关系 | 切线不穿过线段 $AB$ | 切线穿过线段 $AB$ |
| 切点位置 | 两切点在 $AB$ 同侧 | 两切点在 $AB$ 异侧 |
| 适用条件 | $d > \|r_1 - r_2\|$ | $d > r_1 + r_2$ |

### 6.3 数学统一性

两种构造共享同一数学框架：

1. **找到位似中心** $E$（通过 $C$、$D$ 的选取确定是内分还是外分）。
2. **利用泰勒斯定理**，以 $AE$ 为直径作辅助圆 $\Omega$。
3. **$\Omega \cap \omega_1$** 给出切点 $G$、$H$。
4. **连线** $EG$、$EH$ 即为所求切线。

唯一不同的是第一步中 $C$、$D$ 的选取：

- **同侧**选取 $\to$ 外位似中心 $\to$ 外公切线
- **异侧**选取 $\to$ 内位似中心 $\to$ 内公切线

> **设计启示.** 这一观察揭示了一个深刻的几何原理——同侧/异侧的选取，等价于选择位似比的**正负号**。同向位似（正号）保持定向，将"上方"映为"上方"，产生不穿过两圆之间的外公切线；反向位似（负号）反转定向，将"上方"映为"下方"，产生穿过两圆之间的内公切线。两种作图在代码上仅差一个不等号方向（`<` vs `>`），在几何上却对应着完全不同的位似类型。

---

## 7. 数值验证

取默认参数进行具体计算：

$$
A = (-1.7,\; 0), \quad B = (1.5,\; 0), \quad r_1 = 1.2, \quad r_2 = 1.0
$$

### 7.1 基本量

$$
d = |AB| = |1.5 - (-1.7)| = 3.2 = \frac{16}{5}
$$

$$
r_1 + r_2 = 1.2 + 1.0 = 2.2 < 3.2 = d \quad \checkmark \text{（两圆外离，存在内公切线）}
$$

### 7.2 内位似中心 $E$

$E$ 在线段 $AB$ 上，满足 $EA/EB = r_1/r_2 = 6/5$：

$$
E = \frac{r_2 A + r_1 B}{r_1 + r_2} = \frac{1.0 \times (-1.7) + 1.2 \times 1.5}{2.2} = \frac{-1.7 + 1.8}{2.2} = \frac{0.1}{2.2} = \frac{1}{22}
$$

$$
E = \left(\frac{1}{22},\; 0\right) \approx (0.04545,\; 0)
$$

验证：

$$
EA = \left|\frac{1}{22} - (-1.7)\right| = \frac{1}{22} + \frac{17}{10} = \frac{5 + 187}{110} = \frac{96}{55} \approx 1.7455
$$

$$
EB = \left|1.5 - \frac{1}{22}\right| = \frac{3}{2} - \frac{1}{22} = \frac{33 - 1}{22} = \frac{16}{11} \approx 1.4545
$$

$$
\frac{EA}{EB} = \frac{96/55}{16/11} = \frac{96}{55} \times \frac{11}{16} = \frac{6}{5} = \frac{r_1}{r_2} \quad \checkmark
$$

### 7.3 中点 $F$ 和辅助圆 $\Omega$

$$
F = \frac{A + E}{2} = \left(\frac{-17/10 + 1/22}{2},\; 0\right) = \left(\frac{-187/110 + 5/110}{2},\; 0\right) = \left(\frac{-182}{220},\; 0\right) = \left(-\frac{91}{110},\; 0\right)
$$

$$
F \approx (-0.82727,\; 0)
$$

$$
R_\Omega = |AF| = \frac{|AE|}{2} = \frac{96/55}{2} = \frac{48}{55} \approx 0.87273
$$

### 7.4 切线长度

$$
EG^2 = EA^2 - r_1^2 = \left(\frac{96}{55}\right)^2 - \left(\frac{6}{5}\right)^2 = \frac{9216}{3025} - \frac{36}{25} = \frac{9216 - 4356}{3025} = \frac{4860}{3025}
$$

化简：$\gcd(4860, 3025) = 5$，得 $EG^2 = 972/605$。

$$
EG = \sqrt{\frac{972}{605}} \approx 1.26347
$$

验证与 $\omega_2$ 切线长度的关系：

$$
ET^2 = EB^2 - r_2^2 = \left(\frac{16}{11}\right)^2 - 1 = \frac{256 - 121}{121} = \frac{135}{121}
$$

$$
\frac{EG^2}{ET^2} = \frac{972/605}{135/121} = \frac{972}{605} \times \frac{121}{135} = \frac{972}{135} \times \frac{121}{605} = \frac{36}{5} \times \frac{1}{5} = \frac{36}{25} = \left(\frac{r_1}{r_2}\right)^2 \quad \checkmark
$$

### 7.5 求交点 $G$、$H$

$\omega_1$ 的方程：$(x + 17/10)^2 + y^2 = 36/25$

$\Omega$ 的方程：$(x + 91/110)^2 + y^2 = (48/55)^2 = 2304/3025$

两式相减消去 $y^2$：

$$
(x + 17/10)^2 - (x + 91/110)^2 = 36/25 - 2304/3025
$$

左端利用平方差公式（$17/10 = 187/110$）：

$$
\left(\frac{187}{110} - \frac{91}{110}\right)\left(2x + \frac{187 + 91}{110}\right) = \frac{96}{110}\left(2x + \frac{278}{110}\right)
$$

右端：$36/25 - 2304/3025 = (36 \times 121 - 2304)/3025 = (4356 - 2304)/3025 = 2052/3025$

解方程：

$$
\frac{96}{110}\left(2x + \frac{139}{55}\right) = \frac{2052}{3025}
$$

$$
2x + \frac{139}{55} = \frac{2052}{3025} \times \frac{110}{96} = \frac{2052 \times 110}{3025 \times 96} = \frac{225720}{290400} = \frac{171}{220}
$$

$$
2x = \frac{171}{220} - \frac{139}{55} = \frac{171}{220} - \frac{556}{220} = -\frac{385}{220} = -\frac{77}{44}
$$

$$
x = -\frac{77}{88} = -\frac{7}{8}
$$

代入 $\omega_1$ 求 $y$：

$$
\left(-\frac{7}{8} + \frac{17}{10}\right)^2 + y^2 = \frac{36}{25}
$$

$$
\left(\frac{-35 + 68}{40}\right)^2 + y^2 = \frac{36}{25} \implies \left(\frac{33}{40}\right)^2 + y^2 = \frac{36}{25}
$$

$$
y^2 = \frac{36}{25} - \frac{1089}{1600} = \frac{2304 - 1089}{1600} = \frac{1215}{1600}
$$

化简：$\gcd(1215, 1600) = 5$，得 $y^2 = 243/320$。$243 = 3^5$，$320 = 2^6 \times 5$。

$$
y = \pm\sqrt{\frac{243}{320}} = \pm\frac{9\sqrt{3}}{8\sqrt{5}} = \pm\frac{9\sqrt{15}}{40}
$$

因此：

$$
G = \left(-\frac{7}{8},\; \frac{9\sqrt{15}}{40}\right) \approx (-0.87500,\; 0.87142)
$$

$$
H = \left(-\frac{7}{8},\; -\frac{9\sqrt{15}}{40}\right) \approx (-0.87500,\; -0.87142)
$$

### 7.6 验证 $G$ 在 $\omega_1$ 上

$$
\vec{AG} = G - A = \left(-\frac{7}{8} + \frac{17}{10},\; \frac{9\sqrt{15}}{40}\right) = \left(\frac{33}{40},\; \frac{9\sqrt{15}}{40}\right)
$$

$$
|\vec{AG}|^2 = \frac{1089}{1600} + \frac{1215}{1600} = \frac{2304}{1600} = \frac{36}{25} = r_1^2 \quad \checkmark
$$

### 7.7 验证切线条件 $EG \perp AG$

$$
\vec{EG} = G - E = \left(-\frac{7}{8} - \frac{1}{22},\; \frac{9\sqrt{15}}{40}\right) = \left(-\frac{77 + 4}{88},\; \frac{9\sqrt{15}}{40}\right) = \left(-\frac{81}{88},\; \frac{9\sqrt{15}}{40}\right)
$$

$$
\vec{AG} \cdot \vec{EG} = \frac{33}{40} \times \left(-\frac{81}{88}\right) + \frac{9\sqrt{15}}{40} \times \frac{9\sqrt{15}}{40}
$$

$$
= -\frac{2673}{3520} + \frac{1215}{1600}
$$

通分（$\text{lcm}(3520, 1600) = 17600$）：

$$
= -\frac{2673 \times 5}{17600} + \frac{1215 \times 11}{17600} = \frac{-13365 + 13365}{17600} = 0 \quad \checkmark
$$

点积为零，$\angle AGE = 90°$，即 $EG$ 是 $\omega_1$ 在 $G$ 处的切线。

### 7.8 验证 $EG$ 也是 $\omega_2$ 的切线

由内位似变换 $G' = \mathcal{H}_{\text{int}}(G)$，位似比 $-r_2/r_1 = -5/6$：

$$
G' = E - \frac{5}{6}(G - E) = \frac{11}{6}E - \frac{5}{6}G
$$

$$
G'_x = \frac{11}{6} \times \frac{1}{22} - \frac{5}{6} \times \left(-\frac{7}{8}\right) = \frac{1}{12} + \frac{35}{48} = \frac{4 + 35}{48} = \frac{39}{48} = \frac{13}{16}
$$

$$
G'_y = \frac{11}{6} \times 0 - \frac{5}{6} \times \frac{9\sqrt{15}}{40} = -\frac{45\sqrt{15}}{240} = -\frac{3\sqrt{15}}{16}
$$

$$
G' = \left(\frac{13}{16},\; -\frac{3\sqrt{15}}{16}\right) \approx (0.81250,\; -0.72618)
$$

注意：$G$ 在 $AB$ **上方**（$y > 0$），$G'$ 在 $AB$ **下方**（$y < 0$）——切点在 $AB$ 异侧。

**验证 $G' \in \omega_2$：**

$$
\vec{BG'} = G' - B = \left(\frac{13}{16} - \frac{3}{2},\; -\frac{3\sqrt{15}}{16}\right) = \left(-\frac{11}{16},\; -\frac{3\sqrt{15}}{16}\right)
$$

$$
|\vec{BG'}|^2 = \frac{121}{256} + \frac{135}{256} = \frac{256}{256} = 1 = r_2^2 \quad \checkmark
$$

**验证 $\vec{BG'} = -\dfrac{r_2}{r_1}\vec{AG}$：**

$$
-\frac{5}{6}\vec{AG} = -\frac{5}{6}\left(\frac{33}{40},\; \frac{9\sqrt{15}}{40}\right) = \left(-\frac{165}{240},\; -\frac{45\sqrt{15}}{240}\right) = \left(-\frac{11}{16},\; -\frac{3\sqrt{15}}{16}\right)
$$

$$
= \vec{BG'} \quad \checkmark
$$

**验证 $BG' \perp EG'$：**

$$
\vec{EG'} = G' - E = \left(\frac{13}{16} - \frac{1}{22},\; -\frac{3\sqrt{15}}{16}\right) = \left(\frac{143 - 8}{176},\; -\frac{3\sqrt{15}}{16}\right) = \left(\frac{135}{176},\; -\frac{3\sqrt{15}}{16}\right)
$$

$$
\vec{BG'} \cdot \vec{EG'} = \left(-\frac{11}{16}\right)\left(\frac{135}{176}\right) + \left(-\frac{3\sqrt{15}}{16}\right)\left(-\frac{3\sqrt{15}}{16}\right)
$$

$$
= -\frac{1485}{2816} + \frac{135}{256} = -\frac{1485}{2816} + \frac{1485}{2816} = 0 \quad \checkmark
$$

$EG$ 确实与 $\omega_2$ 在 $G'$ 处相切。

### 7.9 两条切线的斜率

$$
m_{EG} = \frac{G_y - E_y}{G_x - E_x} = \frac{9\sqrt{15}/40}{-81/88} = -\frac{9\sqrt{15}}{40} \times \frac{88}{81} = -\frac{11\sqrt{15}}{45} \approx -0.9487
$$

$$
m_{EH} = \frac{H_y - E_y}{H_x - E_x} = \frac{-9\sqrt{15}/40}{-81/88} = \frac{11\sqrt{15}}{45} \approx 0.9487
$$

两条切线斜率互为相反数（关于 $x$ 轴对称），且斜率绝对值约为 $0.949$。

**验证内公切线穿过线段 $AB$：** $E = (1/22, 0)$ 在 $A = (-1.7, 0)$ 和 $B = (1.5, 0)$ 之间，切线从 $E$ 出发分别向上和向下延伸，穿过两圆之间的区域。

### 7.10 小结

| 对象 | 精确值 | 近似值 |
|------|--------|--------|
| $A$ | $(-17/10,\; 0)$ | $(-1.700,\; 0)$ |
| $B$ | $(3/2,\; 0)$ | $(1.500,\; 0)$ |
| $d = \|AB\|$ | $16/5$ | $3.200$ |
| $E$（内位似中心） | $(1/22,\; 0)$ | $(0.045,\; 0)$ |
| $EA$ | $96/55$ | $1.745$ |
| $EB$ | $16/11$ | $1.455$ |
| $F$（$AE$ 中点） | $(-91/110,\; 0)$ | $(-0.827,\; 0)$ |
| $R_\Omega$ | $48/55$ | $0.873$ |
| $G$ | $(-7/8,\; 9\sqrt{15}/40)$ | $(-0.875,\; 0.871)$ |
| $H$ | $(-7/8,\; -9\sqrt{15}/40)$ | $(-0.875,\; -0.871)$ |
| $G'$ | $(13/16,\; -3\sqrt{15}/16)$ | $(0.813,\; -0.726)$ |
| $H'$ | $(13/16,\; 3\sqrt{15}/16)$ | $(0.813,\; 0.726)$ |
| $EG$ | $\sqrt{972/605}$ | $1.263$ |
| $m_{EG}$ | $-11\sqrt{15}/45$ | $-0.949$ |
| $\vec{AG} \cdot \vec{EG}$ | $0$ | $0$（精确验证 $\perp$） |
| $\vec{BG'} \cdot \vec{EG'}$ | $0$ | $0$（精确验证 $\perp$） |
| $\|BG'\|$ | $1$ | $1.000 = r_2$（精确验证 $G' \in \omega_2$） |
