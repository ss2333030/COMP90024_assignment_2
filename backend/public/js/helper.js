export function findArrayDifference(arr1, arr2) {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    return [...arr1.filter(item => !set2.has(item)), ...arr2.filter(item => !set1.has(item))];
  }
  
  // // Example usage:
  // const array1 = [1, 2, 3, 4, 5];
  // const array2 = [3, 4, 5, 6, 7];
  // const difference = findArrayDifference(array1, array2);
  // console.log(difference); // Output: [1, 2, 6, 7]
  