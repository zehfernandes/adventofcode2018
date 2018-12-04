const firstAnswer = input => {
  return 1;
};

const secondAnswer = input => {
  return 2;
};

const parser = input => {
  return input.slice(0, input.length - 1).map(o => {
    const match = /(#\d*)\s@\s(\d*),(\d*):\s(\d*)x(\d*)/g.exec(o);
    return {
      id: match[1],
      x: Number(match[2]),
      y: Number(match[3]),
      width: Number(match[4]),
      height: Number(match[5])
    };
  });
};

module.exports = {
  firstAnswer,
  secondAnswer,
  parser
};
