/**
 * Services data for the OPD/Services section.
 * Each service links to a departmentId for cross-referencing.
 * Ready for backend: mirrors GET /api/services response shape.
 */
export const services = [
  {
    id: 1,
    title: 'Outpatient Consultation',
    departmentId: 'physiotherapy',
    icon: '🩺',
    description: 'Walk-in and scheduled consultations with specialist physicians for diagnosis, treatment plans, and follow-up care.',
    image: '/specialized-image.jpg',
  },
  {
    id: 2,
    title: 'Surgical Services',
    departmentId: 'orthopedics',
    icon: '🔬',
    description: 'State-of-the-art surgical suites for minimally invasive procedures, joint replacements, and complex surgeries.',
    image: '/specialized-image.jpg',
  },
  {
    id: 3,
    title: 'Diagnostic Imaging',
    departmentId: 'cardiology',
    icon: '📊',
    description: 'Advanced imaging including MRI, CT scans, X-rays, and ultrasound for accurate diagnostics and treatment planning.',
    image: '/specialized-image.jpg',
  },
  {
    id: 4,
    title: 'Rehabilitation Programs',
    departmentId: 'physiotherapy',
    icon: '🏃',
    description: 'Customized rehab programs combining physical therapy, occupational therapy, and pain management techniques.',
    image: '/specialized-image.jpg',
  },
  {
    id: 5,
    title: 'Eye Testing & Surgery',
    departmentId: 'ophthalmology',
    icon: '👁️',
    description: 'Comprehensive vision testing and advanced surgical procedures including LASIK, cataract removal, and glaucoma treatment.',
    image: '/specialized-image.jpg',
  },
  {
    id: 6,
    title: 'Dental Procedures',
    departmentId: 'dental',
    icon: '🦷',
    description: 'Full range of dental services from routine cleanings and fillings to implants, root canals, and cosmetic dentistry.',
    image: '/specialized-image.jpg',
  },
];
