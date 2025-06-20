// Financial Calculations and Utilities

/**
 * Black-Scholes Option Pricing Model
 */
export function blackScholes(
  S: number, // Current stock price
  K: number, // Strike price
  T: number, // Time to expiry (in years)
  r: number, // Risk-free rate
  sigma: number, // Volatility
  type: "call" | "put" = "call",
): number {
  const d1 =
    (Math.log(S / K) + (r + 0.5 * sigma ** 2) * T) / (sigma * Math.sqrt(T));
  const d2 = d1 - sigma * Math.sqrt(T);

  const cdf = (x: number) => 0.5 * (1 + erf(x / Math.sqrt(2)));

  if (type === "call") {
    return S * cdf(d1) - K * Math.exp(-r * T) * cdf(d2);
  } else {
    return K * Math.exp(-r * T) * cdf(-d2) - S * cdf(-d1);
  }
}

/**
 * Error function approximation
 */
function erf(x: number): number {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const sign = x >= 0 ? 1 : -1;
  x = Math.abs(x);

  const t = 1.0 / (1.0 + p * x);
  const y =
    1.0 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

  return sign * y;
}

/**
 * Calculate option Greeks
 */
export function calculateGreeks(
  S: number,
  K: number,
  T: number,
  r: number,
  sigma: number,
  type: "call" | "put" = "call",
) {
  const d1 =
    (Math.log(S / K) + (r + 0.5 * sigma ** 2) * T) / (sigma * Math.sqrt(T));
  const d2 = d1 - sigma * Math.sqrt(T);

  const cdf = (x: number) => 0.5 * (1 + erf(x / Math.sqrt(2)));
  const pdf = (x: number) => Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);

  // Delta
  const delta = type === "call" ? cdf(d1) : cdf(d1) - 1;

  // Gamma
  const gamma = pdf(d1) / (S * sigma * Math.sqrt(T));

  // Theta
  const theta =
    type === "call"
      ? -(S * pdf(d1) * sigma) / (2 * Math.sqrt(T)) -
        r * K * Math.exp(-r * T) * cdf(d2)
      : -(S * pdf(d1) * sigma) / (2 * Math.sqrt(T)) +
        r * K * Math.exp(-r * T) * cdf(-d2);

  // Vega
  const vega = S * pdf(d1) * Math.sqrt(T);

  // Rho
  const rho =
    type === "call"
      ? K * T * Math.exp(-r * T) * cdf(d2)
      : -K * T * Math.exp(-r * T) * cdf(-d2);

  return { delta, gamma, theta: theta / 365, vega: vega / 100, rho: rho / 100 };
}

/**
 * Calculate implied volatility using Newton-Raphson method
 */
export function impliedVolatility(
  marketPrice: number,
  S: number,
  K: number,
  T: number,
  r: number,
  type: "call" | "put" = "call",
  tolerance: number = 1e-6,
  maxIterations: number = 100,
): number {
  let sigma = 0.2; // Initial guess

  for (let i = 0; i < maxIterations; i++) {
    const price = blackScholes(S, K, T, r, sigma, type);
    const vega = calculateGreeks(S, K, T, r, sigma, type).vega;

    const diff = price - marketPrice;

    if (Math.abs(diff) < tolerance) {
      return sigma;
    }

    if (vega === 0) break;

    sigma = sigma - diff / (vega * 100); // vega is scaled by 100

    if (sigma <= 0) sigma = 0.001;
  }

  return sigma;
}

/**
 * Calculate correlation between two price series
 */
