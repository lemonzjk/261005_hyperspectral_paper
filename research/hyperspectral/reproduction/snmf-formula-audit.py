#!/usr/bin/env python3
"""Check two mathematical implications of the SNMF author manuscript.

These are independent scalar/matrix examples, not hyperspectral experiments
or a validation of the complete network's gradients or convergence.
"""

import json
from math import isclose


def activation(y, penalty, exponent):
    """Equation 23 on the positive branch, away from its threshold."""
    threshold = (2 * penalty * (1 - exponent)) ** (1 / (2 - exponent))
    threshold += penalty * exponent * (
        2 * penalty * (1 - exponent)
    ) ** ((exponent - 1) / (2 - exponent))
    return y - penalty * exponent * y ** (exponent - 1) if y > threshold else 0.0


def main():
    y, penalty, exponent, step = 0.4, 0.05, 0.5, 1e-6
    finite_difference = (
        activation(y + step, penalty, exponent)
        - activation(y - step, penalty, exponent)
    ) / (2 * step)
    derivative = 1 - penalty * exponent * (exponent - 1) * y ** (exponent - 2)
    if not isclose(finite_difference, derivative, rel_tol=1e-8, abs_tol=1e-8):
        raise RuntimeError("Finite difference does not match the analytic derivative")
    # In equation 37, W^T D = I_R fixes its squared Frobenius norm at R.
    # D=I_2 is a concrete feasible example. No solver is needed for this identity.
    product = [[1.0, 0.0], [0.0, 1.0]]
    objective = sum(value * value for row in product for value in row)
    print(json.dumps({
        "activationProbe": {
            "y": y, "lambda": penalty, "p": exponent, "step": step,
            "output": activation(y, penalty, exponent),
            "finiteDifference": finite_difference,
            "analyticDerivative": derivative,
            "equation29PrintedIndicator": 1,
            "boundary": "Positive active branch only; no threshold crossing, clipping, or normalization."
        },
        "equation37Probe": {
            "R": 2, "WTransposeD": product, "squaredFrobeniusObjective": objective,
            "boundary": "Full identity constraint fixes the objective at R whenever feasible; code instead constrains its diagonal."
        },
        "scope": "Independent mathematical probes, not algorithm reproduction or full gradient verification."
    }, indent=2))


if __name__ == "__main__":
    main()
