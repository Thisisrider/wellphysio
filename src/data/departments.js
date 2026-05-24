/**
 * Centralized department data — O(n) single-pass for all renders.
 * Each department has a unique `id` used for:
 *   - Linking staff to departments (via staff.departmentId)
 *   - Future API: GET /api/departments/:id
 *   - URL routing: /departments/:slug
 */
export const departments = [
  {
    id: 'physiotherapy',
    name: 'Physiotherapy',
    slug: 'physiotherapy',
    icon: '🦴',
    shortDescription: 'Advanced physiotherapy and rehabilitation programs for pain-free living.',
    description: 'Our physiotherapy department offers personalized rehabilitation programs using the latest techniques in manual therapy, exercise science, and electrotherapy to restore your mobility and quality of life.',
    features: ['Manual Therapy', 'Sports Rehabilitation', 'Post-Surgical Recovery', 'Chronic Pain Management'],
    color: 'violet',
  },
  {
    id: 'orthopedics',
    name: 'Orthopedics',
    slug: 'orthopedics',
    icon: '🦿',
    shortDescription: 'Expert care for bones, joints, and musculoskeletal conditions.',
    description: 'Our orthopedic specialists provide comprehensive care for fractures, joint replacements, spinal conditions, and sports injuries using minimally invasive surgical techniques.',
    features: ['Joint Replacement', 'Fracture Care', 'Spine Surgery', 'Arthroscopy'],
    color: 'blue',
  },
  {
    id: 'cardiology',
    name: 'Cardiology',
    slug: 'cardiology',
    icon: '❤️',
    shortDescription: 'Comprehensive heart care from diagnosis to treatment.',
    description: 'Our cardiology team provides advanced diagnostic testing, interventional procedures, and ongoing management for all cardiovascular conditions.',
    features: ['ECG & Echocardiography', 'Cardiac Catheterization', 'Heart Failure Management', 'Preventive Cardiology'],
    color: 'red',
  },
  {
    id: 'neurology',
    name: 'Neurology',
    slug: 'neurology',
    icon: '🧠',
    shortDescription: 'Expert diagnosis and treatment of neurological disorders.',
    description: 'Our neurologists specialize in diagnosing and treating conditions of the brain, spine, and nervous system including stroke, epilepsy, and neurodegenerative diseases.',
    features: ['Stroke Management', 'Epilepsy Treatment', 'Headache & Migraine Care', 'Neurorehabilitation'],
    color: 'purple',
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics',
    slug: 'pediatrics',
    icon: '👶',
    shortDescription: 'Dedicated healthcare for infants, children, and adolescents.',
    description: 'Our pediatric team provides compassionate, comprehensive care for children from newborns to teenagers, including developmental assessments and immunization programs.',
    features: ['Well-Child Checkups', 'Vaccinations', 'Developmental Screening', 'Pediatric Emergency'],
    color: 'green',
  },
  {
    id: 'dermatology',
    name: 'Dermatology',
    slug: 'dermatology',
    icon: '✨',
    shortDescription: 'Advanced skin care and cosmetic dermatology services.',
    description: 'Our dermatology department offers medical, surgical, and cosmetic treatments for all skin conditions, utilizing the latest technology in laser therapy and aesthetic procedures.',
    features: ['Acne Treatment', 'Skin Cancer Screening', 'Laser Therapy', 'Cosmetic Procedures'],
    color: 'amber',
  },
  {
    id: 'dental',
    name: 'Dental Care',
    slug: 'dental',
    icon: '🦷',
    shortDescription: 'Complete dental services from routine care to advanced procedures.',
    description: 'Our dental team provides comprehensive oral healthcare including preventive care, cosmetic dentistry, orthodontics, and oral surgery in a comfortable, modern facility.',
    features: ['Teeth Whitening', 'Root Canal', 'Dental Implants', 'Orthodontics'],
    color: 'cyan',
  },
  {
    id: 'ophthalmology',
    name: 'Eye Care',
    slug: 'eye-care',
    icon: '👁️',
    shortDescription: 'Complete vision care and advanced eye surgery.',
    description: 'Our ophthalmologists provide comprehensive eye examinations, corrective procedures, and surgical treatments for cataracts, glaucoma, and retinal conditions.',
    features: ['Vision Testing', 'Cataract Surgery', 'LASIK', 'Glaucoma Management'],
    color: 'teal',
  },
];

/**
 * O(1) lookup map — built once at import time.
 * Usage: departmentMap.get('cardiology') → department object
 * Ready for backend: mirrors GET /api/departments/:id response
 */
export const departmentMap = new Map(departments.map((d) => [d.id, d]));
