import { Anime } from '../models/anime.js'
import { Profile } from '../models/profile.js'
import { User } from '../models/user.js'
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
                        userPreferred
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
                media(type: ANIME, sort: TRENDING_DESC){
                    id
                    title {
                        english
                        romaji
                        native
                        userPreferred
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
                perPage: 6
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

function searchUpcoming(req, res) {
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
                media(seasonYear: 22, season:FALL, sort: POPULARITY_DESC){
                    id
                    title {
                        english
                        romaji
                        native
                        userPreferred
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
                perPage: 6
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

function searchATPopular(req, res) {
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
                media(sort: POPULARITY_DESC){
                    id
                    title {
                        english
                        romaji
                        native
                        userPreferred
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
                perPage: 6
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

function addToWatching(req, res) {
    Anime.findOne({ animeId: req.params.id })
        // find user profile
        .then(anime => {
            User.findById(req.user)
                .then(user => {
                    Profile.findById(user.profile)
                        .then(profile => {
                            if (anime) {
                                console.log(profile, anime)
                                //find anime
                                anime.currentlyWatching.push(user.profile)
                                anime.save()
                                res.json(anime)
                                //populated addToWatching using user's _id from mongo
                            } else {
                                // find one anime
                                Anime.create(req.body)
                                    .then(anime => {
                                        anime.currentlyWatching.push(user.profile)
                                        anime.save()
                                        res.json(anime)
                                    })
                            }
                        })
                })
        })
}

function getAnime(req, res) {
    const query = `
        query($id: Int) {
            Media(id: $id) {
                title {
                    english
                    romaji
                    native
                    userPreferred
                }
                popularity
                description
                episodes
                status
                startDate {
                    year
                    month
                    day
                }
                endDate {
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
                id: parseInt(req.params.id)
            }
        })
    }).then(res => res.json())
        .then(anime => res.json(anime.data.Media))
        .catch(error => console.log(error))
}

export {
    search,
    searchTrending,
    searchUpcoming,
    searchATPopular,
    addToWatching,
    getAnime
}