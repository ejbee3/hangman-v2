import prisma from "$lib/prisma";
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
    // 1.
    default: async ({ request, cookies }) => {
        const data = await request.formData();

        let gamesWon = data.get("gamesWon");
        let lowestGuesses = data.get("lowestGuesses");
        let name = cookies.get('playerName');
       

        // 2.
        if (!gamesWon || !lowestGuesses) {
            return fail(400, { gamesWon, lowestGuesses, missing: true });
        }

        // 3.
        if (typeof gamesWon != "number" || typeof lowestGuesses != "number") {
            return fail(400, { incorrect: true })
        }

        // 4.
        await prisma.player.update({
            where: {
                name: name,
            },
            data: {
                gamesWon,
                lowestGuesses,
            },
        });

        //5.
        throw redirect(303, `/leaderboard`)
    }
} satisfies Actions;