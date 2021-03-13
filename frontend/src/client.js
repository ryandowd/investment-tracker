import * as contentful from 'contentful';

export const client = contentful.createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESS_TOKEN
})

