# Project Title: Users and Orders CURD Application

## AS2-B2-Arif_Uddin

## Description

This repository contains a user and orders management system developed for level 2 web assignment 02. The stack used includes Node.js with Express, MongoDB with Mongoose, TypeScript, and Zod for validation.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed
- MongoDB installed and running
- npm or yarn installed

## Dependencies

```
{
    "@types/express": "^4.17.21",
    "@types/mongoose": "^5.11.97",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "mongoose": "^8.0.1",
    "ts-node-dev": "^2.0.0",
    "zod": "^3.22.4"
  }
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/as-2-user-orders-app.git
```

2. Navigate to the project directory:

```
cd as-2-user-orders-app
```

3. Install dependencies:

```
npm install
```

## Configuration

Create a `.env` file in the root of the project and set the following environment variables:

```
MONGODB_URI=your_mongodb_connection_string
PORT=your_preferred_port
```

## Usage

To run the application in development mode:

```
npm run start:dev
```

To build the application:

```
npm run build
```

To run the application in production mode:

```
npm run start:prod
```

## Scripts

- `npm run lint`: Run ESLint for linting.
- `npm run lint:fix`: Run ESLint and automatically fix fixable issues.
- `npm run prettier`: Run Prettier for code formatting.
- `npm run prettier:fix`: Run Prettier and automatically fix formatting issues.
- `npm test`: Placeholder for running tests.

## Contributing

Feel free to contribute to this project. Fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Author

Your Name

```
Make sure to replace placeholders like `your-username`, `your_mongodb_connection_string`, and `your_preferred_port` with your actual information. Also, update the author's name and any other details as needed.
```
