# 123fakturera Clone

This project is a clone of the 123fakturera website's terms and conditions page and a simple price list page. It was developed using React.js, Vite, and a Node.js backend. The frontend uses plain CSS for styling, having initially utilized Tailwind CSS.

## Features

1. **Terms and Conditions Page**:
   - Mimics the design and functionality of [123fakturera Terms and Conditions](https://online.123fakturera.se/terms/).
   - The page includes a responsive layout supporting mobile portrait, landscape, tablet, and desktop views.
   - Texts in English and Swedish are pulled from a PostgreSQL database.

2. **Price List Page**:
   - Displays a list of products with fields like Product/Service, In Price, Price, etc.
   - Data is pulled from a PostgreSQL database and can be edited directly on the page.
   - The page supports scrolling for a large number of products (at least 20 rows for testing).
   - The layout adjusts for different screen sizes (desktop, tablet, mobile).

3. **Responsive Design**:
   - Full responsiveness across mobile portrait, mobile landscape, tablet, and desktop resolutions.
   - Hamburger menu functionality for mobile views.

4. **Backend**:
   - Built using Node.js and Express.
   - Data is served from a PostgreSQL database, designed to hold both the terms and conditions texts and price list data.

## Setup

### Prerequisites

- Node.js (version 18 or higher recommended)
- PostgreSQL (for backend database)

