import CreatePlanForm from '@/components/ui/createplanForm'
import { Status } from '@prisma/client';
import { cookies } from 'next/headers'
import React from 'react'

interface Review {
  id: string;
  reviewer_id: string;
  reviewer_username: string;
  environment_impact: number | null;
  financial_impact: number | null;
  business_impact: number | null;
  workforce_or_society: number | null;
  resource_management: number | null;
  innovation_and_planning: number | null;
  justification: string | null;
  status: Status; // Assuming Status is defined as before
  planId: string;
  createdAt: Date; // This should be Date
}

export type PlanAction = {
  id: string;
  title: string;
  description: string;
  image: string;
  file: string;
  descision: 'VALIDATION_REQUIRED' | 'APPROVED' | 'REJECTED';
  userId: string;
  createdAt: string;
  reviews: Review[];
};

async function page() {
  const planActionValue = cookies().get('planAction')?.value
  let planAction: PlanAction | null = null;

  if (planActionValue) {
    planAction = JSON.parse(planActionValue);
  }

  return (
    <>
      <CreatePlanForm planAction={planAction} />
    </>
  )
}

export default page
