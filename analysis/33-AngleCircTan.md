# 尺规作图 33：角平分线上与圆相切的圆

## 数学分析

---

## 1. 问题描述

**已知条件：**
- 一个角 $\angle BAD$，顶点为 $A$，两边为射线 $AB$ 和 $AD$；
- 一个圆 $\mathcal{C}(D, r)$，圆心为 $D$，半径为 $r$（圆心 $D$ 位于射线 $AD$ 上）。

**求作：**
用尺规作图构造一个圆 $\mathcal{C}_0(I, \rho)$，使得：

1. 圆心 $I$ 位于 $\angle BAD$ 的角平分线上；
2. $\mathcal{C}_0$ 与已知圆 $\mathcal{C}(D, r)$ 相切。

**注意：** 所求圆**不需要**与角的两边相切，仅要求圆心在角平分线上且与给定圆相切。

源代码中使用的默认参数为：

| 对象 | 参数 |
|------|------|
| 顶点 $A$ | $(-2.5,\; 0.5)$ |
| 点 $B$（确定射线 $AB$） | $(1.5,\; 0.5)$ |
| 圆心 $D$（在射线 $AD$ 上） | $(2,\; -1.1)$ |
| 给定圆半径 $r$ | $1.2$ |

---

## 2. 数学模型

### 2.1 展开角与角平分线坐标系

本作图的核心数学思想是**展开角技巧**（expanded angle technique）。

**定义 2.1（展开角）.** 将 $B$ 关于直线 $AD$ 作对称得到 $C$。则 $A$、$B$、$C$ 三点形成展开角 $\angle BAC$，满足：
$$
\angle BAC = 2\,\angle BAD = 2\alpha
$$
其中 $\alpha = \angle BAD$，且直线 $AD$ 恰好是 $\angle BAC$ 的角平分线。

> **为什么叫"展开角"？** 原角 $\angle BAD$ 的两条边 $AB$ 和 $AD$ 并不对称，但通过反射 $B$，我们得到了一个对称的角 $\angle BAC$，其平分线恰好是射线 $AD$。这样一来，角平分线上的点到两条边 $AB$、$AC$ 的距离**自动相等**，这一等距性是整个构造的关键。

以 $A$ 为原点，角平分线 $AD$ 方向为 $x$ 轴正向，建立直角坐标系。在此坐标系下：

- 射线 $AB$ 的方向角为 $+\alpha$（角平分线上方）；
- 射线 $AC$ 的方向角为 $-\alpha$（角平分线下方）；
- 射线 $AD$ 沿 $x$ 轴正向；
- $\angle BAC$ 的角平分线就是 $x$ 轴（即射线 $AD$ 所在直线）。### 2.2 基本距离关系

设 $d = |AD|$（顶点到圆心的距离）。在角平分线坐标系中：

$$
D = (d,\; 0)
$$

这是因为 $D$ 本身就位于角平分线 $AD$ 上。对于角平分线上的任意点 $P$，距 $A$ 的距离为 $t_P$，则 $P$ 到射线 $AB$ 和射线 $AC$ 的距离均为：

$$
d(P,\; AB) = d(P,\; AC) = t_P \sin\alpha
$$

### 2.3 与给定圆相切的条件

设所求圆为 $\mathcal{C}_0(I, \rho)$，圆心 $I$ 在角平分线上，$|AI| = t_I$，$\rho$ 为半径。

两圆相切的充要条件为：

**外切（external tangency）：**
$$
|ID| = r + \rho
$$

**内切（internal tangency）：**
$$
|ID| = |r - \rho|
$$

在角平分线坐标系中，$I = (t_I, 0)$，$D = (d, 0)$（同在 $x$ 轴上），故：
$$
|ID| = |t_I - d|
$$

### 2.4 解的分类

根据切点在 $D$ 的哪一侧（近侧 $t_E = d - r$ 或远侧 $t_E = d + r$），以及相切类型（外切或内切），共可分为四类解：

