import {
  HelpCircle,
  Info,
  Languages,
  Shield,
  User,
  WalletCards,
} from "lucide-react";

export const primaryItems = [
  {
    key: "profile",
    icon: User,
    label: "Profile Information",
    href: "/account/profile",
  },
  {
    key: "security",
    icon: Shield,
    label: "Privacy and Security",
    href: "/account/security",
  },
  {
    key: "billing",
    icon: WalletCards,
    label: "Subscriptions and Billing",
    href: "/account/billing",
  },
];

export const secondaryItems = [
  {
    key: "language",
    icon: Languages,
    label: "Language",
    href: "/account/language",
  },
  { key: "help", icon: HelpCircle, label: "Help Center", href: "/help" },
  { key: "about", icon: Info, label: "About", href: "/about" },
];
