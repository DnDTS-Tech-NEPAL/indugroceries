# date +%s --> outputs the current time as a Unix timestamp,
# which is the number of seconds that have elapsed since January 1, 1970 (UTC)

# Run docker-compose
CACHEBUST=$(date +%s) docker compose up --build -d

# remove the existing docker container and image
docker compose down

# recreate the container so that new changes are reflected immediately
docker compose up -d