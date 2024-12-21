"use strict";
/**
 * Finds two values in the array M that sum up to N.
 * @param M
 * @param N
 * @returns A pair of values that sum up to N, or a string message if no such pair is found.
 */
const findSumValues = (M, N) => {
    const seenValues = new Set();
    for (const num of M) {
        const complement = N - num;
        if (seenValues.has(complement)) {
            return [complement, num];
        }
        seenValues.add(num);
    }
    return "No two values sum to N";
};
/**
 ************ Function Test ************
 */
const M = Array.from({ length: 1e5 }, () => Math.floor(Math.random() * 1e5));
const N = 1e5;
// const M = [2, 5, 8, 14, 0];
// const N = 10;
const result = findSumValues(M, N);
console.log(result);
