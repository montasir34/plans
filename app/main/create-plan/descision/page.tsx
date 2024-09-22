

import EvaluateForm from '@/components/ui/evaluateForm'
import { insure_user_authenticated } from '@/lib/helper'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import { PlanAction } from '../page'
import { Review, Status } from '@prisma/client'

type ReviewType = {
  environment_impact: number;
  financial_impact: number;
  business_impact: number;
  workforce_or_society: number;
  resource_management: number;
  innovation_and_planning: number;
};

export type AverageScores = {
  [key in keyof ReviewType]: string; // Ensure that AverageScores keys match ReviewType keys
};
async function page() {
  const user = await insure_user_authenticated()

  const cookieStore = cookies()
  const planCookie = cookieStore.get('plan')?.value
  const planAction = cookieStore.get('planAction')?.value as string

  if (user.role !== 'MANAGER' && !planCookie) {
    redirect('/main');
  }



  type StatusPercentage = {
    ACCEPTED: string;
    REJECTED: string;
    NEED_ENHANCEMENT: string;
  };

  function calculateStatusPercentage(reviews: Review[]): StatusPercentage {
    if (!reviews || reviews.length === 0) return {
      ACCEPTED: "0%",
      REJECTED: "0%",
      NEED_ENHANCEMENT: "0%"
    } as StatusPercentage;

    const statusCount: StatusPercentage = {
      ACCEPTED: "0",
      REJECTED: "0",
      NEED_ENHANCEMENT: "0"
    };

    reviews.forEach(review => {
      statusCount[review.status] = (parseInt(statusCount[review.status]) + 1).toString();
    });

    const totalReviews = reviews.length;
    const percentage: StatusPercentage = {
      ACCEPTED: "0%",
      REJECTED: "0%",
      NEED_ENHANCEMENT: "0%"
    };

    for (const key in statusCount) {
      percentage[key as keyof StatusPercentage] = ((parseInt(statusCount[key as keyof StatusPercentage]) / totalReviews) * 100).toFixed(2) + '%';
    }

    return percentage;
  }

  // // Example usage
  const reviews = JSON.parse(planAction) as PlanAction

  const percentage = calculateStatusPercentage(reviews.reviews)
  function getRange(status?: Status) {
    const statusLen = reviews.reviews.filter(it => it.status === status).length
    const len = reviews.reviews.length
    return {
      statusLen,
      len
    }
  }


  function calculateAverageReviews(reviews: Review[]): AverageScores | null {
    if (!reviews || reviews.length === 0) return null;

    const totalScores: ReviewType = {
      environment_impact: 0,
      financial_impact: 0,
      business_impact: 0,
      workforce_or_society: 0,
      resource_management: 0,
      innovation_and_planning: 0,
    };

    reviews.forEach((review) => {
      totalScores.environment_impact += review.environment_impact || 0;
      totalScores.financial_impact += review.financial_impact || 0;
      totalScores.business_impact += review.business_impact || 0;
      totalScores.workforce_or_society += review.workforce_or_society || 0;
      totalScores.resource_management += review.resource_management || 0;
      totalScores.innovation_and_planning += review.innovation_and_planning || 0;
    });

    const averageScores: AverageScores = {} as AverageScores;
    const reviewCount = reviews.length;

    // Use keyof ReviewType to ensure type safety with dynamic keys
    (Object.keys(totalScores) as (keyof ReviewType)[]).forEach((key) => {
      averageScores[key] = (totalScores[key] / reviewCount).toFixed(2);
    });

    return averageScores;
  }

  const average = calculateAverageReviews(reviews.reviews)

  return (
    <div>
      <h1 className='text-xl font-semibold text-[#CB8C06]'>Descision</h1>
      <EvaluateForm user={user} average={average} planAction={reviews} planIdAction={JSON.parse(planAction).id} variant='DESCISION' />
      {/* absolute */}
      <div className='absolute top-11 right-0 flex flex-col p-4 gap-3 text-xl w-1/3'>
        <div className='flex gap-3 text-gray-400 justify-between'>
          <h1>{getRange('ACCEPTED').statusLen} of {getRange().len}</h1>
          <h1 className='text-green-600'> Accepted</h1>
          <h1 className='text-green-600'>{percentage.ACCEPTED}</h1>
        </div>
        <div className='flex gap-3 text-gray-400 justify-between'>
          <h1>{getRange('NEED_ENHANCEMENT').statusLen} of {getRange().len}</h1>
          <h1 className='text-indigo-300'> Need enhancement</h1>
          <h1 className='text-indigo-300'>{percentage.NEED_ENHANCEMENT}</h1>
        </div>
        <div className='flex gap-3 text-gray-400 justify-between'>
          <h1>{getRange('REJECTED').statusLen} of {getRange().len}</h1>
          <h1 className='text-rose-300'> Rejected</h1>
          <h1 className='text-rose-300'> {percentage.REJECTED}</h1>
        </div>
      </div>
      <div className='absolute bottom-4 left-4'>
        <Link className='px-5 py-2 text-white bg-[#CB8C06] rounded hover:bg-[#976a08]' href='/main/create-plan/evaluation' >
          Back</Link>
      </div>

    </div>
  )
}

export default page
