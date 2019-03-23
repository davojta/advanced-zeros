// https://www.geeksforgeeks.org/python-program-for-count-trailing-zeroes-in-factorial-of-a-number/
// naive for base 10
// naive for factor and prime numbers
// naive for table with prime numbers
// adopt to my script https://www.geeksforgeeks.org/number-of-trailing-zeroes-in-base-b-representation-of-n/
// 1 - 4 - 20 - 80 - 100
module.exports = function getZerosCount(number, base) {
  const simpleNumbers = [
    2,3,5,7,
    11,13,17,19,
    23,29,31,37,
    41,43,47,53,59,
    61,67,71,73,
    79,83,89,97,
    101,103,107,109,113,127,
    131,137,139, 149,151,157,
    163,167,173,179,181,191,193,197,199,
    211,223,227,229,233,239

  ];

  const getPrimeFactors = (base) => {
    return simpleNumbers.map((initialFactor) => {
      if (initialFactor > base) return {
        factor: initialFactor,
        count: 0,
        value: 0,
      }

      let count = 0;
      let factor = initialFactor;

      while((base % factor) === 0) {
        
        
        count += 1
        factor = factor * initialFactor;
        // console.log('iterate', base, factor, (base % factor));
      }

      return {
        factor: initialFactor,
        count,
        value: Math.pow(initialFactor, count),
      }
    })
    .filter(e => e.count > 0)
    .sort((a, b) => {
      return a.count < b.count;
    });
  };

  const getMostImportantFactor = (primeFactors) => {
    const max = Math.max(...primeFactors.map(e => e.value));
    const factor = primeFactors.find(e => max === e.value);

    return factor;
  };

  // To find the power of a prime p in 
// factorial N 
const findPowerOfP = (number, initialFactor) => { 
	let count = 0; 
  let factor = initialFactor; 


	while (factor <= number) { 

		// calculating floor(n/r) 
		// and adding to the count 
		count += Math.floor(number / factor); 

		// increasing the power of p 
		// from 1 to 2 to 3 and so on 
		factor = factor * initialFactor; 
  } 
  
	return count; 
} 

  const primeFactors = getPrimeFactors(base);
  // console.log('prime factors', primeFactors);
  if (primeFactors.length === 0) return 0;

  const mostImportantFactor = getMostImportantFactor(primeFactors);
  
  // console.log(
  //   'getPrimeFactors', 
  //   base, 
  //   primeFactors, 
  //   mostImportantFactor
  // );

  let initialFactor = primeFactors[0].factor;
  let factor = primeFactors[0].factor;
  let count = 0;

  const counts = primeFactors.map((primeFactor) => {
    const minimumPower = findPowerOfP(number, primeFactor.factor) / primeFactor.count;
    return Math.floor(minimumPower);
  })


  return Math.min(...counts);


  // your implementation
}