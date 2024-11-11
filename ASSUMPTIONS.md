# App Tracker - Assumptions and Decisions

## Component Responsibility & Code Structure

- Each component in the app strictly handles its specific responsibilities, ensuring a clear separation of concerns.
- Functional logic has been moved to custom hooks wherever possible to enhance reusability and maintain cleaner components.
- Memoization techniques are applied to prevent unnecessary recalculations and improve performance.
- `react-hook-form` is used for form creation and input management, eliminating the need for extra state for form data handling.

## Routing Structure

The app includes three main routes:

1. `/accounts` - Displays a list of accounts.
2. `/transactions/:transactionId` - Shows transaction details for a selected transaction.
3. `/spending-tracker` - Tracks and visualizes weekly spending.

---

## Page Details & Design Choices

### Accounts Page

- **Description:** Displays a list of accounts along with their individual balances and the total balance.
- **Data Fetching:** Uses TanStack Query for data retrieval, as complex state management is not required here. Cached data from TanStack Query allows for efficient access, reducing API calls for account details when needed elsewhere in the app.
- **Visualization:** Account balances are visualized with `chart.js` to show the percentage distribution between accounts.

### Transactions Page

- **Description:** Lists transactions either for a specific account (based on `accountId` parameter) or for all accounts. Includes filtering options by duration.
- **Dynamic Routing:** Uses dynamic routes to handle the `accountId` parameter, enabling account-specific views if selected.
- **Separation of Concerns:** Custom hooks handle business logic, allowing components to focus on UI rendering.
- **State Management:** TanStack Query manages API calls and caching, eliminating the need for complex state management at this stage.

### Spending Tracker Page

- **Description:** Allows users to create, update, and delete weekly spending trackers.
- **Visualization:** Displays a bar chart showing weekly spending versus budget, enabling users to easily assess their spending status.
- **Additional Features:** Shows combined budget and spending totals for a selected week, a list of trackers with color-coded categories, a progress bar (spending vs. budget), and a status message.
- **State Management:** Since CRUD operations are required, both Redux Toolkit and TanStack Query are utilized for more robust state management in this feature, ensuring smoother handling of create, update, and delete actions.