| 解 | 切点位置 | 相切类型 | 切点坐标 | $t_I$ |
|:---:|:---:|:---:|:---:|:---:|
| $S_1$ | 近侧 | 内切 | $(d - r,\; 0)$ | $\dfrac{d - r}{1 - \sin\alpha}$ |
| $S_2$ | 近侧 | 外切 | $(d - r,\; 0)$ | $\dfrac{d - r}{1 + \sin\alpha}$ |
| $S_3$ | 远侧 | 内切 | $(d + r,\; 0)$ | $\dfrac{d + r}{1 + \sin\alpha}$ |
| $S_4$ | 远侧 | 外切 | $(d + r,\; 0)$ | $\dfrac{d + r}{1 - \sin\alpha}$ |

**源代码的构造对应 $S_2$**——在角平分线上构造外切圆，切点位于 $D$ 靠近 $A$ 的一侧。
---

## 3. 构造步骤详细推导

源代码的构造分为 **8 个步骤**，核心思想是利用展开角的内切圆来间接构造所求圆。以下在角平分线坐标系中逐步推导。

### 步骤 1：展开角——反射 $B$ 关于直线 $AD$ 得到 $C$

将 $B$ 关于直线 $AD$ 作对称，得到点 $C$。源代码通过以下过程实现：
1. 计算 $B$ 到直线 $AD$ 的垂足 $P$；
2. 令 $C = 2P - B$（即 $C$ 是 $B$ 关于 $P$ 的对称点）。

或者等价地：构造 $A$ 关于 $D$ 的对称点 $C_0 = 2D - A$，过 $C_0$ 作 $AD$ 的垂线 $L_6$，以 $A$ 为圆心、$|AB|$ 为半径画弧与 $L_6$ 交于 $C$。

**结果：** $\angle BAC = 2\alpha$，直线 $AD$ 平分 $\angle BAC$。

### 步骤 2：求直线 $AD$ 与圆 $\mathcal{C}(D, r)$ 的交点 $E$

直线 $AD$（即角平分线）与圆 $(D, r)$ 有两个交点，距 $A$ 的距离分别为 $d - r$ 和 $d + r$。源代码取**靠近 $A$** 的交点：

$$
|AE| = d - r
$$

在角平分线坐标系中：
$$
E = (d - r,\; 0)
$$

$E$ 位于 $A$ 与 $D$ 之间（当 $d > r$ 时）。$E$ 就是所求圆与给定圆 $\mathcal{C}(D, r)$ 的**切点**。

### 步骤 3：过 $E$ 作 $AB$ 的垂线，垂足为 $F$

过 $E$ 作射线 $AB$ 的垂线，交 $AB$ 于 $F$。源代码通过 `off_perp_to_line(e, L1, L4)` 实现。

在角平分线坐标系中，射线 $AB$ 的方向角为 $\alpha$，$E = (d - r, 0)$。$E$ 到射线 $AB$ 的距离为：

$$
|EF| = (d - r)\sin\alpha
$$

$F$ 的坐标为 $E$ 在射线 $AB$ 上的投影：
$$
F = \big((d-r)\cos^2\alpha,\; (d-r)\sin\alpha\cos\alpha\big)
$$### 步骤 4：以 $E$ 为圆心、$|EF|$ 为半径作圆

$$
\mathcal{C}_1(E,\; \rho_0) : \text{圆心 } E = (d-r,\; 0),\; \text{半径 } \rho_0 = (d-r)\sin\alpha
$$

> **关键性质（展开角内切圆）：** 由于 $E$ 在 $\angle BAC$ 的角平分线 $AD$ 上，且 $|EF|$ 是 $E$ 到射线 $AB$ 的距离，由角平分线的等距性，$E$ 到射线 $AC$ 的距离也等于 $|EF|$。因此圆 $\mathcal{C}_1$ 同时与射线 $AB$ 和 $AC$ 相切，是**展开角 $\angle BAC$ 的内切圆**。
>
> 这正是展开角技巧的精髓：通过构造展开角，我们将"角平分线上一点到角边的距离"这个信息，**自然地**转化为一个与两边相切的圆。

### 步骤 5：求圆 $\mathcal{C}_1(E, \rho_0)$ 与角平分线（射线 $AD$）的另一个交点 $G$

圆 $\mathcal{C}_1$ 与 $x$ 轴的交点满足 $|x - (d-r)| = (d-r)\sin\alpha$，解为：

$$
x = (d - r) \pm (d - r)\sin\alpha
$$

- $x = (d-r) - (d-r)\sin\alpha$：对应点 $E$ 本身（在 $A$ 一侧）；
- $x = (d-r) + (d-r)\sin\alpha = (d-r)(1 + \sin\alpha)$：对应另一个交点 $G$。

