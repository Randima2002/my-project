// pages/api/users/index.js
import { NextResponse } from 'next/server';
// import prisma from '../../../lib/prisma';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function DELETE(request, { params }) {
    try {
        const id = parseInt(params.id);
        const deleteUser = await prisma.user.delete({
            where: { id }
        })
        return NextResponse.json(deleteUser)
    } catch (error) {
        console.log("Error deleting user : ", error);
        return NextResponse.error("internal server Error : ", 500)
    }
}

export async function PUT(request, { params }) {
    console.log("here: ", params)
    try {
        const id = parseInt(params.id);
        const data = await request.json();
        //   console.log(body)
        const { name, email, nic, contact, isadmin,username, password  } = data;

        const UpdateUser = await prisma.user.update({ 
            where: { id },
            data: {
                name,
                email,
                nic,
                contact,
                isadmin ,
                username, 
                password 
            }
        })
        return NextResponse.json(UpdateUser);
    } catch (error) {
        console.log("Error Updating user : ", error);
        return NextResponse.error("internal server Error : ", 500)
    }
}