const mongoose = require('mongoose');
const {Schema} = mongoose;
const countryList = require('country-list')


const trainerSchema = new Schema (
    {
        _user: {
            //Esto es para decirle que insertará un id de un elemento de la base de datos
            type:Schema.Types.ObjectId,
            ref: "User",
            required: [true, "To register as trainer, we need a user"]
        },
        sport: [{
            type: String,
            enum: ["American Football", "Athletics", "Archery", "Badminton", "Baseball", 
                    "Basketball", "Body Building", "Boxing", "Canoeing", "Cricket", "Cycling", "Equestrian", "Fencing",
                    "Football", "Golf", "Gymnastics", "Gym","Hockey", "Horse Racing", "Judo",
                    "Martial Arts", "Rugby", "Squash", "Swimming","Table Tennis", "Taekwondo", "Tennis",
                    "Volleyball", "Yoga"]
        }],
        trainer_type: {
            type:String,
            required: [true, "You must specify the experience level as a teacher"],
            enum: ["Professional Trainer", "Experienced Athlete"]
        },
        video: String,
        description: String,
        curriculum: {
            url: {
                type:String,
                default: "https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-12.jpg"
            },
            public_id: {
                type:String,
                default: "Default"
            }
        },
        country: {
            type:String,
            required: [true, "You must provide your location"],
            enum: countryList.getNames()
        },
        city: {
            type:String,
            required: "You must provide your location",
        },
        methodology: {
            online: Boolean,
            live: Boolean
        },
        birthday: String,
        description: String,
        lessons: [String],
        students:[String],
        rank:[Number],
        img:String


    }
)


module.exports = mongoose.model("Trainer", trainerSchema);