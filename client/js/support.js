export function isArrayOfObjects(array) {
    return array.every(item => typeof item === "object" && typeof item !== null)
}