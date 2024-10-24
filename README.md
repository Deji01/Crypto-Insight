# CryptoInsight

CryptoInsight is a comprehensive cryptocurrency dashboard built with Next.js, React Query, and shadcn/ui. It provides real-time information about cryptocurrency markets, trending assets, and crypto news.

## Features

- Real-time cryptocurrency market data
- Trending cryptocurrencies
- Latest crypto news
- Responsive design for mobile and desktop
- Dark mode support
- Optimistic UI updates for improved user experience
- Accessibility enhancements
- SEO optimization

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/Deji01/Crypto-Insight.git
   cd crypto-app
   ```

2. Install the dependencies:

   ```
   npm install
   ```

## Configuration

1. Create a `.env.local` file in the root directory of the project.

2. Add the following environment variables:

   ```
   NEXT_PUBLIC_COINGECKO_API_URL=https://api.coingecko.com/api/v3
   NEWS_API_KEY=your_news_api_key_here
   ```

## Running the Application

To run the application in development mode:

```bash 
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

To run the tests:
```bash 
npm test
```

## Project Structure

- `/app`: Contains the main application pages and layouts
- `/components`: Reusable React components
- `/lib`: Utility functions and custom hooks
- `/public`: Static assets
- `/services`: API services
- `/types`: TypeScript type definitions

## Key Components

- `CryptoDashboard`: The main dashboard component
- `MarketsPage`: Displays cryptocurrency market data
- `TrendingPage`: Shows trending cryptocurrencies
- `NewsPage`: Displays latest crypto news
- `CryptoTable`: Renders the table of cryptocurrencies
- `CryptoTicker`: Scrolling ticker of top cryptocurrencies
- `ErrorComponent`: Reusable error display component
- `SEO`: Component for managing SEO meta tags

## Technologies Used

- [Next.js](https://nextjs.org/): React framework for building the application
- [React Query](https://react-query.tanstack.com/): For managing server state and caching
- [shadcn/ui](https://ui.shadcn.com/): UI component library
- [Axios](https://axios-http.com/): For making HTTP requests
- [Framer Motion](https://www.framer.com/motion/): For animations
- [Tailwind CSS](https://tailwindcss.com/): For styling
- [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/): For testing

## API Integration

This project uses the [CoinGecko API](https://www.coingecko.com/en/api/documentation) for fetching cryptocurrency data. Make sure to review their terms of service and usage limits.

## Optimistic UI

The application implements optimistic UI updates for improved user experience. This is particularly noticeable in the News and Trending pages, where new items are immediately displayed before the server confirms the update.

## Accessibility

The application follows WCAG guidelines to ensure it's accessible to all users. This includes proper use of ARIA labels, keyboard navigation support, and sufficient color contrast.

## SEO

The application uses Next.js's built-in features along with custom SEO components to ensure good search engine visibility.

## Contributing

Contributions to CryptoInsight are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

Please ensure your code adheres to the existing style and passes all tests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or feedback, please open an issue on the GitHub repository.

Happy coding!