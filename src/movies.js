// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(arrayOfMovies) {
  const mappedArray = arrayOfMovies.map(function (movie) {
    return movie.director
  })
  return mappedArray
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(arrayOfMovies) {
  const spielbergMovies = arrayOfMovies.filter(
    (movie) =>
      movie.director === 'Steven Spielberg' && movie.genre.includes('Drama')
  )
  return spielbergMovies.length
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(arrayOfMovies) {
  if (arrayOfMovies.length == 0) {
    return 0
  }
  const moviesWithScores = arrayOfMovies.filter((movie) => movie.score)
  const sumOfScores = moviesWithScores.reduce(function (sum, movie) {
    return sum + movie.score
  }, 0)
  const averageScore =
    Math.round((sumOfScores / arrayOfMovies.length) * 100) / 100

  return averageScore
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(arrayOfMovies) {
  const dramaMovies = arrayOfMovies.filter((movie) =>
    movie.genre.includes('Drama')
  )
  return scoresAverage(dramaMovies)
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(arrayOfMovies) {
  const orderedArray = [...arrayOfMovies].sort(function (a, b) {
    if (a.year === b.year) {
      return a.title.localeCompare(b.title)
    }

    return a.year - b.year
  })
  return orderedArray
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(arrayOfMovies) {
  const titlesArray = arrayOfMovies.map(function (movie) {
    return movie.title
  })
  titlesArray.sort().splice(20)
  return titlesArray
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnStringToMinutes(durationAsAString) {
  let durationInMinutes = 0
  if (durationAsAString.includes('h') && durationAsAString.includes('m')) {
    durationInMinutes =
      60 * durationAsAString.split('h')[0] +
      1 * durationAsAString.split('h ')[1].split('m')[0]
  } else if (durationAsAString.includes('h')) {
    durationInMinutes = 60 * durationAsAString.split('h')[0]
  } else if (durationAsAString.includes('m')) {
    durationInMinutes = 1 * durationAsAString.split('m')[0]
  }
  return durationInMinutes
}

function turnHoursToMinutes(arrayOfMovies) {
  const arrayOfMoviesWithMinutes = arrayOfMovies.map(function (movie) {
    const movieWithMinutes = {
      title: movie.title,
      year: movie.year,
      director: movie.director,
      duration: turnStringToMinutes(movie.duration),
      genre: movie.genre,
      score: movie.score
    }
    return movieWithMinutes
  })
  return arrayOfMoviesWithMinutes
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(arrayOfMovies) {
  if (arrayOfMovies.length == 0) return null
  if (arrayOfMovies.length == 1)
    return `The best year was ${arrayOfMovies[0].year} with an average score of ${arrayOfMovies[0].score}`

  const scoresByYears = []
  const yearsWithAMovie = Array.from(
    new Set(arrayOfMovies.map((mv) => mv.year))
  )
  yearsWithAMovie.sort()

  for (let y of yearsWithAMovie) {
    const moviesOfTheYear = arrayOfMovies.filter(function (movieOfTheYear) {
      return movieOfTheYear.year == y
    })
    scoresByYears.push({
      year: y,
      averageScore: scoresAverage(moviesOfTheYear)
    })
  }

  scoresByYears.sort(function (a, b) {
    return b.averageScore - a.averageScore
  })

  return `The best year was ${scoresByYears[0].year} with an average score of ${scoresByYears[0].averageScore}`
}

// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    howManyMovies,
    scoresAverage,
    dramaMoviesScore,
    orderByYear,
    orderAlphabetically,
    turnHoursToMinutes,
    bestYearAvg
  }
}