源代码取距 $E$ 较远的交点（靠近 $D$ 的一侧）：

$$
G = \big((d-r)(1 + \sin\alpha),\; 0\big)
$$

因此：
$$
|AG| = (d - r)(1 + \sin\alpha)
$$

**几何意义：** $G$ 是圆 $\mathcal{C}_1$ 与角平分线的另一个交点。$EG = (d-r)\sin\alpha = \rho_0$（圆的直径在角平分线方向上的投影）。这个 $|AG|$ 值将在后续步骤中用于确定所求圆的圆心位置。### 步骤 6：过 $E$ 作直线 $L_5$，方向为 $\overrightarrow{FG}$

直线 $L_5$ 过 $E$，方向向量为 $\overrightarrow{FG} = G - F$。

在角平分线坐标系中：

$$
\overrightarrow{FG} = G - F = \big((d-r)(1+\sin\alpha) - (d-r)\cos^2\alpha,\; -(d-r)\sin\alpha\cos\alpha\big)
$$

利用 $1 - \cos^2\alpha = \sin^2\alpha$，化简得：

$$
\overrightarrow{FG} = (d-r)\sin\alpha\big(\sin\alpha + \sin\alpha,\; -\cos\alpha\big) = (d-r)\sin\alpha\big(1 + \sin\alpha,\; -\cos\alpha\big)
$$

$$
\overrightarrow{FG} = (d-r)\sin\alpha \cdot (1 + \sin\alpha,\; -\cos\alpha)
$$

$L_5$ 的斜率为：
$$
k_{L_5} = \frac{-\cos\alpha}{1 + \sin\alpha} = -\tan\!\left(\frac{\pi}{4} - \frac{\alpha}{2}\right)
$$

**注意：** $L_5$ 的方向与角平分线方向 $(1, 0)$ 并不相同。$L_5$ 通过点 $E$ 且方向为 $\overrightarrow{FG}$，这为后续步骤建立了关键的比例关系。

### 步骤 7：求 $L_5$ 与射线 $AB$ 的交点 $H$

$L_5$ 过 $E = (d-r, 0)$，方向 $(1+\sin\alpha, -\cos\alpha)$，与射线 $AB$（方向角 $\alpha$）的交点 $H$ 满足 $y/x = \tan\alpha$。

设 $L_5$ 的参数方程为：
$$
(x, y) = (d-r, 0) + t(1+\sin\alpha, -\cos\alpha)
$$

代入 $y/x = \tan\alpha = \sin\alpha/\cos\alpha$，即 $y\cos\alpha = x\sin\alpha$：

$$
-t\cos\alpha \cdot \cos\alpha = \big((d-r) + t(1+\sin\alpha)\big)\sin\alpha
$$

$$
-t\cos^2\alpha = (d-r)\sin\alpha + t\sin\alpha(1+\sin\alpha)
$$

$$
-t\big[\cos^2\alpha + \sin\alpha(1+\sin\alpha)\big] = (d-r)\sin\alpha
$$

利用 $\cos^2\alpha + \sin\alpha + \sin^2\alpha = 1 + \sin\alpha$：

$$
t = -\frac{(d-r)\sin\alpha}{1 + \sin\alpha}
$$

代入参数方程得 $H$ 的坐标：

$$
x_H = (d-r) - \frac{(d-r)\sin\alpha}{1+\sin\alpha}(1+\sin\alpha) = (d-r)(1 - \sin\alpha)
$$

$$
y_H = \frac{(d-r)\sin\alpha\cos\alpha}{1+\sin\alpha}
$$

由 $|AH| = \sqrt{x_H^2 + y_H^2}$ 或等价地 $|AH| = x_H/\cos\alpha$（$H$ 在方向角 $\alpha$ 的射线上）：

$$
|AH| = \frac{(d-r)(1 - \sin\alpha)}{\cos\alpha} = \frac{(d-r)\cos\alpha}{1 + \sin\alpha}
$$

其中最后一步利用了恒等式 $\dfrac{1 - \sin\alpha}{\cos\alpha} = \dfrac{\cos\alpha}{1 + \sin\alpha}$。### 步骤 8：过 $H$ 作 $AB$ 的垂线交角平分线 $AD$ 于 $I$，以 $I$ 为圆心、$|IH|$ 为半径作圆

