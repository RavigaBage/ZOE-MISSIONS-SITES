# Add a subscriber
curl -X POST -H "Content-Type: application/json" -d '{"email": "<EMAIL_TO_ADD>"}' localhost:5001/subscriber/add

# Remove a subscriber
curl "http://localhost:5001/subscriber/unsubscribe?id=<ID>&email=<EMAIL>"

# Send a bulk email
curl -X POST -H "Content-Type: application/json" -d '{"password": "password", "subject": "My second email!", "body": "WittCepter is awesome!"}' localhost:5001/subscriber/send

# Verify a subscriber
curl "http://localhost:5001/subscriber/verify?id=<ID>&email=<EMAIL>"



curl -X POST -H "Content-Type: application/json" -d '{"email": "<EMAIL_TO_ADD>"}' localhost:5001/subscriber/add
