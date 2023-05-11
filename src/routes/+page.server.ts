import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import prisma from "../lib/prisma";

export const actions = {
    register: async ({ cookies, request }) => {
        const data = await request.formData();
        const name = data.get('playerName');

        if (!name) {
            return fail(400, { name, missing: true });
        }

        if (typeof name != "string") {
            return fail(400, { incorrect: true })
        }

        await prisma.player.create({
            data: {
                 name,
            },
        });
        cookies.set('newPlayer', name)
        throw redirect(303, `/home`)
    },

    login: async ({ cookies, request }) => {
        const data = await request.formData();
        const name = data.get('playerName');

        if (!name) {
            return fail(400, { name, missing: true });
        }

        if (typeof name != "string") {
            return fail(400, { incorrect: true })
        }

        const returningUser = await prisma.player.findUnique({
            where: {
                 name,
            },
            select: { name: true, }
        });

        if (returningUser) {
            cookies.set('returningPlayer', returningUser.name)
        } else {
            return fail(400, {returningUser, missing : true})
        }
        
        throw redirect(303, `/home`)
    }
} satisfies Actions;