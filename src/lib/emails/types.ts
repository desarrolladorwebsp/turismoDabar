import type {
  QuoteDestination,
  StudentCountOption,
  TravelYearOption,
} from "@/lib/quote";

export interface QuoteSubmissionPayload {
  fullName: string;
  phone: string;
  email: string;
  school: string;
  course: string;
  studentCount: StudentCountOption;
  destination: QuoteDestination;
  travelYear: TravelYearOption;
}

export interface QuoteEmailContent {
  html: string;
  text: string;
  subject: string;
}
