const mongoose = require('mongoose');
const {Schema} = mongoose

const traineeSchema = new Schema (
    {
        interest: {
            enum: ["American Football", "Athletics", "Archery", "Badminton", "Baseball", 
                    "Basketball", "Body Building", "Boxing", "Canoeing", "Cricket", "Cycling", "Equestrian", "Fencing",
                    "Football", "Golf", "Gymnastics", "Gym","Hockey", "Horse Racing", "Judo",
                    "Martial Arts", "Rugby", "Squash", "Swimming","Table TEnnis", "Taekwondo", "Tennis",
                    "Volleyball", "Yoga"]
            
        },
        trainer_type: {
            required: [true, "You must specify the experience level as a teacher"],
            enum: ["Professional Trainer", "Experienced Athlete"]
        },
        description: String,
        weight: Number,
        



    }
)

