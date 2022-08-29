// import { Anime } from '../models/anime.js'
import fetch from "node-fetch"

function search(req, res) {
    const query = `
            query ($id: Int, $page: Int, $perPage: Int, $search: String) {
                Page (page: $page, perPage: $perPage) {
                    pageInfo {
                        total
                        currentPage
                        lastPage
                        hasNextPage
                        perPage
                    }
                media (id: $id, search: $search, isAdult: false) {
                    id
                    popularity
                    description
                    title {
                        english
                        romaji
                        native
                    }
                    coverImage {
                        extraLarge
                        large
                        medium
                        color
                    }
                    bannerImage
                }
            }
        }
    `
    fetch('https://graphql.anilist.co/', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json',
        },
        body: JSON.stringify({
            query,
            variables: {
                search: req.body.search,
                page: 1,
                perPage: 10
            }
        })
    }).then(res => {
        return res.json()
    }).then(data => {
        return data.data.Page.media
    }).then(anime => {
        return res.json(anime)
    })
}

export {
    search
}