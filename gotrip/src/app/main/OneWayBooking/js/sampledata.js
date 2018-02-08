const result = {
    "itineraries": [{
      "outbound": {
        "flights": [{
          "departs_at": "2018-01-08T22:55",
          "arrives_at": "2018-01-09T01:05",
          "origin": {
            "airport": "DEL",
            "terminal": "3"
          },
          "destination": {
            "airport": "BOM",
            "terminal": "2"
          },
          "marketing_airline": "9W",
          "operating_airline": "9W",
          "flight_number": "304",
          "aircraft": "73H",
          "booking_info": {
            "travel_class": "ECONOMY",
            "booking_code": "M",
            "seats_remaining": 1
          }
        }, {
          "departs_at": "2018-01-09T10:00",
          "arrives_at": "2018-01-09T10:55",
          "origin": {
            "airport": "BOM",
            "terminal": "2"
          },
          "destination": {
            "airport": "PNQ"
          },
          "marketing_airline": "9W",
          "operating_airline": "9W",
          "flight_number": "618",
          "aircraft": "738",
          "booking_info": {
            "travel_class": "ECONOMY",
            "booking_code": "S",
            "seats_remaining": 5
          }
        }]
      }
    }],
    "fare": {
      "total_price": "31632.00",
      "price_per_adult": {
        "total_fare": "31632.00",
        "tax": "4617.00"
      },
      "restrictions": {
        "refundable": true,
        "change_penalties": true
      }
    }
}
    export default result;