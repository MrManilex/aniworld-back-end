// import { Anime } from '../models/anime.js'
import fetch from "node-fetch"

function search(req, res) {
    const query = `
            query ($page: Int, $perPage: Int, $search: String) {
                Page (page: $page, perPage: $perPage) {
                    pageInfo {
                        total
                        currentPage
                        lastPage
                        hasNextPage
                        perPage
                    }
                media (type: ANIME, search: $search, isAdult: false) {
                    id
                    title {
                        english
                        romaji
                        native
                    }
                    popularity
                    description
                    episodes
                    status
                    startDate{
                        year
                        month
                        day
                    }
                    endDate{
                        year
                        month
                        day
                    }
                    trailer {
                        site
                        id
                    }
                    coverImage {
                        large
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
                perPage: 20
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

function searchTrending(req, res) {
    const query = `
        query ($page: Int, $perPage: Int) {
            Page (page: $page, perPage: $perPage) {
                pageInfo {
                    total
                    currentPage
                    lastPage
                    hasNextPage
                    perPage
                }
                media(sort: TRENDING_DESC){
                    id
                    title {
                        english
                        romaji
                        native
                    }
                    popularity
                    description
                    episodes
                    status
                    startDate{
                        year
                        month
                        day
                    }
                    endDate{
                        year
                        month
                        day
                    }
                    trailer {
                        site
                        id
                    }
                    coverImage {
                        large
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
                page: 1,
                perPage: 30
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
    search,
    searchTrending
}