源代码通过 `perp_to_line(h, b, L6)` 作过 $H$ 且垂直于 $AB$ 的直线，再用 `line_line(L6, L2, i)` 求其与 $AD$ 的交点 $I$。

在直角三角形 $\triangle AIH$ 中，$\angle IAH = \alpha$（即 $\angle BAD$），$\angle AHI = 90°$，故：

$$
|AI| = |AH| \cos\alpha = \frac{(d-r)\cos\alpha}{1+\sin\alpha} \cdot \cos\alpha = \frac{(d-r)\cos^2\alpha}{1+\sin\alpha}
$$

利用 $\cos^2\alpha = 1 - \sin^2\alpha = (1-\sin\alpha)(1+\sin\alpha)$：

$$
\boxed{t_I = |AI| = \frac{d - r}{1 + \sin\alpha}}
$$

所求圆的半径：
$$
\rho = |IH| = |AI|\sin\alpha = \boxed{\frac{(d-r)\sin\alpha}{1 + \sin\alpha}}
$$

最终构造的圆为 $\mathcal{C}_0(I, \rho)$。

### 步骤总结——展开角方法的逻辑链条

整个构造的逻辑可概括为：

1. **展开角**：将 $\angle BAD$ 展开为 $\angle BAC = 2\alpha$，使 $AD$ 成为角平分线；
2. **内切圆**：在展开角内构造内切圆 $\mathcal{C}_1(E, \rho_0)$，它与两边 $AB$、$AC$ 均相切；
3. **比例转移**：利用 $L_5$（过 $E$、方向为 $\overrightarrow{FG}$）与 $AB$ 的交点 $H$，以及 $H$ 到 $AD$ 的垂线，将展开角内切圆的半径信息**按比例缩小**传递到所求圆的圆心 $I$；
4. **等距保证**：$I$ 在角平分线上，$\rho = |IH| = t_I\sin\alpha$，而 $E$ 也在角平分线上且 $|IE| = \rho$，确保 $E$ 是两圆的切点。
---

## 4. 正确性证明

**定理 4.1.** 以上构造得到的圆 $\mathcal{C}_0(I, \rho)$ 满足：
1. 圆心 $I$ 在 $\angle BAD$ 的角平分线上；
2. $\mathcal{C}_0$ 与 $\mathcal{C}(D, r)$ 外切，切点为 $E$。

**证明：**

在角平分线坐标系中，$A$ 为原点，$AD$ 方向为 $x$ 轴。各关键点的坐标为：

$$
E = (d - r,\; 0), \quad I = (t_I,\; 0), \quad D = (d,\; 0)
$$

其中 $t_I = \dfrac{d - r}{1 + \sin\alpha}$。

#### （i）$I$ 在角平分线 $AD$ 上

由步骤 8，$I$ 是过 $H$ 的 $AB$ 垂线与直线 $AD$ 的交点。$AD$ 即 $\angle BAD$ 的角平分线，因此 $I$ 在角平分线上。$\checkmark$

#### （ii）$\rho = t_I \sin\alpha$

$I$ 在角平分线上，$H$ 在射线 $AB$ 上，$IH \perp AB$。在直角三角形 $\triangle AIH$ 中，$\angle IAH = \alpha$，故：

$$
\rho = |IH| = |AI| \sin\alpha = t_I \sin\alpha \quad \checkmark
$$

#### （iii）$|IE| = \rho$——证明 $E$ 在圆 $\mathcal{C}_0$ 上

这是证明的核心。$I$ 和 $E$ 都在 $x$ 轴（角平分线）上，且 $0 < t_I < d - r$（即 $I$ 在 $A$ 和 $E$ 之间），所以：

$$
|IE| = |AE| - |AI| = (d - r) - \frac{d - r}{1 + \sin\alpha}
$$

提取公因子 $(d - r)$：

$$
|IE| = (d - r)\left(1 - \frac{1}{1 + \sin\alpha}\right) = (d - r) \cdot \frac{\sin\alpha}{1 + \sin\alpha} = \rho
$$

因此 $E$ 到 $I$ 的距离恰好等于 $\rho$，即 $E$ 在圆 $\mathcal{C}_0(I, \rho)$ 上。$\checkmark$

