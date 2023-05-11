import prisma from "$lib/prisma";
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
// @ts-ignore
import { UNSPLASH_ACCESS_KEY } from '$env/static/private';



export const actions = {
    // 1.
        rankings: async ({ request, cookies }) => {
        const data = await request.formData();

        let gamesWon = Number(data.get("gamesWon"));
        let lowestGuesses = Number(data.get("lowestGuesses"));
        let name = cookies.get('newPlayer') || cookies.get('returningPlayer');
       

        // 2.
        if (!gamesWon || !lowestGuesses || !name) {
            return fail(400, { gamesWon, lowestGuesses, name, missing: true });
        }

        // 3.
        if (typeof gamesWon != "number" || typeof lowestGuesses != "number" || typeof name != "string") {
            return fail(400, { incorrect: true })
        }

        // 4.
        await prisma.player.upsert({
            where: {
                name: name,
            },
            update: {
                    gamesWon,
                    lowestGuesses,
                },

            create: {
                    name,
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


export const load = (async ({ cookies }) => {
    if (cookies.get('returningPlayer')) {
        const name = cookies.get('returningPlayer')
        const response = await prisma.player.findUnique({
            where: { name },
      })
      return {
        player: response,
      }  
    };
}) satisfies PageServerLoad;