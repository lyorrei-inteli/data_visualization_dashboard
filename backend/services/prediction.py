import pandas as pd
from pycaret.classification import predict_model
from utils.mapping import column_mapping

def make_prediction(data: dict, model):
    # Convert input directly to DataFrame with renamed columns
    input_data = pd.DataFrame([data])
    for column, new_name in column_mapping.items():
        if column in input_data.columns:
            input_data.rename(columns={column: new_name}, inplace=True)
            
    # Predict using model
    prediction = predict_model(model, data=input_data)
    return prediction