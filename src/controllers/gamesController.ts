import { Request, Response, NextFunction } from 'express'
import { HttpError } from '@/middleware/error'
import { ControllerRequest } from './types'
import Game from '@/models/gameModel'

let games = [
  {
    id: 1,
    name: 'Prince of Persia: The Lost Crown',
    description:
      'Dash into a stylish and thrilling action-adventure platformer game set in a mythological Persian world where the boundaries of time and space are yours to manipulate. Use your Time Powers, combat and platforming skills to perform deadly combos and defeat time-corrupted enemies and mythological creatures. Acquire and equip new Amulets at shopkeepers to play as you see fit. Discover a cursed Persian-inspired world filled with bigger-than-life landmarks. Explore a variety of highly detailed biomes, each with its own identity, wonders and dangers. Use your wits to solve puzzles, find hidden treasures and complete quests to learn more about this corrupted place. Immerse yourself into a Persian mythological fantasy through an intriguing and original story. Cross paths with colorful characters to better unravel the mysteries of Mount Qaf. Enjoy high quality graphics, immersive cinematics and fresh Artistic Direction, along with a unique gameplay fluidity thanks to 60 fps rate on all platforms.',
    bannerImageUrl:
      'https://raw.githubusercontent.com/Wtheodoro/play-vuerdict/main/src/assets/images/princeOfPersiaBanner.png',
    cardImageUrl:
      'https://raw.githubusercontent.com/Wtheodoro/play-vuerdict/main/src/assets/images/princeOfPersia.avif',
    releaseDate: '2024-06-01',
    developer: 'Ubisoft',
    publisher: 'Ubisoft',
    genre: ['Action', 'Adventure', 'Platformer'],
    platforms: ['PlayStation 5', 'Xbox Series X', 'PC'],
    rating: 4.5,
    slug: 'prince-of-persia-the-lost-crown',
  },
  {
    id: 2,
    name: 'The Legend of Zelda: Breath of the Wild',
    description:
      'The Legend of Zelda: Breath of the Wild is an action-adventure game developed and published by Nintendo for the Nintendo Switch and Wii U consoles.',
    bannerImageUrl: 'https://example.com/zelda_breath_of_the_wild_banner.png',
    cardImageUrl: 'https://example.com/zelda_breath_of_the_wild_card.png',
    releaseDate: '2017-03-03',
    developer: 'Nintendo',
    publisher: 'Nintendo',
    genre: ['Action', 'Adventure'],
    platforms: ['Nintendo Switch', 'Wii U'],
    rating: 4.9,
    slug: 'the-legend-of-zelda-breath-of-the-wild',
  },
  {
    id: 3,
    name: 'Final Fantasy Rebirth',
    description:
      'Final Fantasy Rebirth is an upcoming role-playing video game developed and published by Square Enix for multiple platforms. Set in a fantastical world filled with magic and technology, embark on an epic journey to save the realm from darkness. With stunning visuals, a captivating storyline, and immersive gameplay, Final Fantasy Rebirth promises to redefine the RPG genre.',
    bannerImageUrl: 'https://example.com/final_fantasy_rebirth_banner.png',
    cardImageUrl: 'https://example.com/final_fantasy_rebirth_card.png',
    releaseDate: '2024-12-31',
    developer: 'Square Enix',
    publisher: 'Square Enix',
    genre: ['Role-Playing'],
    platforms: ['PlayStation 5', 'Xbox Series X', 'PC'],
    rating: 4.9,
    slug: 'final-fantasy-rebirth',
  },
  {
    id: 4,
    name: 'Spider-Man 2',
    description:
      'Spider-Man 2 is an action-adventure game developed by Insomniac Games and published by Sony Interactive Entertainment. Swing through the bustling streets of New York City as the iconic superhero Spider-Man. With enhanced graphics, fluid web-swinging mechanics, and thrilling combat, Spider-Man 2 delivers an immersive experience that will make you feel like a true superhero.',
    bannerImageUrl: 'https://example.com/spiderman_2_banner.png',
    cardImageUrl: 'https://example.com/spiderman_2_card.png',
    releaseDate: '2023-09-30',
    developer: 'Insomniac Games',
    publisher: 'Sony Interactive Entertainment',
    genre: ['Action', 'Adventure'],
    platforms: ['PlayStation 5'],
    rating: 4.8,
    slug: 'spider-man-2',
  },
]

// @desc Get all games
// @route GET /api/games
const getGames = async (
  request: ControllerRequest<{ limit: string }>,
  response: Response
) => {
  const limit = parseInt(request.query.limit)

  try {
    const allGames = await Game.find().limit(limit || 100)

    return response.status(200).json(allGames)
  } catch (error) {
    return response
      .status(500)
      .json({ message: 'Failed to get all game', error })
  }
}

// @desc Get one game by id
// @route GET /api/games/:id
const getGame = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const requestGameId = request.params.id

  try {
    const currentGame = await Game.findById(requestGameId)

    return response.status(200).json(currentGame)
  } catch (error) {
    response.status(500).json({ message: 'Failed to get game', error })
    return next(error)
  }
}

// @desc Create one game
// @route POST /api/games/internal
const createGame = async (request: Request, response: Response) => {
  const {
    name,
    description,
    bannerImageUrl,
    cardImageUrl,
    releaseDate,
    developer,
    publisher,
    genre,
    platforms,
    rating,
    slug,
  } = request.body

  if (
    !name ||
    !description ||
    !bannerImageUrl ||
    !cardImageUrl ||
    !releaseDate ||
    !developer ||
    !publisher ||
    !genre ||
    !platforms ||
    !rating ||
    !slug
  ) {
    return response.status(400).json({ message: 'All fields are required' })
  }

  const newGame = new Game({
    name,
    description,
    bannerImageUrl,
    cardImageUrl,
    releaseDate,
    developer,
    publisher,
    genre,
    platforms,
    rating,
    slug,
  })

  try {
    const savedGame = await newGame.save()

    return response.status(201).json(savedGame)
  } catch (error) {
    console.error('Error creating game:', error)
    return response
      .status(500)
      .json({ message: 'Failed to create game', error })
  }
}

const GamesController = {
  getGame,
  getGames,
  createGame,
}

export default GamesController
