const firstAnswer = input => {
	return 1
};

const secondAnswer = input => {
  return 2;
};

const parser = input => {
  return input.map(o => {
      if(o === "") return //FIX THIS FUCK YOU P5 CONVERT STRING
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
