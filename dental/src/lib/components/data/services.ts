import { nanoid } from 'nanoid'; // very lightweight random ID generator

export interface Service {
    id: string;
    name: string;
    description: string;
    icon: string;
  }
  
  export interface ServiceCategory {
    name: string;
    services: Service[];
  }
  
  export const serviceCategories: ServiceCategory[] = [
    {
      name: 'General Dentistry',
      services: [
        {
          id: nanoid(),
          name: 'Dental Exams & Cleanings',
          description: 'Routine check-ups and cleanings to maintain oral health.',
          icon: 'fa-calendar-plus-o'
        },
        {
          id: nanoid(),
          name: 'X-Rays',
          description: 'Advanced imaging for accurate diagnosis.',
          icon: 'fa-gratipay'
        },
        {
          id: nanoid(),
          name: 'Oral Cancer Screenings',
          description: 'Early detection for better outcomes.',
          icon: 'fa-heartbeat'
        }
      ]
    },
    {
      name: 'Cosmetic Dentistry',
      services: [
        {
          id: nanoid(),
          name: 'Teeth Whitening',
          description: 'Brighten your smile with professional whitening.',
          icon: 'fa-smile-o'
        },
        {
          id: nanoid(),
          name: 'Veneers',
          description: 'Enhance your teeth with custom-made porcelain veneers.',
          icon: 'fa-magic'
        },
        {
          id: nanoid(),
          name: 'Bonding',
          description: 'Quick fixes for chips, gaps, and stains.',
          icon: 'fa-paint-brush'
        }
      ]
    },
    {
      name: 'Pediatric Dentistry',
      services: [
        {
          id: nanoid(),
          name: 'Children’s Exams',
          description: 'Gentle care tailored for little smiles.',
          icon: 'fa-child'
        },
        {
          id: nanoid(),
          name: 'Fluoride Treatments',
          description: 'Extra protection for developing teeth.',
          icon: 'fa-tint'
        },
        {
          id: nanoid(),
          name: 'Dental Sealants',
          description: 'Prevent cavities with protective coatings.',
          icon: 'fa-stethoscope'
        }
      ]
    },
    {
      name: 'Emergency Services',
      services: [
        {
          id: nanoid(),
          name: 'Toothaches & Abscesses',
          description: 'Immediate pain relief and treatment.',
          icon: 'fa-ambulance'
        },
        {
          id: nanoid(),
          name: 'Broken Teeth',
          description: 'Urgent care for fractures or knocked-out teeth.',
          icon: 'fa-exclamation-triangle'
        },
        {
          id: nanoid(),
          name: 'Lost Fillings or Crowns',
          description: 'Quick fixes to restore your smile.',
          icon: 'fa-hospital-o'
        }
      ]
    }
]