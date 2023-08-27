const CustomPromise = require( "./CustomPromise").default;

const resolvedValue = "Resolved!"

const customPromise = new CustomPromise((resolve) => {
  setTimeout(() => resolve(resolvedValue), 100)
})

customPromise.then(console.log)