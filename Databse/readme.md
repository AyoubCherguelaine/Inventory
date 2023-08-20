# Database Documentation

This document provides an overview of the database schema, functions, triggers, and views used in this project. The database is designed to manage articles, actors, warehouses, and operations within an inventory management system.

## Table of Contents

- [Database Documentation](#database-documentation)
  - [Table of Contents](#table-of-contents)
  - [Table Definitions](#table-definitions)
  - [Functions and Triggers](#functions-and-triggers)
  - [Views](#views)
  - [License](#license)

## Table Definitions

1. **BaseArticle**: Stores information about base articles used in the inventory.

2. **Dimension**: Contains dimensions for articles, such as size or color.

3. **Article**: Represents individual articles with sale price, cost, reference, and barcode information.

4. **Actor**: Represents actors interacting with the inventory system, such as customers or suppliers.

5. **Warehouse**: Stores information about warehouses where articles are stored.

6. **Article_in_warehouse**: Keeps track of article quantities in different warehouses.

7. **TypeOperation**: Defines types of operations, such as receipts or delivery orders.

8. **Operation**: Represents operations related to the inventory, including type, actor, warehouse, and confirmation status.

9. **LineOperation**: Connects articles with operations and stores quantities.

## Functions and Triggers

- **UpdateWarehouseQuantity**: Function triggered after an operation is updated. Updates article quantities in warehouses based on line operation details.

- **After_Update_Confirm**: Triggered after an operation is updated. Calls the `UpdateWarehouseQuantity` function if the operation's confirmation status changes.

- **IsArticleQuantityAvailable**: Function that checks if a requested quantity of an article is available in a warehouse.

## Views

1. **ArticleInfo**: Provides detailed information about articles, including their base article name, dimension title, sale price, cost, reference, and barcode.

2. **RecentOperations**: Displays recent operations, including their operation type, actor, warehouse, date, and confirmation status.

3. **ArticleWarehouseDetails**: Displays details about articles stored in warehouses, including warehouse name, lot, and quantity.

4. **ActorOperations**: Shows operations related to actors, including operation type, warehouse, date, and confirmation status.

5. **ActorBoughtArticles**: Displays articles bought by actors, along with their quantities.

6. **WarehouseOperations**: Shows operations related to warehouses, including operation type, actor, date, and confirmation status.

## License

This database and its documentation are open-source and released under the [MIT License](LICENSE).
