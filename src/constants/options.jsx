export const SelectTravelsList=[
    {
        id:1,
        title:'just me',
        desc:'A solo traveller in exploration',
        icon: '✈️',
        people:'1'
    },
    {
        id:2,
        title:'A couple',
        desc:'two traveller in tandem',
        icon: '🥂',
        people:'2'
    },
    {
        id:3,
        title:'Family',
        desc:'A group of fun loving adv',
        icon: '🏠',
        people:'3 to 5 people'
    },
    {
        id:4,
        title:'friends',
        desc:'A brunch of thrilled seeks',
        icon: '🫂',
        people:'5 to 10 people'
    }
]

export const SelectBudgetOptions=[
    {
        id:1,
        title:'cheap',
        desc:'Stay concius of cost',
        icon: '💸',
    },
    {
        id:2,
        title:'Moderate',
        desc:'Keep cost on average side',
        icon: '💰',
    },
    {
        id:3,
        title:'Luxury',
        desc:'Dont worry about cost',
        icon: '🤑',
    }
]

export const AI_PROMPT = `
You are a travel assistant. Generate a travel plan in **valid pure JSON format only**. Do NOT include any explanations, comments, or markdown or backticks(like \`\`\`json or \`\`\` ) return only JSON.

Input details:
- Location: {location}
- Duration: {noofdays} days
- Budget: {budget}
- Travellers: {traveller}
give atleast 4 to 5 hotels and include more than 2 places in each day

Output JSON must include the following structure:

{
  "hotels": [
    {
      "hotelName": "",
      "address": "",
      "price": "",
      "imageUrl": "",
      "geoCoordinates": { "lat": ..., "lng": ... },
      "rating": "",
      "description": ""
    }
  ],
  "itinerary": [
    {
      "day": "Day 1",
      "places": [
        {
          "placeName": "",
          "placeDetails": "",
          "imageUrl": "",
          "geoCoordinates": { "lat": ..., "lng": ... },
          "ticketPricing": "",
          "rating": "",
          "travelTime": "",          // Estimated travel time from hotel/previous place
          "bestTimeToVisit": ""
        }
      ]
    },
    ...
    {
      "day": "Day {noofdays}",
      "places": [
        {
          "placeName": "",
          "placeDetails": "",
          "imageUrl": "",
          "geoCoordinates": { "lat": ..., "lng": ... },
          "ticketPricing": "",
          "rating": "",
          "travelTime": "",
          "bestTimeToVisit": ""
        }
      ]
    }
  ]
}

⚠️ Return only JSON, no markdown or extra text.
`;