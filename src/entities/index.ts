/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: contactinquiries
 * Interface for ContactInquiries
 */
export interface ContactInquiries {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  senderName?: string;
  /** @wixFieldType text */
  emailAddress?: string;
  /** @wixFieldType text */
  subject?: string;
  /** @wixFieldType text */
  inquiryMessage?: string;
  /** @wixFieldType text */
  phoneNumber?: string;
  /** @wixFieldType datetime */
  submissionDate?: Date | string;
}


/**
 * Collection ID: educationalprograms
 * Interface for EducationalPrograms
 */
export interface EducationalPrograms {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  format?: string;
  /** @wixFieldType text */
  platform?: string;
  /** @wixFieldType text */
  cost?: string;
  /** @wixFieldType text */
  schedule?: string;
  /** @wixFieldType text */
  tagline?: string;
  /** @wixFieldType text */
  whatsIncluded?: string;
  /** @wixFieldType text */
  programName?: string;
  /** @wixFieldType text */
  shortDescription?: string;
  /** @wixFieldType text */
  detailedDescription?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  programImage?: string;
  /** @wixFieldType text */
  targetAudience?: string;
}


/**
 * Collection ID: mentalhealthresources
 * Interface for MentalHealthResources
 */
export interface MentalHealthResources {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  resourceTitle?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType url */
  resourceLink?: string;
  /** @wixFieldType text */
  topic?: string;
  /** @wixFieldType text */
  provider?: string;
  /** @wixFieldType date */
  datePublished?: Date | string;
}


/**
 * Collection ID: programregistrations
 * Interface for ProgramRegistrations
 */
export interface ProgramRegistrations {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  registrantName?: string;
  /** @wixFieldType text */
  registrantEmail?: string;
  /** @wixFieldType text */
  programName?: string;
  /** @wixFieldType datetime */
  registrationDate?: Date | string;
  /** @wixFieldType text */
  phoneNumber?: string;
}


/**
 * Collection ID: programschedules
 * Interface for ProgramSchedules
 */
export interface ProgramSchedules {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  scheduleName?: string;
  /** @wixFieldType date */
  startDate?: Date | string;
  /** @wixFieldType time */
  startTime?: any;
  /** @wixFieldType number */
  totalSpots?: number;
  /** @wixFieldType number */
  availableSpots?: number;
  /** @wixFieldType text */
  status?: string;
  /** @wixFieldType datetime */
  registrationDeadline?: Date | string;
}
