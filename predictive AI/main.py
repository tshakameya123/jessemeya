import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

# Step 1: Load the dataset
file_path = r'D:\Ignite AI class\Projects\predictive AI\Housing.csv'  # Use raw string for Windows path
housing_data = pd.read_csv(file_path)

# Step 2: Data Preprocessing
# Convert categorical 'yes/no' columns to 1/0
binary_columns = ['mainroad', 'guestroom', 'basement', 'hotwaterheating', 'airconditioning', 'prefarea']
for col in binary_columns:
    housing_data[col] = housing_data[col].apply(lambda x: 1 if x == 'yes' else 0)

# Encode 'furnishingstatus' into numerical categories
le = LabelEncoder()
housing_data['furnishingstatus'] = le.fit_transform(housing_data['furnishingstatus'])

# Step 3: Splitting the dataset into features (X) and target (y)
X = housing_data.drop(columns=['price'])
y = housing_data['price']

# Step 4: Split the data into training and testing sets (80% training, 20% testing)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Step 5: Initialize and train the Linear Regression model
linear_model = LinearRegression()
linear_model.fit(X_train, y_train)

# Step 6: Make predictions on the test set
y_pred = linear_model.predict(X_test)

# Step 7: Evaluate the model
rmse = mean_squared_error(y_test, y_pred, squared=False)
r2 = r2_score(y_test, y_pred)

# Step 8: Output the evaluation results
print(f"Root Mean Squared Error (RMSE): {rmse}")
print(f"R² Score: {r2}")

# Step 9: Display the actual vs predicted values for the first few test cases
comparison = pd.DataFrame({'Actual Price': y_test, 'Predicted Price': y_pred})
print("\nActual vs Predicted Prices (first 10 rows):")
print(comparison.head(10))