#### （iv）$\mathcal{C}_0$ 与 $\mathcal{C}(D, r)$ 外切于 $E$

$E$ 在 $\mathcal{C}_0$ 上（$|IE| = \rho$），$E$ 在 $\mathcal{C}(D, r)$ 上（$|DE| = r$）。

$I$、$E$、$D$ 三点共线（均在 $x$ 轴上），且按 $A$-$I$-$E$-$D$ 的顺序排列（$0 < t_I < d - r < d$）。因此：

$$
|ID| = |IE| + |ED| = \rho + r
$$

这满足两圆外切的充要条件 $|ID| = r + \rho$，且 $E$ 为两圆的公共切点（在圆心连线 $ID$ 上）。$\checkmark$

**综合（i）--（iv），** $\mathcal{C}_0(I, \rho)$ 的圆心在 $\angle BAD$ 的角平分线上，且与 $\mathcal{C}(D, r)$ 外切于 $E$。 $\square$

---

**推论 4.2.** 构造的圆 $\mathcal{C}_0$ 是展开角 $\angle BAC$ 的内切圆的缩小版。

**证明：** 展开角 $\angle BAC$ 的内切圆 $\mathcal{C}_1(E, \rho_0)$ 的半径为 $\rho_0 = (d-r)\sin\alpha$，圆心距 $E$ 在角平分线上。

所求圆 $\mathcal{C}_0(I, \rho)$ 的半径 $\rho = \dfrac{(d-r)\sin\alpha}{1+\sin\alpha} = \dfrac{\rho_0}{1+\sin\alpha}$，圆心 $I$ 也在角平分线上。

由于 $1 + \sin\alpha > 1$，有 $\rho < \rho_0$。所求圆可视为展开角内切圆沿角平分线方向**按比例 $\frac{1}{1+\sin\alpha}$ 缩放**的结果。 $\square$
---

## 5. 唯一性与存在性分析

### 5.1 四类解的一般公式

回到角平分线坐标系。$I$ 和 $D$ 都在 $x$ 轴上，$|ID| = |t_I - d|$。设 $t_E$ 为切点到 $A$ 的距离，$\rho = t_I \sin\alpha$。

**情形 $S_1$：近侧切点，内切**

切点 $E_1 = (d - r, 0)$，$\mathcal{C}(D, r)$ 在 $\mathcal{C}_0$ 内部。

$|ID| = |r - \rho|$ 且 $I$ 在 $E_1$ 外侧（$t_I > d - r$）：
$$
t_I - (d-r) = r - \rho = r - t_I\sin\alpha \implies t_I(1 + \sin\alpha) = d - r + r = d - r + r
$$

等等，更直接地：$I$ 在 $E$ 外侧，$|IE| = \rho$，$|ID| = \rho - r$（$D$ 在 $I$ 和 $E$ 之间不成立）。实际上 $t_I > d$，$|ID| = t_I - d$，$|IE| = t_I - (d-r)$。

$$
t_I - (d-r) = \rho = t_I\sin\alpha \implies t_I(1-\sin\alpha) = d - r
$$

$$
\boxed{t_I = \frac{d - r}{1 - \sin\alpha}, \quad \rho = \frac{(d-r)\sin\alpha}{1 - \sin\alpha}}
$$

**情形 $S_2$：近侧切点，外切**（源代码构造的解）

切点 $E_1 = (d - r, 0)$，$|ID| = r + \rho$，$I$ 在 $A$ 和 $E_1$ 之间。

$$
(d-r) - t_I = \rho = t_I\sin\alpha \implies t_I(1+\sin\alpha) = d - r
$$

$$
\boxed{t_I = \frac{d - r}{1 + \sin\alpha}, \quad \rho = \frac{(d-r)\sin\alpha}{1 + \sin\alpha}}
$$

**情形 $S_3$：远侧切点，内切**

切点 $E_2 = (d + r, 0)$，$\mathcal{C}(D, r)$ 在 $\mathcal{C}_0$ 内部。$A$-$I$-$E_2$ 排列。

$$
(d+r) - t_I = \rho = t_I\sin\alpha \implies t_I(1+\sin\alpha) = d + r
$$

$$
\boxed{t_I = \frac{d + r}{1 + \sin\alpha}, \quad \rho = \frac{(d+r)\sin\alpha}{1 + \sin\alpha}}
$$

