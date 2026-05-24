import type { Event } from '@/types/event'

export const ALL_CITIES = ['Bangalore', 'Hyderabad', 'Mumbai', 'Delhi', 'Virtual'] as const
export const ALL_FORMATS: Event['format'][] = ['virtual', 'in-person']