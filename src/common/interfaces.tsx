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

export enum ArticleElement {
  "TEXT" = "Text",
  "IMAGE" = "Image",
  "VIDEO" = "Video",
  "HEADER_LARGE" = "HeaderLarge",
  "HEADER_MEDIUM" = "HeaderMedium",
  "HEADER_SMALL" = "HeaderSmall",
  "LIST_ITEM" = "ListItem",
}

export interface ArticlePart {
  id: number;
  text: string;
  type: ArticleElement;
}

export interface KindnessAction {
  id: number;
  title: string;
  description?: string;
  category: CategoryNames;
  imageUrl: string;
  article?: ArticlePart[];
}

export interface UserStats {
  id: number;
  firstName: string;
  lastName: string;
  historicalData: {
    month: string;
    label: string;
    value: number;
  }[];
  totalNumberOfKindnesses: number;
  topCategory: CategoryNames;
}

export interface BadgeProps {
  id?: number;
  icon: React.ReactNode;
  iconSrc?: string;
  enabled: boolean;
  name: string;
  necessaryActions: KindnessAction[];
  description?: string;
  tooltip?: string;
}
