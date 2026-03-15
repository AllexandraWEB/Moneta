"use client";

import { Switch } from "@/components/ui/switch";
import Container from "@/src/components/container";
import { Button } from "@/src/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Info,
  Languages,
  MessageCircle,
  Moon,
  Shield,
  Sun,
  User,
  WalletCards,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const AccountSection = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="bg-neutral-100 dark:bg-neutral-900 h-screen">
      <Container className="px-4">
        {/* Header */}
        <header>
          <span className="py-6 flex gap-2 items-center text-18-regular text-gray-600 dark:text-white">
            <ChevronLeft /> Account
          </span>
        </header>
        {/* Account Overview */}
        <div className="w-full flex items-center justify-between bg-neutral-800 text-white rounded-xl py-6 px-4 mb-4 border border-neutral-200 dark:border-neutral-700">
          {/* Icon and Name */}
          <div className="flex items-center justify-start gap-3">
            <img
              src="/background.png"
              alt="Profile Icon"
              className="w-12 h-12 rounded-full"
            />
            <div className="flex flex-col gap-1">
              <h2>Aleksandra Tsimentarova</h2>
              <span className="text-neutral-400">cimentarowa@gmail.com</span>
            </div>
          </div>
          <ChevronRight className="text-white" />
        </div>
        {/* Account Settings */}
        <div className="mb-4">
          {/* First Button */}
          <div className="bg-white dark:bg-neutral-800 rounded-t-xl py-5 px-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <User className="mr-2" />
                Profile Information
              </div>
              <ChevronRight className="text-black dark:text-white" />
            </div>
          </div>
          {/* Second Button */}
          <div className="bg-white dark:bg-neutral-800 py-5 px-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Shield className="mr-2" />
                Privacy and Security
              </div>
              <ChevronRight className="text-black dark:text-white" />
            </div>
          </div>
          {/* Third Button */}
          <div className="bg-white dark:bg-neutral-800 rounded-b-xl py-5 px-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <WalletCards className="mr-2" />
                Subscriptions and Billing
              </div>
              <ChevronRight className="text-black dark:text-white" />
            </div>
          </div>
        </div>
        {/* Account Settings Second Section */}
        <div>
          {/* Dark Mode Switch */}
          <div className="bg-white dark:bg-neutral-800 rounded-t-xl py-5 px-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                {theme === "light" ? (
                  <Sun className="mr-2" />
                ) : (
                  <Moon className="mr-2" />
                )}
                {theme === "light" ? "Light Theme" : "Dark Theme"}
              </div>
              <Switch
                checked={theme === "dark"}
                onCheckedChange={() =>
                  setTheme(theme === "light" ? "dark" : "light")
                }
              />
            </div>
          </div>
          {/* Notifications Switch */}
          <div className="bg-white dark:bg-neutral-800 py-5 px-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <MessageCircle className="mr-2" />
                Notifications
              </div>
              <Switch />
            </div>
          </div>
          {/* Language Button */}
          <div className="bg-white dark:bg-neutral-800 py-5 px-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Languages className="mr-2" />
                Language
              </div>
              <ChevronRight className="text-black dark:text-white" />
            </div>
          </div>
          {/* About Button */}
          <div className="bg-white dark:bg-neutral-800 rounded-b-xl py-5 px-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Info className="mr-2" />
                About
              </div>
              <ChevronRight className="text-black dark:text-white" />
            </div>
          </div>
        </div>
        {/* Logout Button */}
        <div className="w-full mt-4">
          <Button
            variant="dark"
            className="w-full bg-neutral-800 rounded-xl"
            size="lg"
          >
            Logout
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default AccountSection;
