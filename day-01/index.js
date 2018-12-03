const firstAnswer = input => {
  return input.reduce((a, b) => {
    return a + b;
  });
};

const secondAnswer = input => {
  let frequencyStates = [0];
  let frequency = input[0];
  let index = 1;

  while (true) {
    frequency = frequency + input[index];

    if (frequencyStates.includes(frequency)) {
      return frequency;
      break;
    }

    frequencyStates.push(frequency);
    index++;

    if (index >= input.length) {
      index = 0;
    }
  }
};

const parser = input => {
  return input.split("\n").map(o => Number(o));
};

module.exports = {
  firstAnswer,
  secondAnswer,
  parser
};