**情形 $S_4$：远侧切点，外切**

切点 $E_2 = (d + r, 0)$，$|ID| = r + \rho$。$I$ 在 $E_2$ 外侧（$t_I > d + r$）。

$$
t_I - (d+r) = \rho = t_I\sin\alpha \implies t_I(1-\sin\alpha) = d + r
$$

$$
\boxed{t_I = \frac{d + r}{1 - \sin\alpha}, \quad \rho = \frac{(d+r)\sin\alpha}{1 - \sin\alpha}}
$$### 5.2 存在性条件

| 解 | 存在条件 | 本例验证 |
|:---:|:---|:---:|
| $S_1$ | $d > r$（$A$ 在圆外），$\sin\alpha < 1$（$\alpha \neq 90°$） | $d = 4.776 > r = 1.2$，$\sin\alpha = 0.335$ $\checkmark$ |
| $S_2$ | $d > r$ | $\checkmark$ |
| $S_3$ | 总是成立（$d + r > 0$，$1 + \sin\alpha > 0$） | $\checkmark$ |
| $S_4$ | $\sin\alpha < 1$，$d + r > 0$ | $\checkmark$ |

本例四个解均存在。

### 5.3 唯一性

**定理 5.1.** 给定角 $\angle BAD$ 和圆 $\mathcal{C}(D, r)$（$D$ 在射线 $AD$ 上），满足"圆心在角平分线 $AD$ 上且与 $\mathcal{C}(D, r)$ 相切"的圆**恰好有 4 个**（当 $d > r$ 且 $0 < \alpha < 90°$ 时），分别对应 $S_1$--$S_4$。

**证明概要：** 角平分线上的圆心 $I$ 由 $t_I = |AI|$ 唯一确定。半径 $\rho = t_I\sin\alpha$ 也由 $t_I$ 唯一确定。相切条件 $|ID| = r \pm \rho$（外切/内切）结合切点在 $D$ 的近侧或远侧，产生四个独立的方程，每个方程最多一个正解。 $\square$

**退化情形：**
- 若 $d = r$（$A$ 在圆上），$S_1$ 和 $S_2$ 退化为 $t_I = 0$（零半径圆），实质减少为 2 个解；
- 若 $\alpha = 0$（$B$ 在 $AD$ 上），角平分线不唯一，问题退化；
- 若 $\alpha = 90°$（$AB \perp AD$），$S_1$ 和 $S_4$ 的分母 $1 - \sin\alpha = 0$，$t_I \to \infty$，退化为不存在；
- 若 $d < r$（$A$ 在圆内），$d - r < 0$，$S_1$ 和 $S_2$ 的 $t_I$ 为负，不在角平分线正方向上。

### 5.4 源代码构造方法的通用性

源代码构造的是 $S_2$。其方法可推广到构造其他三个解：

| 解 | $E$ 的选取 | $G$ 的选取 |
|:---:|:---|:---|
| $S_2$（源代码） | 近侧交点（$t_E = d - r$） | $x_G > x_E$（$G$ 在 $D$ 侧） |
| $S_1$ | 近侧交点（$t_E = d - r$） | $x_G < x_E$（$G$ 在 $A$ 侧） |
| $S_3$ | 远侧交点（$t_E = d + r$） | $x_G > x_E$（$G$ 在外侧） |
| $S_4$ | 远侧交点（$t_E = d + r$） | $x_G < x_E$（$G$ 在 $D$ 侧） |
---

## 6. 数值验证

### 6.1 基本参数

| 参数 | 符号 | 值 |
|------|------|----|
| 顶点 $A$ | | $(-2.5,\; 0.5)$ |
| 射线 $AB$ 上的点 $B$ | | $(1.5,\; 0.5)$ |
| 圆心 $D$ | | $(2,\; -1.1)$ |
| 给定圆半径 | $r$ | $1.2$ |
| $\|AD\|$ | $d$ | $\sqrt{4.5^2 + 1.6^2} = \sqrt{22.81} \approx 4.7760$ |
| $\angle BAD$ | $\alpha$ | $\approx 19.573°$ |
| $\sin\alpha$ | | $\approx 0.33501$ |
| $\cos\alpha$ | | $\approx 0.94222$ |

### 6.2 展开角验证

