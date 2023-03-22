export const CRYPT_SEGMENTS = {
  HALL: [
    {
      description: 'Pequena sala com uma porta.',
      doors: 1,
      type: 'ROOM'
    },
    {
      description: 'Pequena sala com uma porta.',
      doors: 1,
      type: 'ROOM'
    },
    {
      description: 'Sala mediana com uma porta.',
      doors: 1,
      type: 'ROOM'
    },
    {
      description: 'Sala comprida com duas portas.',
      doors: 2,
      type: 'ROOM'
    },
    {
      description: 'Grande salão com duas portas.',
      doors: 2,
      type: 'ROOM'
    },
    {
      description: 'Escadaria com uma porta no fundo.',
      doors: 1,
      type: 'STAIRCASE'
    }
  ],
  ROOM: [
    {
      description: 'Pequena sala.',
      doors: 0,
      type: 'ROOM'
    },
    {
      description: 'Pequena sala.',
      doors: 0,
      type: 'ROOM'
    },
    {
      description: 'Sala mediana.',
      doors: 0,
      type: 'ROOM'
    },
    {
      description: 'Salão comprido.',
      doors: 0,
      type: 'ROOM'
    },
    {
      description: 'Grande salão com pilares.',
      doors: 0,
      type: 'ROOM'
    },
    {
      description: 'Escadaria com uma porta no fundo.',
      doors: 1,
      type: 'STAIRCASE'
    }
  ],
  STAIRCASE: [
    {
      description: 'Corredor com uma porta.',
      doors: 1,
      type: 'HALL'
    },
    {
      description: 'Corredor com duas portas.',
      doors: 2,
      type: 'HALL'
    },
    {
      description: 'Corredor com duas portas.',
      doors: 2,
      type: 'HALL'
    },
    {
      description: 'Corredor com duas portas.',
      doors: 2,
      type: 'HALL'
    },
    {
      description: 'Corredor com três portas.',
      doors: 3,
      type: 'HALL'
    },
    {
      description: 'Corredor com três portas.',
      doors: 3,
      type: 'HALL'
    }
  ],
  STARTING_SEGMENT: {
    description: 'Escadaria que leva para baixo. Ao final da escadaria há uma porta.',
    doors: 1,
    type: 'STAIRCASE'
  }
}
