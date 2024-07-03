
// pages/api/users/index.js
import { NextResponse } from 'next/server';
// import prisma from '../../../lib/prisma';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req){
  try{
    const body = await req.json(); 
    console.log("body is : ",body)
    const {  name , email, nic ,contact ,isadmin , username, password } = body;
    const newUser = await prisma.user.create({
      data:{
        name,
        email, 
        nic ,
        contact ,
        isadmin,
        username, 
        password 
      }
    })
    
    return NextResponse.json(newUser);
  }catch(error){
    console.log("Error creating User: ", error);
    return NextResponse.error("internal server Error", 500)
  }
}

export async function GET(){
  try{
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  }
  catch(err){
    console.log("Error Getting user", err);
    return NextResponse.error("internal server Error", 500)
  }
}