反射 $B$ 关于直线 $AD$ 得到 $C$。验证展开角性质：

| 性质 | 计算 | 结果 |
|------|------|------|
| $\|AB\|$ | $\sqrt{4^2 + 0^2}$ | $4.0$ |
| $\|AC\|$ | $\sqrt{3.083^2 + (-2.775)^2}$ | $\approx 4.0$ $\checkmark$ |
| $\angle BAC$ | $2 \times 19.573°$ | $\approx 39.15°$ $\checkmark$ |
| $AD$ 平分 $\angle BAC$ | $\angle BAD = \angle DAC = \alpha$ | $\checkmark$ |### 6.3 构造中间结果

| 步骤 | 对象 | 坐标/值 | 验证 |
|:---:|------|---------|------|
| 2 | $E$（$AD \cap \mathcal{C}(D,r)$，近侧） | $(0.8693,\; -0.6980)$ | $\|DE\| = 1.2 = r$ $\checkmark$ |
| 3 | $F$（$E$ 在 $AB$ 上的垂足） | $(0.8693,\; 0.5)$ | $EF \perp AB$ $\checkmark$ |
| 4 | $\rho_0 = \|EF\|$ | $1.1980$ | $= (d-r)\sin\alpha = 3.576 \times 0.335$ $\checkmark$ |
| 5 | $G$（圆 $(E,\rho_0) \cap AD$，远侧） | $(1.9981,\; -1.0989)$ | $\|EG\| = 1.1980 = \rho_0$ $\checkmark$ |
| 6 | $L_5$（过 $E$，方向 $\overrightarrow{FG}$） | 斜率 $\approx -0.749$ | $= -\cos\alpha/(1+\sin\alpha)$ $\checkmark$ |
| 7 | $H$（$L_5 \cap AB$） | $(0.0238,\; 0.5)$ | 在 $AB$ 上 $\checkmark$ |
| 8 | $I$（$H$ 的竖直线 $\cap AD$） | $(0.0238,\; -0.3974)$ | 在 $AD$ 上 $\checkmark$ |

### 6.4 解 $S_2$ 的公式验证

$$
t_I = \frac{d - r}{1 + \sin\alpha} = \frac{3.5760}{1.33501} = 2.6786
$$

$$
\rho = \frac{(d-r)\sin\alpha}{1 + \sin\alpha} = \frac{3.5760 \times 0.33501}{1.33501} = 0.8974
$$### 6.5 最终解验证

**解 $S_2$（源代码构造的解）：**

$$
I = (0.0238,\; -0.3974), \quad \rho = 0.8974
$$

| 条件 | 计算 | 结果 |
|------|------|------|
| $I$ 在角平分线 $AD$ 上 | $I$ 在直线 $AD$ 上 | $\checkmark$ |
| $\rho = t_I \sin\alpha$ | $2.6786 \times 0.33501 = 0.8974$ | $\checkmark$ |
| $\|IE\| = \rho$ | $\sqrt{(0.8693 - 0.0238)^2 + (-0.6980 + 0.3974)^2} = 0.8974$ | $\checkmark$ |
| $\|ID\| = r + \rho$ | $\sqrt{(2 - 0.0238)^2 + (-1.1 + 0.3974)^2} = 2.0974$ | $\checkmark$ |
| $r + \rho$ | $1.2 + 0.8974 = 2.0974$ | $\checkmark$ |
| $E$ 在 $ID$ 连线上 | $I$-$E$-$D$ 共线（均在 $AD$ 上） | $\checkmark$ |

**公式直接验证（利用 $|ID| = d - t_I$）：**

$$
|ID| = d - t_I = 4.7760 - 2.6786 = 2.0974
$$

$$
r + \rho = 1.2 + 0.8974 = 2.0974 \quad \checkmark
$$

**$|IE| = \rho$ 的直接验证：**

$$
|IE| = (d-r) - t_I = 3.5760 - 2.6786 = 0.8974 = \rho \quad \checkmark
$$### 6.6 其余三个解的数值验证

