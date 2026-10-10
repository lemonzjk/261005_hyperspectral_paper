"""Independent calculus checks for the April 11, 2011 L1/2-NMF draft.

This checks the printed objective, not the paper's implementation or performance.
Run from the repository root with Python 3; no external packages are required.
"""
import json
import math


def objective(s, q, regularization):
    return 0.5 * (1.0 - s) ** 2 + regularization * s ** q


def main():
    s, regularization, step = 0.4, 0.05, 1e-6
    derivative_checks = []
    for q in (0.25, 0.5, 0.75):
        finite_difference = (
            objective(s + step, q, regularization)
            - objective(s - step, q, regularization)
        ) / (2 * step)
        derived = s - 1.0 + regularization * q * s ** (q - 1)
        printed = s - 1.0 + regularization / 2 * s ** (q - 1)
        assert math.isclose(finite_difference, derived, abs_tol=1e-8)
        if q == 0.5:
            assert math.isclose(printed, derived, abs_tol=1e-12)
        else:
            assert not math.isclose(printed, derived, abs_tol=1e-4)
        derivative_checks.append({
            'q': q, 's': s, 'lambda': regularization,
            'finiteDifference': finite_difference,
            'derivedGradient': derived,
            'gradientWithPrintedEquation26Coefficient': printed,
        })

    s, q, regularization, step = 0.01, 0.5, 0.1, 1e-5
    finite_second = (
        objective(s + step, q, regularization)
        - 2 * objective(s, q, regularization)
        + objective(s - step, q, regularization)
    ) / step ** 2
    analytic_second = 1.0 + regularization * q * (q - 1) * s ** (q - 2)
    assert math.isclose(finite_second, analytic_second, abs_tol=1e-4)
    assert finite_second < 0
    print(json.dumps({
        'equation26Checks': derivative_checks,
        'fixedAConvexityCounterexample': {
            'A': 1.0, 'x': 1.0, 's': s, 'q': q,
            'lambda': regularization, 'finiteSecondDerivative': finite_second,
            'analyticSecondDerivative': analytic_second,
        },
        'boundary': 'Scalar positive-domain calculus only; no implementation, convergence, or benchmark reproduction.',
    }, indent=2))


if __name__ == '__main__':
    main()
