export const textStyles = {
  "text-3xl-bold": "text-[32px] leading-[42px] font-bold",
  "text-3xl-semibold": "text-[32px] leading-[42px] font-semibold",

  "text-2xl-bold": "text-[24px] leading-[32px] font-bold",
  "text-2xl-semibold": "text-[24px] leading-[32px] font-semibold",
  "text-2xl-medium": "text-[24px] leading-[32px] font-medium",
  "text-2xl-regular": "text-[24px] leading-[32px] font-normal",

  "text-xl-bold": "text-[20px] leading-[32px] font-bold",
  "text-xl-semibold": "text-[20px] leading-[32px] font-semibold",
  "text-xl-medium": "text-[20px] leading-[32px] font-medium",
  "text-xl-regular": "text-[20px] leading-[32px] font-normal",

  "text-2lg-bold": "text-[18px] leading-[26px] font-bold",
  "text-2lg-semibold": "text-[18px] leading-[26px] font-semibold",
  "text-2lg-medium": "text-[18px] leading-[26px] font-medium",
  "text-2lg-regular": "text-[18px] leading-[26px] font-normal",

  "text-lg-bold": "text-[16px] leading-[26px] font-bold",
  "text-lg-semibold": "text-[16px] leading-[26px] font-semibold",
  "text-lg-medium": "text-[16px] leading-[26px] font-medium",
  "text-lg-regular": "text-[16px] leading-[26px] font-normal",

  "text-md-bold": "text-[14px] leading-[24px] font-bold",
  "text-md-semibold": "text-[14px] leading-[24px] font-semibold",
  "text-md-medium": "text-[14px] leading-[24px] font-medium",
  "text-md-regular": "text-[14px] leading-[24px] font-normal",

  "text-sm-semibold": "text-[13px] leading-[22px] font-semibold",
  "text-sm-medium": "text-[13px] leading-[22px] font-medium",

  "text-xs-semibold": "text-[12px] leading-[20px] font-semibold",
  "text-xs-medium": "text-[12px] leading-[18px] font-medium",
  "text-xs-regular": "text-[12px] leading-[18px] font-normal",
} as const;

export type TextStyleName = keyof typeof textStyles;
