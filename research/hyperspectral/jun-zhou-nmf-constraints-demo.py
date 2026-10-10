#!/usr/bin/env python3
"""Illustrate two abundance-constraint facts; this is not an NMF reproduction.

The toy examples derive from the mathematical definitions discussed in
jun-zhou-lhalf-nmf-note.md. They do not report results on hyperspectral data.
"""

from math import sqrt


def abundance_penalties(abundances):
    """Return the L1 sum and the elementwise square-root sum for one pixel."""
    if any(value < 0 for value in abundances):
        raise ValueError("Abundances must be nonnegative")
    return sum(abundances), sum(sqrt(value) for value in abundances)


def soft_sum_solution(observation, signature, weight):
    """Minimize 0.5*(x-a*s)^2 + 0.5*delta^2*(s-1)^2 over s >= 0.

    This scalar example omits sparsity and fixes the signature. Its closed-form
    solution illustrates a finite quadratic penalty, not the paper's updates.
    """
    denominator = signature * signature + weight * weight
    if denominator == 0:
        raise ValueError("The scalar objective has no unique minimizer")
    return max(0.0, (signature * observation + weight * weight) / denominator)


def main():
    print("Toy example only; no paper algorithm or hyperspectral benchmark.")
    print("\nNonnegative abundances with exactly unit sum:")
    for abundances in [(0.5, 0.5), (1.0, 0.0)]:
        l1, square_root_sum = abundance_penalties(abundances)
        print(f"  S={abundances}: L1={l1:.6f}, square-root sum={square_root_sum:.6f}")

    observation, signature = 2.0, 1.0
    print("\nScalar quadratic penalty: observation=2, fixed signature=1.")
    print("  delta     optimum S     |S-1|       |X-A*S|")
    for weight in (0.0, 1.0, 10.0, 100.0):
        abundance = soft_sum_solution(observation, signature, weight)
        print(f"  {weight:5.1f}     {abundance:.6f}     "
              f"{abs(abundance - 1):.6f}     "
              f"{abs(observation - signature * abundance):.6f}")
    print("Finite weights leave a sum error in this example; a hard constraint sets S=1.")


if __name__ == "__main__":
    main()
