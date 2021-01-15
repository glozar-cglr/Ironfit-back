const mongoose = require('mongoose');
const {Schema} = mongoose

const traineeSchema = new Schema (
    {
        _user: {
            //Esto es para decirle que insertará un id de un elemento de la base de datos
            type:Schema.Types.ObjectId,
            ref: "User",
            required: [true, "To register as trainer, we need a user"]
        },
        interest: {
            type: String,
            enum: ["American Football", "Athletics", "Archery", "Badminton", "Baseball", 
                    "Basketball", "Body Building", "Boxing", "Canoeing", "Cricket", "Cycling", "Equestrian", "Fencing",
                    "Football", "Golf", "Gymnastics", "Gym","Hockey", "Horse Racing", "Judo",
                    "Martial Arts", "Rugby", "Squash", "Swimming","Table TEnnis", "Taekwondo", "Tennis",
                    "Volleyball", "Yoga"]
            
        },
        description: String,
        weight: Number,
    }
)

module.exports = mongoose.model("Trainees", traineeSchema);

