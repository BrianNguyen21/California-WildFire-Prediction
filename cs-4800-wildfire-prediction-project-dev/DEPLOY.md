# Deployment Notes

## Local Deployment

### Install Requirements

1. [Install NodeJS](https://nodejs.org/en/download/)
2. [Install Git](https://git-scm.com/downloads)

### Clone Repository and Install Dependencies

1. Run `git clone https://github.com/kianayao/cs-4800-wildfire-prediction-project` in your terminal/bash
2. Move into the clone repository with `cd cd-4800-wildfire-prediction-project/`
3. In your terminal/bash run the command `npm i` to install dependencies

### Setup Local Variables

1. Go to [MapBox](https://account.mapbox.com/access-tokens/) and obtain an access token
2. Create a file named `.env.local` in the project root directory
3. Place your MapBox API key into `.env.local` with the key `NEXT_PUBLIC_API_KEY="` (ex. `NEXT_PUBLIC_API_KEY="INSERT KEY HERE"`)
4. Place in URL of backend API into `.env.local` with the key `NEXT_PUBLIC_API_URL` (ex. `NEXT_PUBLIC_API_URL="INSERT URL HERE"`)

### Run Project

1. For production `npm run build` followed by `npm run start` in your terminal/bash
2. For development enter `npm run dev`

## Deployment on AWS Amplify

1. Fork repository
2. Deploy repository on AWS following instructions [here](https://aws.amazon.com/amplify/)
3. Once completed deployment, go to App Settings>Environmental Variables in the left panel
4. Go to [MapBox](https://account.mapbox.com/access-tokens/) and obtain an access token
5. Add your MapBox API key with the key `NEXT_PUBLIC_API_KEY="`
6. Add your URL with the key `NEXT_PUBLIC_API_URL`
