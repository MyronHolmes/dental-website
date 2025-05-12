export interface ServiceCategories {
    id: string,
    name: string
}
export interface Service {
    id: string;
    name: string;
    description: string;
    icon: string;
    category_id: number;
    service_categories?: ServiceCategories
}
export interface Location {
    id: string,
    name: string,
    phone: string,
    email: string,
    weekdays_hours: string,
    saturday_hours: string,
    sunday_hours: string,
    path: string
}