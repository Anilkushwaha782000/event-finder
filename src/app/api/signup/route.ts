import User from "@/app/models/userSchema";
import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from "@/app/lib/ConnectToDb";
import bcrypt from 'bcryptjs';
connectToDatabase()
interface UserData{
    name: string,
    email: string,
    password: string,
}
export async function POST(request: NextRequest) {
    try {
      await connectToDatabase();
      const data:UserData = await request.json();
      const hashedPassword = bcrypt.hashSync(data.password, 10);
      const newUser = new User({
        name: data.name,
        email: data.email,
        password: hashedPassword,
      });
  
     const user= await newUser.save();
     if(user){
        return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
     }
     else{
        return NextResponse.json({ message: 'There is an error while saving event' }, { status: 403 });
     }
    } catch (error:any) {
      return NextResponse.json({ message: 'Failed to save event '+error.message }, { status: 500 });
    }
  }