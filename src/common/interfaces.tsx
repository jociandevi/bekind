export enum CategoryNames {
  "SOCIAL" = "Social",
  "YOU" = "You",
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
  "FOOTNOTE" = "Footnote",
}

export interface ArticlePart {
  credit?: string;
  text: string;
  type: ArticleElement;
}

export interface KindnessAction {
  id: number;
  title: string;
  description?: string;
  category: CategoryNames;
  imageUrl: string;
  credit?: string;
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
