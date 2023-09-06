export enum CategoryNames {
  "SOCIAL" = "Social",
  "ANIMAL" = "Animal",
  "NEIGHBORHOOD" = "Neighborhood",
  "ENVIRONMENT" = "Environment",
}

export interface Category {
  id: number;
  name: string;
}

export interface KindnessAction {
  id: number;
  title: string;
  description?: string;
  category: CategoryNames;
  imageUrl: string;
}

export interface UserStats {
  id: number;
  firstName: string;
  lastName: string;
  numberOfKindnessLast30Days: number;
  averageNumberOfKindnessLast30Days: number;
  userMonthlyStatsLast6Months: number[];
  avgMonthlyStatsLast6Months: number[];
  totalNumberOfKindnesses: number;
  topCategory: CategoryNames;
}

export interface BadgeProps {
  id?: number;
  icon: React.ReactNode;
  enabled: boolean;
  name: string;
  necessaryActions: KindnessAction[];
  description?: string;
  tooltip?: string;
}
