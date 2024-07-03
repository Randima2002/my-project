
// pages/api/users/index.js
import { NextResponse } from 'next/server';
// import prisma from '../../../lib/prisma';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req){
  try{
    const body = await req.json(); 
    console.log(body)
    const {  name , email, nic ,contact ,checking_date , checkout_date,adult ,child ,roomType  } = body;
    const newUser = await prisma.booking.create({
      data:{
        name,
        email, 
        nic ,
        contact ,
        checking_date,
        checkout_date,
        adult ,
        child ,
        room_type:roomType
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
    const users = await prisma.booking.findMany();
    return NextResponse.json(users);
  }
  catch(err){
    console.log("Error Getting user", error);
    return NextResponse.error("internal server Error", 500)
  }
}


