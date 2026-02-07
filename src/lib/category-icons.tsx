import {
  UtensilsCrossed,
  Car,
  ShoppingBag,
  Clapperboard,
  Receipt,
  Heart,
  GraduationCap,
  Plane,
  ShoppingCart,
  Smartphone,
  Wallet,
  Briefcase,
  Building2,
  TrendingUp,
  Gift,
  Tag,
  DollarSign,
  Home,
  LucideIcon,
  Turtle,
} from 'lucide-react';

const categoryIconMap: Record<string, LucideIcon> = {
  // Expense categories
  'Food & Dining': UtensilsCrossed,
  'Transport': Car,
  'Shopping': ShoppingBag,
  'Entertainment': Clapperboard,
  'Bills & Utilities': Receipt,
  'Healthcare': Heart,
  'Education': GraduationCap,
  'Travel': Plane,
  'Groceries': ShoppingCart,
  'Subscriptions': Smartphone,
  'Pets': Turtle,
  'Rent': Home,
  
  // Income categories
  'Salary': Wallet,
  'Freelance': Briefcase,
  'Business': Building2,
  'Investments': TrendingUp,
  'Gift': Gift,
  'Sold Items': Tag,
  'Refund': DollarSign,
};

// Get icon component for a category name
export function getCategoryIcon(categoryName?: string | null): LucideIcon {
  if (!categoryName) {
    return Wallet; // Default icon
  }
  
  return categoryIconMap[categoryName] || Wallet;
}

export { categoryIconMap };
