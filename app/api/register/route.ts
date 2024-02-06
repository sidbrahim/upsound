import User from '@/models/User';
import connect from '@/utils/db';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export const POST = async (request:any) => {
    const { email, password } = await request.json();
    
    await connect();

    const existingUser = await User.findOne({ email});

    if (existingUser) {
        return new NextResponse('Cet utilisateur existe déjà', { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    const newUser = new User({ email, password: hashedPassword });
    
    try {
        await newUser.save();
        return new NextResponse('Utilisateur créé', { status: 201 });
    } catch (error) {
        return new NextResponse('Erreur lors de la création de l\'utilisateur', { status: 500 });
    }
}