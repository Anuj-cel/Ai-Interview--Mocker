"use client"
import db from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import InterviewItemCard from './InterviewItemCard';
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

function InterviewList() {
    const user=useUser().user;
    console.log("This is user45465 ",user?.primaryEmailAddress?.emailAddress)
    const [interviewList,setInterviewList]=useState();
    const GetInterviewList=async()=>{
        const result=await db.select()
        .from(MockInterview)
        .where(eq(MockInterview.createdBy,user.primaryEmailAddress.emailAddress))
        .orderBy(desc(MockInterview.id));
        setInterviewList(result);
        console.log("Previous Mock ",result)
    }
    useEffect(()=>{
        user&&GetInterviewList();
    },[user])
    if(interviewList===undefined)return <p>Loading...</p>
  return (
    <div>
        {console.log("This is interviewList ",interviewList)}
        <h2 className='font-medium text-xl'>Previous Mock Interview</h2>
        <div className='grid gri  md:grid-cols-2 lg:grid-cols-3 gap-5 my-3'>
            {
                interviewList&&interviewList.map((interview,index)=>(
                    <InterviewItemCard interview={interview} key={index}/>
                ))
            }
        </div>
    </div>
  )
}

export default InterviewList