import type { Event } from '@/types/event'
 
export const ALL_CITIES = ['Bengaluru', 'Hyderabad', 'Mumbai', 'Delhi NCR'] as const
export const ALL_FORMATS: Event['format'][] = ['virtual', 'in-person']