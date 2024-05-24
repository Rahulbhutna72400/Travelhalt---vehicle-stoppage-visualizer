import pandas as pd

# Load the Excel file
file_path = '/Users/rahulbhutna/Desktop/vehicle-stoppage-visualizer/Assignment Gps Data.xlsx'
gps_data_df = pd.read_excel(file_path, sheet_name='convertcsv.csv')

# Convert the eventGeneratedTime from milliseconds to a readable timestamp
gps_data_df['eventGeneratedTime'] = pd.to_datetime(gps_data_df['eventGeneratedTime'], unit='ms')

# Select the relevant columns
gps_data = gps_data_df[['EquipmentId', 'latitude', 'longitude', 'eventDate', 'eventGeneratedTime']]

# Rename columns for consistency in JavaScript
gps_data.rename(columns={'eventGeneratedTime': 'timestamp'}, inplace=True)

# Convert the DataFrame to a list of dictionaries
gps_data_list = gps_data.to_dict(orient='records')

# Save the data to a JSON file
gps_data_json_path = '/Users/rahulbhutna/Desktop/vehicle-stoppage-visualizer/public/gpsData.json'
gps_data.to_json(gps_data_json_path, orient='records', date_format='iso')

# Display the first 5 records for verification
print(gps_data_list[:5])
