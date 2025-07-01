import json
import random

# Allowed stations list
allowed_stations = [
    "Ahmedabad Junction (ADI)",
    "Ambala Cantt (UMB)",
    "Amritsar Junction (ASR)",
    "Anand Vihar Terminal (ANVT)",
    "Bengaluru City Junction (SBC)",
    "Bhopal Junction (BPL)",
    "Bhubaneswar (BBS)",
    "Chandigarh (CDG)",
    "Chennai Central (MAS)",
    "Chhatrapati Shivaji Maharaj Terminus (CSMT)",
    "Danapur (DNR)",
    "Guwahati (GHY)",
    "H Nizamuddin (NZM)",
    "Hatia (HTE)",
    "Howrah Junction (HWH)",
    "Jaipur Junction (JP)",
    "Jammu Tawi (JAT)",
    "Jodhpur Junction (JU)",
    "Kacheguda (KCG)",
    "Kanpur Central (CNB)",
    "Lokmanya Tilak Terminus (LTT)",
    "Madgaon (MAO)",
    "New Delhi (NDLS)",
    "Patna Junction (PNBE)",
    "Puri (PURI)",
    "Raipur Junction (R)",
    "Rajendra Nagar Terminal (RJPB)",
    "Ranchi Junction (RNC)",
    "Secunderabad Junction (SC)",
    "Thiruvananthapuram Central (TVC)",
    "Vijayawada Junction (BZA)"
]

# Helper function to generate random price
def get_random_price():
    return str(random.randint(500, 3000))

# Load JSON file
with open('Chennai.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

updated_data = []

for train in data:
    if train.get("to") in allowed_stations:
        # Replace nulls with random values
        train["from"] = "Chennai Central (MAS)"
        
        price_fields = [
            "sleeper_price",
            "1A_price",
            "2A_price",
            "3A_price"
        ]
        
        for field in price_fields:
            if field not in train or train[field] in [None, "null"]:
                train[field] = get_random_price()
        
        updated_data.append(train)

# Write updated JSON
with open('Chennai.json', 'w', encoding='utf-8') as f:
    json.dump(updated_data, f, indent=2, ensure_ascii=False)

print(f"✅ Done! Wrote {len(updated_data)} trains to Chennai.json")
