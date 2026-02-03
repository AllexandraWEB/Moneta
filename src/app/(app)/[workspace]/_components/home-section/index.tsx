"use client";

import Card from "../card";
import Container from "../../../../../components/container";
import Transactions from "../transactions";
import { ThemeToggle } from "../../../../../components/theme-toggle";
import { useState, useEffect } from "react";
import { getWorkspaceAccounts } from "@/src/app/actions/accounts";
import { Account } from "@/src/types/database";
import { useWorkspace } from "@/src/contexts/WorkspaceContext";

interface HeroSectionProps {
  userName?: string;
}

const HeroSection = ({ userName = "User" }: HeroSectionProps) => {
  const { workspaceId } = useWorkspace();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      setLoading(true);
      const { data, error } = await getWorkspaceAccounts(workspaceId);
      if (data) setAccounts(data);
      setLoading(false);
    };

    fetchAccounts();
  }, [workspaceId]);

  // Get initials from user name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Container>
      <div className="h-screen bg-white dark:bg-neutral-900 text-black dark:text-white">
        {/* Welcome Back */}
        <div className="flex gap-3 items-center justify-between px-4 py-6">
          <div className="flex gap-3 items-center">
            {/* Circle */}
            <div className="flex items-center justify-center w-15 h-15 rounded-full bg-black dark:bg-neutral-100">
              <span className="text-18-regular text-white dark:text-black">
                {getInitials(userName)}
              </span>
            </div>
            {/* Welcome Message and Name */}
            <div>
              <span className="">Welcome back,</span>
              <h1 className="text-18-bold">{userName}</h1>
            </div>
          </div>
          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
        <Container className="px-4 pt-2">
          {/* <div className="flex flex-col space-y-4 pb-4">
            <span className="text-sm uppercase">Your current balance</span>
            <h1 className="text-7xl">&euro;13,032</h1>
          </div> */}
          {/* Cards */}
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 pb-4">
              {loading ? (
                <div className="text-center w-full py-8">
                  Loading accounts...
                </div>
              ) : accounts.length === 0 ? (
                <div className="text-center w-full py-8">
                  No accounts yet. Create one to get started!
                </div>
              ) : (
                accounts.map((account) => (
                  <Card key={account.id} account={account} />
                ))
              )}
            </div>
          </div>
          {/* Transactions */}
          <div className="bg-neutral-100 dark:bg-[#1f1f1f] rounded-t-4xl -mx-4 px-4 mt-4">
            <Transactions workspaceId={workspaceId} />
          </div>
        </Container>
      </div>
    </Container>
  );
};

export default HeroSection;
