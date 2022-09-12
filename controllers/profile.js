import { Profile } from '../models/profile.js'

function getProfile(req, res) {
    Profile.findById(req.params.id)
        .then(profile => {
            res.json(profile)
        })

}

export {
    getProfile
}