const PromiseStates = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
}

class CustomPromise {
  constructor(executor) {
    this.PromiseState = PromiseStates.PENDING;
    this.PromiseResult = null;
    this.PromiseFulfillReactions = [];
    
    executor(this.resolve.bind(this));
  }
  
  resolve(result) {
    if (this.PromiseState === PromiseStates.PENDING) {
      this.PromiseState = PromiseStates.FULFILLED;
      this.PromiseResult = result;
      this.PromiseFulfillReactions.forEach((onFulfilledReaction) => onFulfilledReaction(result));
    }
  }
  
  then(onFulfilled) {
    return new CustomPromise((resolve) => {
      const onFulfilledReaction = (result) => {
        resolve(onFulfilled(result))
      }
      
      if (this.PromiseState === PromiseStates.PENDING) {
        this.PromiseFulfillReactions.push(onFulfilledReaction)
      }
      
      if (this.PromiseState === PromiseStates.FULFILLED) {
        resolve(onFulfilled(this.PromiseResult));
      }
    })
  }
}

exports.default = CustomPromise;