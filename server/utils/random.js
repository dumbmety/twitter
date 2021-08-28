function random(number, total) {
  const arr = []

  while (arr.length < number) {
    const r = Math.floor(Math.random() * total) + 1
    if (arr.indexOf(r) === -1) arr.push(r)
  }

  return arr
}

module.exports = random
