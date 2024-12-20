/**
 * Finds two values in the array M that sum up to N.
 * @param M
 * @param N
 * @returns A pair of values that sum up to N, or a string message if no such pair is found.
 */
var findSumValues = function (M, N) {
    var seenValues = new Set();
    for (var _i = 0, M_1 = M; _i < M_1.length; _i++) {
        var num = M_1[_i];
        var complement = N - num;
        if (seenValues.has(complement)) {
            return [complement, num];
        }
        seenValues.add(num);
    }
    return "No two values sum to N";
};
// const M = Array.from({ length: 1e5 }, () => Math.floor(Math.random() * 1e5));
// const N = 1e5;
var M = [2, 5, 8, 14, 0];
var N = 10;
var result = findSumValues(M, N);
console.log(result);
