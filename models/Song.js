// Purpose: Define the schema for the song data and export it as a model. 
// This will allow us to interact with the song data in our Next.js API routes. 
// We will use this model to save song data to our MongoDB database.

import mongoose from "mongoose";

const { Schema } = mongoose;

const songSchema = new Schema(
    {
        id : String,
        name : String,
        artists : String,
        duration_ms : Number,
        release_date : String,
        year : Number,
        acousticness : Number,
        danceability : Number,
        energy : Number,
        instrumentalness : Number,
        liveness : Number,
        loudness : Number,
        speechiness : Number,
        tempo : Number,
        valence : Number,
        mode : Number,
        key : Number,
        popularity : Number,


    })

export default mongoose.models.Song || mongoose.model('Song', songSchema);
