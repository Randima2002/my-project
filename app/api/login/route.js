
// pages/api/users/index.js
import { NextResponse } from 'next/server';
// import prisma from '../../../lib/prisma';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// export async function POST(req){
//   try{
//     const body = await req.body; 
//     console.log("Body is : "+body)
//     const { email } = body;
//     const newUser = await prisma.user.findFirst({
//         where: { email }
//     })

//     return NextResponse.json(newUser);
//   }catch(error){
//     console.log("Error fetching User: ", error);
//     return NextResponse.error("internal server Error", 500)
//   }
// }


export async function POST(request) {
  // console.log("request : " + request);
  try {
      // const id = parseInt(params.email);
      const data = await request.json();
      //   console.log(body)
      const { email } = data;
      // console.log("Email is : " + email);
      const LogedUser = await prisma.user.findFirst({
          where: { email },
      })
      return NextResponse.json(LogedUser);
  } catch (error) {
      console.log("Error Updating user : ", error);
      return NextResponse.error("internal server Error : ", 500)
  }
}