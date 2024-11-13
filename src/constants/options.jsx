export const SelectTravelersList = [
    {
        id: 1,
        title: 'Just Me',
        desc: 'A sole traveler in exploration',
        icon: '🧳',  // Luggage emoji for solo travel
        people: '1',
    },
    {
        id: 2,
        title: 'A Couple',
        desc: 'Two travelers in tandem',
        icon: '💌',  // Heart emoji for couple
        people: '2 People',
    },
    {
        id: 3,
        title: 'Family(Nuclear)',
        desc: 'A group of fun-loving adventurers',
        icon: '👨‍👩‍👧‍👦',  // Family emoji
        people: '3-5 People',
    },
    {
        id: 4,
        title: 'Family & Friends(5-10 people)',
        desc: 'A bunch of thrill-seekers',
        icon: '👥',  // Friends emoji (multiple people)
        people: '5-10 people',
    },
    {
        id: 5,
        title: 'More than 10 people',
        desc: 'Adventure awaits! An unforgettable journey!',
        icon: '🧑🏻‍🤝‍🧑🏻',  // Friends emoji (multiple people)
        people: '5-10 people',

    }
];

export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Cheap',
        desc: 'Stay conscious of cost',
        icon: '💰',  // Money bag emoji for budget travel
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Keep costs on the average side',
        icon: '💵',  // Dollar bill emoji for moderate spending
    },
    {
        id: 3,
        title: 'Luxury',
        desc: "Don't worry about the cost",
        icon: '🍸',  // Gem emoji for luxury travel
    }
];

export const AI_Prompt = 'Generate Travel Plan for Location: {location}, for {totalDays} Days for {traveler} with a {budget} budget, give me Hotels options list with HotelName, Hotel address, Price, hotel image url, Geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image URL, Geo coordinates, ticket Pricing , Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format ';
