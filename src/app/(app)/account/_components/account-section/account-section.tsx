"use client";

import Link from "next/link";
import Container from "@/src/components/container";

import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/src/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  MessageCircle,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { primaryItems, secondaryItems } from "./const";

type AccountSectionProps = {
  userName?: string;
  userEmail?: string;
};

const AccountSection = ({ userName, userEmail }: AccountSectionProps) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const Row = ({
    Icon,
    label,
    href,
    roundedTop,
    roundedBottom,
    rightNode,
  }: any) => {
    const base =
      "bg-white dark:bg-neutral-800 py-5 px-4 flex justify-between items-center";
    const roundedClass = roundedTop
      ? "rounded-t-xl"
      : roundedBottom
        ? "rounded-b-xl"
        : "";
    const content = (
      <div className={`${base} ${roundedClass}`}>
        <div className="flex items-center">
          {Icon ? <Icon className="mr-2" /> : null}
          {label}
        </div>
        {rightNode ?? <ChevronRight className="text-black dark:text-white" />}
      </div>
    );

    return href ? <Link href={href}>{content}</Link> : content;
  };

  return (
    <div className="bg-neutral-100 dark:bg-neutral-900 h-screen">
      <Container className="px-4 overflow-y-auto pb-32">
        <header>
          <span className="py-6 flex gap-2 items-center text-18-regular text-gray-600 dark:text-white">
            <ChevronLeft type="button" onClick={() => router.back()} /> Account
          </span>
        </header>

        <div className="w-full flex items-center justify-between bg-neutral-800 text-white rounded-xl py-6 px-4 mb-4 border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-start gap-3">
            <img
              src="/background.png"
              alt="Profile Icon"
              className="w-12 h-12 rounded-full"
            />
            <div className="flex flex-col gap-1">
              <h2>{userName ?? "User"}</h2>
              <span className="text-neutral-400">
                {userEmail ?? "you@example.com"}
              </span>
            </div>
          </div>
          <ChevronRight className="text-white" />
        </div>

        <div className="mb-4">
          {primaryItems.map((item, idx) => (
            <Row
              key={item.key}
              Icon={item.icon}
              label={item.label}
              href={item.href}
              roundedTop={idx === 0}
              roundedBottom={idx === primaryItems.length - 1}
            />
          ))}
        </div>

        <div>
          <div className="rounded-t-xl">
            {/* Dark Theme Switch */}
            <div className="bg-white dark:bg-neutral-800 py-5 px-4 rounded-t-xl">
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
            {/* History Switch */}
            <div className="bg-white dark:bg-neutral-800 py-5 px-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Clock className="mr-2" />
                  History
                </div>
                <Switch />
              </div>
            </div>
          </div>

          {secondaryItems.map((item, idx) => (
            <Row
              key={item.key}
              Icon={item.icon}
              label={item.label}
              href={item.href}
              roundedTop={false}
              roundedBottom={idx === secondaryItems.length - 1}
            />
          ))}
        </div>

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