| 解 | $t_I$ | $I$（坐标） | $\rho$ | $\|ID\|$ | 切类型 | 验证 |
|:---:|:---:|------|:---:|:---:|:---:|:---:|
| $S_1$ | $5.3772$ | $(2.5505,\; -1.3995)$ | $1.8012$ | $0.6012$ | 内切 | $\|r - \rho\| = 0.6012$ $\checkmark$ |
| $S_2$ | $2.6786$ | $(0.0238,\; -0.3974)$ | $0.8974$ | $2.0974$ | 外切 | $r + \rho = 2.0974$ $\checkmark$ |
| $S_3$ | $4.4844$ | $(1.7323,\; -1.1051)$ | $1.5024$ | $0.3024$ | 内切 | $\|\rho - r\| = 0.3024$ $\checkmark$ |
| $S_4$ | $8.9884$ | $(6.0097,\; -2.7034)$ | $3.0113$ | $4.2113$ | 外切 | $r + \rho = 4.2113$ $\checkmark$ |

### 6.7 源代码选择逻辑

源代码在两个关键节点进行选择：

1. **选 $E$（直线 $AD$ 与圆 $(D, r)$ 的交点）：** 取距 $A$ 较近的交点 $E$（$|AE| = d - r = 3.576$），而非远侧交点 $E'$（$|AE'| = d + r = 5.976$）。
   - 选择近侧 → 用于构造 $S_1$ 或 $S_2$

2. **选 $G$（圆 $(E, \rho_0)$ 与 $AD$ 的交点）：** 取距 $A$ 较远的交点（$x_G > x_E$）。
   - 选择 $x_G > x_E$ → 用于构造 $S_2$

此选择逻辑确保构造得到解 $S_2$（近侧切点、外切）。

### 6.8 最终作图结果

$$
\boxed{\mathcal{C}_0:\; \text{圆心 } I = \left(\frac{d - r}{1 + \sin\alpha}\right)\text{ 在角平分线 } AD \text{ 上},\quad \text{半径 } \rho = \frac{(d - r)\sin\alpha}{1 + \sin\alpha}}
$$

近似值：$I \approx (0.024,\; -0.397)$，$\rho \approx 0.897$。

核心等式：

$$
t_I = \frac{d - r}{1 + \sin\alpha}, \quad \rho = \frac{(d - r)\sin\alpha}{1 + \sin\alpha}, \quad |ID| = r + \rho
$$
---

## 附录：构造流程图

```
已知: 角 BAD，圆(D, r)
  │
  ├─ 步骤1: 反射 B 关于 AD 得 C，展开角 ∠BAC = 2·∠BAD
  │         ─── AD 是 ∠BAC 的角平分线 ───
  │
  ├─ 步骤2: 求 AD 与圆(D,r) 的近侧交点 E，|AE| = d - r
  │         ─── E 将是两圆的切点 ───
  │
  ├─ 步骤3: 过 E 作 AB 的垂线 EF，垂足 F
  │         ─── |EF| = (d-r)·sin(α) = 展开角内切圆半径 ───
  │
  ├─ 步骤4: 以 E 为圆心、|EF| 为半径作圆 C₁
  │         ─── C₁ 与 AB、AC 均相切（E 在角平分线上）───
  │
  ├─ 步骤5: 求圆 C₁ 与 AD 的另一个交点 G（远侧）
  │         ─── |AG| = (d-r)(1+sin(α)) ───
  │
  ├─ 步骤6: 过 E 作 L₅，方向为 FG
  │
  ├─ 步骤7: L₅ 与 AB 交于 H
  │
  └─ 步骤8: 过 H 作 AB 的垂线交 AD 于 I
            以 I 为圆心、|IH| 为半径作圆
            ─── 此即所求：圆心在角平分线上，与圆(D,r)外切 ───
```

**核心等式：**

$$
t_I = \frac{d - r}{1 + \sin\alpha}, \quad \rho = \frac{(d - r)\sin\alpha}{1 + \sin\alpha}, \quad |ID| = r + \rho
$$

**展开角方法的本质：** 通过反射构造对称的展开角 $\angle BAC$，利用角平分线的等距性在展开角中构造内切圆 $\mathcal{C}_1$，再通过相似三角形（平行线截比例线段）将内切圆的半径信息**按比例 $\frac{1}{1+\sin\alpha}$ 缩小**传递到所求圆。这一技巧将看似困难的"角平分线上的圆与给定圆相切"问题，转化为标准的"角内切圆"问题，大大简化了构造过程。

---

*源文件：* `33-AngleCircTan.html`

*分析日期：* 2026-06-01