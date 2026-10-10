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
    abundance = [0.2, 0.8]
    version_regularization, version_step = 0.05, 1e-6

    def conference_penalty(values):
        return version_regularization * sum(math.sqrt(v) for v in values) ** 2

    def journal_penalty(values):
        return version_regularization * sum(math.sqrt(v) for v in values)

    root_sum = sum(math.sqrt(v) for v in abundance)
    version_checks = []
    for index, value in enumerate(abundance):
        plus, minus = abundance.copy(), abundance.copy()
        plus[index] += version_step
        minus[index] -= version_step
        conference_finite = (conference_penalty(plus) - conference_penalty(minus)) / (2 * version_step)
        journal_finite = (journal_penalty(plus) - journal_penalty(minus)) / (2 * version_step)
        conference_derived = version_regularization * root_sum / math.sqrt(value)
        journal_derived = version_regularization / (2 * math.sqrt(value))
        assert math.isclose(conference_finite, conference_derived, abs_tol=1e-8)
        assert math.isclose(journal_finite, journal_derived, abs_tol=1e-8)
        assert not math.isclose(conference_finite, journal_derived, abs_tol=1e-4)
        version_checks.append({
            'index': index, 'conferenceFiniteDifference': conference_finite,
            'conferenceDerivedGradient': conference_derived,
            'journalFiniteDifference': journal_finite,
            'journalDerivedGradientAndPrintedConferenceUpdate': journal_derived,
        })

    print(json.dumps({
        'equation26Checks': derivative_checks,
        'conferenceVsJournalPenaltyChecks': {
            'S': abundance, 'lambda': version_regularization, 'gradients': version_checks,
            'boundary': 'Compare printed definitions at positive entries; no implementation or performance inference.',
        },
        'fixedAConvexityCounterexample': {
            'A': 1.0, 'x': 1.0, 's': s, 'q': q,
            'lambda': regularization, 'finiteSecondDerivative': finite_second,
            'analyticSecondDerivative': analytic_second,
        },
        'boundary': 'Positive-domain calculus only; no implementation, convergence, or benchmark reproduction.',
    }, indent=2))


if __name__ == '__main__':
    main()
