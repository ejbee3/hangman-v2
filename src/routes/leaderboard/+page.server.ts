import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load = (async () => {
// 1.
const [response, playerCount] = await prisma.$transaction([prisma.player.findMany({
  where: { gamesWon: {
    gt: 1
  },
  },
}), prisma.player.count(),])


// 2.
return { list: {
  playerProfile: response,
  total: playerCount
}};
}) satisfies PageServerLoad;

