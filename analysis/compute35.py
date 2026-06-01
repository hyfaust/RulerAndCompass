"""
Computation script for Construction 35: Circle in an Angle Tangent to a Given Circle
Default parameters: M(-0.7,0), N(2.7,0), P(1.8,-2.7), D(2,-0.5), r=0.8

Computes:
1. The expanded angle and offset angle
2. Intermediate construction points
3. Final circle center and radius
4. Tangency verification
"""

import math

# Default points
Mx, My = -0.7, 0.0
Nx, Ny = 2.7, 0.0
Px, Py = 1.8, -2.7
Dx, Dy = 2.0, -0.5
r = 0.8

print("=" * 60)
print("Construction 35: Circle in Angle Tangent to Given Circle")
print("=" * 60)

# --- Angle bisector of angle NMP ---
# Ray MN direction
mn_dx = Nx - Mx
mn_dy = Ny - My
mn_len = math.sqrt(mn_dx**2 + mn_dy**2)
mn_dx /= mn_len
mn_dy /= mn_len

# Ray MP direction
mp_dx = Px - Mx
mp_dy = Py - My
mp_len = math.sqrt(mp_dx**2 + mp_dy**2)
mp_dx /= mp_len
mp_dy /= mp_len

# Angle bisector direction (sum of unit vectors)
bis_dx = mn_dx + mp_dx
bis_dy = mn_dy + mp_dy
bis_len = math.sqrt(bis_dx**2 + bis_dy**2)
bis_dx /= bis_len
bis_dy /= bis_len

# Half-angle
cos_half = mn_dx * bis_dx + mn_dy * bis_dy
half_angle = math.acos(cos_half)
full_angle = 2 * half_angle

print(f"\nAngle NMP:")
print(f"  MN direction (unit): ({mn_dx:.6f}, {mn_dy:.6f})")
print(f"  MP direction (unit): ({mp_dx:.6f}, {mp_dy:.6f})")
print(f"  Bisector direction:  ({bis_dx:.6f}, {bis_dy:.6f})")
print(f"  Half-angle alpha = {math.degrees(half_angle):.4f} degrees")
print(f"  Full angle = {math.degrees(full_angle):.4f} degrees")

# --- Distance from M to L1 (ray MN) and L2 (ray MP) for a point on bisector ---
# For a point K = M + t * bisector:
#   d(K, MN) = t * sin(alpha)
#   d(K, MP) = t * sin(alpha)

sin_alpha = math.sin(half_angle)
print(f"\nsin(alpha) = {sin_alpha:.6f}")
print(f"cos(alpha) = {cos_half:.6f}")

# --- Tangency condition ---
# Circle centered at K with radius rho = t * sin(alpha)
# Tangent to circle (D, r):
#   External: |KD| = rho + r  =>  |KD| = t*sin(a) + r
#   Internal: |KD| = |rho - r|

# Let's compute |KD| as function of t
# K = (Mx + t*bis_dx, My + t*bis_dy)
# |KD|^2 = (Mx + t*bis_dx - Dx)^2 + (My + t*bis_dy - Dy)^2

dmx = Mx - Dx
dmy = My - Dy
print(f"\nVector M-D = ({dmx:.6f}, {dmy:.6f})")
print(f"|M-D| = {math.sqrt(dmx**2 + dmy**2):.6f}")

# |KD|^2 = (dmx + t*bis_dx)^2 + (dmy + t*bis_dy)^2
#        = dmx^2 + dmy^2 + 2t*(dmx*bis_dx + dmy*bis_dy) + t^2
# Let A = 1, B = 2*(dmx*bis_dx + dmy*bis_dy), C = dmx^2 + dmy^2

B_coeff = 2 * (dmx * bis_dx + dmy * bis_dy)
C_coeff = dmx**2 + dmy**2

print(f"\n|KD|^2 = t^2 + ({B_coeff:.6f})*t + ({C_coeff:.6f})")

# External tangency: |KD|^2 = (t*sin(a) + r)^2
# t^2 + B*t + C = t^2*sin^2(a) + 2*r*sin(a)*t + r^2
# t^2*(1 - sin^2(a)) + t*(B - 2*r*sin(a)) + (C - r^2) = 0
# t^2*cos^2(a) + t*(B - 2*r*sin(a)) + (C - r^2) = 0

a_q = cos_half**2
b_q = B_coeff - 2 * r * sin_alpha
c_q = C_coeff - r**2

print(f"\nQuadratic for external tangency:")
print(f"  {a_q:.6f}*t^2 + ({b_q:.6f})*t + ({c_q:.6f}) = 0")

disc = b_q**2 - 4 * a_q * c_q
print(f"  Discriminant = {disc:.6f}")

if disc >= 0:
    t1 = (-b_q + math.sqrt(disc)) / (2 * a_q)
    t2 = (-b_q - math.sqrt(disc)) / (2 * a_q)
    print(f"  t1 = {t1:.6f}")
    print(f"  t2 = {t2:.6f}")

    for idx, t in enumerate([t1, t2], 1):
        if t <= 0:
            print(f"  Solution {idx}: t={t:.6f} < 0, rejected")
            continue
        Kx = Mx + t * bis_dx
        Ky = My + t * bis_dy
        rho = t * sin_alpha
        dist_KD = math.sqrt((Kx - Dx)**2 + (Ky - Dy)**2)
        dist_MN = abs((Kx - Mx) * mn_dy - (Ky - My) * mn_dx)
        dist_MP = abs((Kx - Mx) * mp_dy - (Ky - My) * mp_dx)
        
        print(f"\n  Solution {idx}: t = {t:.6f}")
        print(f"    K = ({Kx:.6f}, {Ky:.6f})")
        print(f"    rho = {rho:.6f}")
        print(f"    |KD| = {dist_KD:.6f}")
        print(f"    rho + r = {rho + r:.6f}")
        print(f"    |KD| = rho + r? {abs(dist_KD - rho - r) < 1e-6}")
        print(f"    d(K, MN) = {dist_MN:.6f}")
        print(f"    d(K, MP) = {dist_MP:.6f}")
        print(f"    d(K, MN) = rho? {abs(dist_MN - rho) < 1e-6}")
        print(f"    d(K, MP) = rho? {abs(dist_MP - rho) < 1e-6}")
else:
    print("  No real solutions (discriminant < 0)")

# --- Reduction to Construction 34 ---
print("\n" + "=" * 60)
print("Reduction to Construction 34 (offset angle method)")
print("=" * 60)
print("\nThe construction transforms the problem into finding a circle")
print("tangent to the expanded angle and passing through a point,")
print("which is Construction 34.")

print("\nDone.")
