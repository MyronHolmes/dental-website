
export interface LocationInfo {
	name: string;
	phone: string;
	email: string;
	path: string;
	hours: {
		weekdays: string;
		saturday: string;
		sunday: string;
	};
}

export const locations: LocationInfo[] = [
	{
		name: 'Los Angeles',
		phone: '(213) 111-1111',
		email: 'la@dentalbliss.com',
		path: '/location/los-angeles',
		hours: {
			weekdays: 'Mon - Fri: 9am - 6pm',
			saturday: 'Sat: 10am - 4pm',
			sunday: 'Sun: Closed'
		}
	},
	{
		name: 'New York',
		phone: '(212) 222-2222',
		email: 'ny@dentalbliss.com',
		path: '/location/new-york',
		hours: {
			weekdays: 'Mon - Fri: 8am - 5pm',
			saturday: 'Sat: 9am - 2pm',
			sunday: 'Sun: Closed'
		}
	},
	{
		name: 'Chicago',
		phone: '(312) 333-3333',
		email: 'chicago@dentalbliss.com',
		path: '/location/chicago',
		hours: {
			weekdays: 'Mon - Fri: 9am - 6pm',
			saturday: 'Sat: 10am - 3pm',
			sunday: 'Sun: Closed'
		}
	}
];
