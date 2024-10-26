import connectToDatabase from "@/app/lib/ConnectToDb";
import User from "@/app/models/userSchema";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
connectToDatabase()
interface UserData {
    username: string;
    email:string;
    password: string;

  }
export async function POST(request: NextRequest) {
    try {
      await connectToDatabase();
      const session = await getServerSession(authOptions);
      if (!session) {
        return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
      }
      const userEmail=session.user.email;
      const data:UserData = await request.json();
      const userExist=await User.findOne({email:userEmail})
      if(!userExist){
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
      }
      if(userEmail!=data.email){
        return NextResponse.json({ message: 'Please provide the correct email' }, { status: 400 });
      }
      userExist.name = data.username;
     
      const updatedUser = await userExist.save(); 
     if(updatedUser){
        session.user.name = updatedUser.name;
        return NextResponse.json({ message: 'User updated successfully',updatedUser }, { status: 201 });
     }
     else{
        return NextResponse.json({ message: 'There is an error while updating user details' }, { status: 403 });
     }
    } catch (error:any) {
      return NextResponse.json({ message: 'Failed to update user '+error.message }, { status: 500 });
    }
  }