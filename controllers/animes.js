import { Anime } from '../models/anime.js'
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
                media (id: $id, search: $search) {
                    id
                    title {
                        english
                        romaji
                        native
                    }
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
                search: "Demon Slayer",
                page: 1,
                perPage: 10
            }
        })
    }).then(response => {
        return response.json()
    }).then(data => {
        console.log(data.data.Page.media)
    })

}

export {
    search
}