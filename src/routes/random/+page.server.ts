import prisma from "$lib/prisma";
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
// @ts-ignore
import { UNSPLASH_ACCESS_KEY } from '$env/static/private';



export const actions = {
    // 1.
        rankings: async ({ request, cookies }) => {
        const data = await request.formData();

        let gamesWon = Number(data.get("gamesWon"));
        let lowestGuesses = Number(data.get("lowestGuesses"));
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
    },

    fetchImage: async ({ request }) => {
        const data = await request.formData();
        let searchTerm = data.get("word");
        await fetch(`https://api.unsplash.com/search/photos/?client_id=${UNSPLASH_ACCESS_KEY}&?query=${searchTerm}&per_page=5`)
    }
} satisfies Actions;