export function correlation(series1: number[], series2: number[]): number {
  if (series1.length !== series2.length || series1.length === 0) {
    throw new Error("Series must have equal length and not be empty");
  }

  const n = series1.length;
  const mean1 = series1.reduce((sum, val) => sum + val, 0) / n;
  const mean2 = series2.reduce((sum, val) => sum + val, 0) / n;

  let numerator = 0;
  let sum1Sq = 0;
  let sum2Sq = 0;

  for (let i = 0; i < n; i++) {
    const diff1 = series1[i] - mean1;
    const diff2 = series2[i] - mean2;

    numerator += diff1 * diff2;
    sum1Sq += diff1 * diff1;
    sum2Sq += diff2 * diff2;
  }

  const denominator = Math.sqrt(sum1Sq * sum2Sq);

  return denominator === 0 ? 0 : numerator / denominator;
}

/**
 * Calculate moving average
 */
export function movingAverage(data: number[], window: number): number[] {
  if (window <= 0 || window > data.length) {
    throw new Error("Invalid window size");
  }

  const result: number[] = [];

  for (let i = window - 1; i < data.length; i++) {
    const sum = data
      .slice(i - window + 1, i + 1)
      .reduce((acc, val) => acc + val, 0);
    result.push(sum / window);
  }

  return result;
}

/**
 * Calculate standard deviation
 */
export function standardDeviation(data: number[]): number {
  if (data.length === 0) return 0;

  const mean = data.reduce((sum, val) => sum + val, 0) / data.length;
  const variance =
    data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / data.length;

  return Math.sqrt(variance);
}

/**
 * Calculate Z-score for correlation deviation
 */
export function zScore(value: number, mean: number, stdDev: number): number {
  return stdDev === 0 ? 0 : (value - mean) / stdDev;
}

/**
 * Calculate option strategy payoffs
 */
export function strategyPayoff(
  legs: Array<{
    type: "call" | "put" | "stock";
    action: "buy" | "sell";
    strike?: number;
    quantity: number;
    premium: number;
  }>,
  spotPrices: number[],
): number[] {
  return spotPrices.map((spot) => {
    return legs.reduce((totalPayoff, leg) => {
      let legPayoff = 0;
      const multiplier = leg.action === "buy" ? 1 : -1;
      const netPremium = leg.action === "buy" ? -leg.premium : leg.premium;

      if (leg.type === "stock") {
        legPayoff =
          spot * multiplier * leg.quantity + netPremium * leg.quantity;
      } else if (leg.type === "call" && leg.strike) {
        const intrinsic = Math.max(0, spot - leg.strike);
        legPayoff = (intrinsic * multiplier + netPremium) * leg.quantity;
      } else if (leg.type === "put" && leg.strike) {
        const intrinsic = Math.max(0, leg.strike - spot);
        legPayoff = (intrinsic * multiplier + netPremium) * leg.quantity;
      }

      return totalPayoff + legPayoff;
    }, 0);
  });
}

/**
 * Calculate put-call ratio
 */
export function putCallRatio(putVolume: number, callVolume: number): number {
  return callVolume === 0 ? 0 : putVolume / callVolume;
}

/**
 * Calculate option's moneyness
 */
export function moneyness(
  spot: number,
  strike: number,
  type: "call" | "put",
): string {
  const ratio = spot / strike;

  if (type === "call") {
    if (ratio > 1.02) return "ITM";
    if (ratio < 0.98) return "OTM";
    return "ATM";
  } else {
    if (ratio < 0.98) return "ITM";
    if (ratio > 1.02) return "OTM";
    return "ATM";
  }
}

/**
 * Calculate annualized volatility from returns
 */
export function historicalVolatility(
  prices: number[],
  tradingDays: number = 252,
): number {
  if (prices.length < 2) return 0;

  const returns: number[] = [];
  for (let i = 1; i < prices.length; i++) {
    returns.push(Math.log(prices[i] / prices[i - 1]));
  }

  const avgReturn = returns.reduce((sum, ret) => sum + ret, 0) / returns.length;
  const variance =
    returns.reduce((sum, ret) => sum + Math.pow(ret - avgReturn, 2), 0) /
    (returns.length - 1);

  return Math.sqrt(variance * tradingDays);
}
