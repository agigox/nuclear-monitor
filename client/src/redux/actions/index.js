const INCREMENT = 'counter/increment';

function increment(amount) {
  return {
    type: INCREMENT,
    payload: amount,
  };
}

// eslint-disable-next-line no-unused-vars
const action = increment(3);
