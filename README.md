# Crublibrary

A lightweight, zero-dependency NPM package to interact with your public CRUD API platform. Crublibrary handles authentication, request credit tracking, and common error states, so you can focus on building your application.

---

## 🚀 Installation

```bash
npm install rohit-formpilot-crud
```

or using Yarn:

```bash
yarn add rohit-formpilot-crud
```

## 🔧 Configuration

To use Crublibrary, please register [here](https://crublibrary-dashboard-crud.vercel.app/) and generate your API_KEY and API_URL. Crublibrary retrieves your API endpoint and key from the designated environment variables. It is essential to create a `.env` file in your project's root directory.

```env
CRUD_API_URL=https://your-api-url.com
CRUD_API_KEY=your-unique-api-key
```

Then load them in your code (e.g., via `dotenv`):

```js
require('dotenv').config();
```

## 💡 Usage

Import and initialize Crublibrary:

```js
import { createCrudLibrary } from "rohit-formpilot-crud";
```

Setting up the API key and API URL:

```js
const apiKey = process.env.API_KEY;
const apiUrl = process.env.API_URL;
```

Creating an instance of the CrudLibrary:

```js
const crudLibrary = createCrudLibrary(apiKey, apiUrl);
```

### Available Methods

1. **create(data)**

  Creates a new record.

  ```js
  const response = await crudLibrary.create({
    value: 0.5,
    txHash: '0x32424'
  });
  // → { id: '32872', status: 'created successfully' }
  ```

2. **get(id)**

  Retrieves a record by its ID.

  ```js
  const record = await crudLibrary.get('32872');
  // → { id: '32872', value: 0.5, txHash: '0x32424' }
  ```

3. **update(id, updates)**

  Updates an existing record.

  ```js
  const result = await crudLibrary.update('32872', { value: 0.9 });
  // → { status: 'updated successfully' }
  ```

4. **delete(id)**

  Deletes a record by ID.

  ```js
  const result = await crudLibrary.delete('32872');
  // → { status: 'deleted successfully' }
  ```

## ⚠️ Error Handling & Edge Cases

- **Missing or Invalid API Key/URL**

  ```js
  Error: Missing or invalid API credentials. Make sure CRUD_API_URL and CRUD_API_KEY are set.
  ```

- **Credit Limit Exceeded**

  ```js
  Error: Request limit exceeded. Please recharge credits.
  ```

- **Record Not Found**

  ```js
  Error: Record with ID '12345' not found.
  ```

- **Invalid Input**

  ```js
  Error: Validation failed. 'value' must be a number between 0 and 1.
  ```

## 🔄 Credit Recharge Simulation

Since email-based recharges are simulated, when credits run out:

1. The first `.create()`, `.get()`, `.update()`, or `.delete()` call after exhaustion will return:
  ```js
  Error: Request limit exceeded. Please recharge credits.
  ```
2. Any further attempts will also return the same error; manual recharge via emailing support is expected.

## 🌟 Contributing

Contributions, issues, and feature requests are welcome! Please open an issue or pull request on the GitHub repo.

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
