"use client";

import React, { use } from "react";
import EngineerDetail from "@/components/EngineerDetail";

interface EngineerPageProps {
  params: Promise<{
    engineerId: string;
  }>;
}

const EngineerPage = ({ params }: EngineerPageProps) => {
  const resolvedParams = use(params);
  return <EngineerDetail engineerId={resolvedParams.engineerId} />;
};

export default EngineerPage;
