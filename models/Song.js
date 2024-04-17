// Purpose: Define the schema for the song data and export it as a model. 
// This will allow us to interact with the song data in our Next.js API routes. 
// We will use this model to save song data to our MongoDB database.

import mongoose from "mongoose";

const { Schema } = mongoose;

const songSchema = new Schema(
    {
        valence : Number,
        year : Number,
        acousticness : Number,
        artists : String,
        danceability : Number,
        duration_ms : Number,
        energy : Number,
        explicit : Number,
        id : String,
        instrumentalness : Number,
        key : Number,
        liveness : Number,
        loudness : Number,
        mode : Number,
        name : String,
        popularity : Number,
        release_date : String,
        speechiness : Number,
        tempo : Number,


        


    })

export default mongoose.models.Song || mongoose.model('Song', songSchema);
