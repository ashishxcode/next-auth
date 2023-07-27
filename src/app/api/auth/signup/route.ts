import {connect} from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

connect();

export  async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const {name,username, email, password} = body;

        console.log(body);

        // check if user already exists

        const user = await User.findOne({email});

        if(user) {
            return NextResponse.json({status: 400, message: 'User already exists'})
        }

        // hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // create user
        const newUser = new User({
            name,
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();

        return NextResponse.json({
                status: 201, message: 'User created successfully', 
                data: savedUser
         })

    } catch (err: any) {
        return NextResponse.json({status:500 , message: err.message})
    }
}





