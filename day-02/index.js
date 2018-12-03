countLetters = id => {
  const arr = id.split("");
  const obj = {};
  arr.forEach(letter => {
    if (obj[letter]) {
      obj[letter] = obj[letter] + 1;
    } else {
      obj[letter] = 1;
    }
  });

  return obj;
};

const firstAnswer = input => {
  let arrID = input.map(id => {
    return countLetters(id);
  });

  let countTwo = arrID.reduce((a, b) => {
    if (Object.values(b).includes(2)) {
      return a + 1;
    } else {
      return a;
    }
  }, 0);

  let countThree = arrID.reduce((a, b) => {
    if (Object.values(b).includes(3)) {
      return a + 1;
    } else {
      return a;
    }
  }, 0);

  return countTwo * countThree;
};

const secondAnswer = input => {
  return 2;
};

const parser = input => {
  return input.split("\n");
};

module.exports = {
  firstAnswer,
  secondAnswer,
  countLetters,
  parser
};
