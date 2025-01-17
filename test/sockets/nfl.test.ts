import { Sockets } from '../../src/sockets/index'

import { SbWebSocket } from '../../src/sockets/common'
import { NflSocket } from '../../src/sockets/nfl'
import { MockLnClient } from '../mock.ln.client'

const sockets: SbWebSocket[] = []
let nflSocket: NflSocket = null as any

describe('NBA API socket', async () => {
  it('should query the info endpoint', async () => {
    const info = await nflSocket.info()
    expect(info).toBeDefined()
  })

  it('should get players', async () => {
    const players = await nflSocket.players({ firstName: 'Colin', lastName: 'Kaepernick' })
    expect(players.length).toBeGreaterThan(0)
  })

  it('should get games', async () => {
    const games = await nflSocket.games({ seasonPhase: 'Regular', week: 8 })
    expect(games.length).toBeGreaterThan(0)
  })

  it('should get rosters', async () => {
    const rosters = await nflSocket.roster({ teamId: 'SF' })
    expect(rosters.length).toBeGreaterThan(0)
  })

  it('should get schedules', async () => {
    const schedules = await nflSocket.schedule({ teamId: 'WAS' })
    expect(schedules.length).toBeGreaterThan(0)
  })

  // TODO get all stats categories

  it('should get stats by name', async () => {
    const stats = await nflSocket.statsByNameAndWeek({
      statType: 'passing',
      lastName: 'Brees',
      firstName: 'Drew',
      seasonPhase: 'Regular',
      week: 1,
      year: 2017,
    })
    expect(stats.length).toBeGreaterThan(0)
  })

  it('should get stats by ID', async () => {
    const stats = await nflSocket.statsById({ gameId: '2016101604', playerId: '00-0027973', statType: 'passing' })
    expect(stats.length).toBeGreaterThan(0)
  })
})

afterAll(async () => {
  await Promise.all(sockets.map(socket => socket.close()))
})

beforeAll(async () => {
  nflSocket = await Sockets.nfl(MockLnClient)
  sockets.push(nflSocket)
})
