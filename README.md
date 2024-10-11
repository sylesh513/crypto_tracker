# Crypto Tracker

Crypto Tracker is a Node.js application designed to track the prices and market caps of three selected cryptocurrencies. The app logs the current price and market cap in USD every two hours, providing users with the latest data through simple API endpoints.

## Features

- Tracks the current price and market cap of three cryptocurrencies.
- Logs data in a database every 2 hours.
- Provides an API to retrieve the latest cryptocurrency rates.
- Calculates and returns the standard deviation of the last 100 records for a selected coin.

## API Endpoints

- `GET /stats`: Returns the current latest rates in USD for the tracked cryptocurrencies.
- `GET /deviation`: Returns the standard deviation of the last 100 records of the selected coin.

## Getting Started

### Prerequisites

- Node.js installed on your local machine.
- MongoDB database setup.

### Installation

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/sylesh513/crypto_tracker
    ```

2. Navigate to the project folder:

    ```bash
    cd crypto_tracker
    ```

3. Install the required packages:

    ```bash
    npm install
    ```

4. Create a `.env` file:

    ```bash
    cp .env.example .env
    ```

5. Edit the `.env` file to include your MongoDB URL, API key, and any other necessary configurations.

### Start the Server

```bash
npm start
```
## Usage
1. To get the latest cryptocurrency rates, make a GET request to /stats.
2. To calculate the standard deviation for a selected coin, make a GET request to /deviation.
## Acknowledgments
1. Node.js for the server environment.
2. MongoDB for the database.
