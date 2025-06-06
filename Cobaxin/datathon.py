# -*- coding: utf-8 -*-
"""Datathon.ipynb

Automatically generated by Colab.

Original file is located at
    https://colab.research.google.com/drive/1pyfEsHwJuOiONs3fd9prbXFaahU-qjyS
"""

import folium
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.preprocessing import MinMaxScaler

import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout

from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

import xgboost as xgb
model = xgb.XGBClassifier()

import xgboost as xgb

from sklearn.metrics import classification_report

# Load data
df_test = pd.read_csv('DIM_TIENDA.csv')
df_meta = pd.read_csv('Meta_venta.csv')
df_venta = pd.read_csv('Venta.csv')

# Ensure VENTA_TOTAL is numeric
df_venta['VENTA_TOTAL'] = pd.to_numeric(df_venta['VENTA_TOTAL'], errors='coerce')

# Encode categorical columns
categorical_cols = ['NIVELSOCIOECONOMICO_DES', 'ENTORNO_DES',
                    'SEGMENTO_MAESTRO_DESC', 'LID_UBICACION_TIENDA']

df_encoded = pd.get_dummies(df_test, columns=categorical_cols)

# Filter venta.csv to only include stores in test set
valid_ids = df_encoded['TIENDA_ID'].unique()
df_venta_filtered = df_venta[df_venta['TIENDA_ID'].isin(valid_ids)]

# Compute average monthly revenue
df_venta_avg = df_venta_filtered.groupby('TIENDA_ID')['VENTA_TOTAL'].mean().reset_index()

# Merge encoded features with average revenue
df_merged = pd.merge(df_encoded, df_venta_avg, on='TIENDA_ID', how='left')

# Merge original ENTORNO_DES back in (for joining with meta)
df_merged = pd.merge(df_merged, df_test[['TIENDA_ID', 'ENTORNO_DES']], on='TIENDA_ID', how='left')

# Rename columns in Meta_venta if needed
df_meta.columns = ['ENTORNO_DES', 'META_VENTA']

# Merge monthly benchmark
df_merged = pd.merge(df_merged, df_meta, on='ENTORNO_DES', how='left')

# CORRECT TARGET: Compare monthly average with monthly goal
df_merged['TARGET'] = (df_merged['VENTA_TOTAL'] >= df_merged['META_VENTA']).astype(int)

df_merged['PERFORMANCE'] = df_merged['VENTA_TOTAL'] / df_merged['META_VENTA']

#df_merged[['TIENDA_ID', 'VENTA_TOTAL', 'META_VENTA', 'PERFORMANCE']].sort_values(by='PERFORMANCE', ascending=False).head(10)

df_merged.head(26)

import pandas as pd
import numpy as np
import folium
from folium.plugins import MarkerCluster
import matplotlib.pyplot as plt
from sklearn.preprocessing import MinMaxScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout
import xgboost as xgb

# Load data
df_test = pd.read_csv('DIM_TIENDA.csv')
df_meta = pd.read_csv('Meta_venta.csv')
df_venta = pd.read_csv('Venta.csv')

# Ensure VENTA_TOTAL is numeric
df_venta['VENTA_TOTAL'] = pd.to_numeric(df_venta['VENTA_TOTAL'], errors='coerce')

# Encode categorical columns
categorical_cols = ['NIVELSOCIOECONOMICO_DES', 'ENTORNO_DES',
                    'SEGMENTO_MAESTRO_DESC', 'LID_UBICACION_TIENDA']
df_encoded = pd.get_dummies(df_test, columns=categorical_cols)

# Filter and average monthly sales
valid_ids = df_encoded['TIENDA_ID'].unique()
df_venta_filtered = df_venta[df_venta['TIENDA_ID'].isin(valid_ids)]
df_venta_avg = df_venta_filtered.groupby('TIENDA_ID')['VENTA_TOTAL'].mean().reset_index()

# Merge with features
df_merged = pd.merge(df_encoded, df_venta_avg, on='TIENDA_ID', how='left')
df_merged = pd.merge(df_merged, df_test[['TIENDA_ID', 'ENTORNO_DES']], on='TIENDA_ID', how='left')

# Merge with benchmark
df_meta.columns = ['ENTORNO_DES', 'META_VENTA']
df_merged = pd.merge(df_merged, df_meta, on='ENTORNO_DES', how='left')

# Target and performance
df_merged['TARGET'] = (df_merged['VENTA_TOTAL'] >= df_merged['META_VENTA']).astype(int)
df_merged['PERFORMANCE'] = df_merged['VENTA_TOTAL'] / df_merged['META_VENTA']

# ------------------ FOLIUM MAP ------------------ #

# Define bounding box
coordinates = [
    [26.40152, -100.41022],
    [26.40152, -98.11861],
    [24.85727, -98.11861],
    [24.85727, -100.41022],
    [26.40152, -100.41022]
]

center_lat = (26.40152 + 24.85727) / 2
center_lon = (-98.11861 + -100.41022) / 2

# Create base map
m = folium.Map(location=[center_lat, center_lon], zoom_start=8)

# Draw bounding box
folium.Polygon(
    locations=coordinates,
    color='blue',
    fill=True,
    fill_opacity=0.3,
    popup='Bounding Box'
).add_to(m)

# Add store markers
for _, row in df_merged.iterrows():
    lat = row['LATITUD_NUM']
    lon = row['LONGITUD_NUM']
    color = 'green' if row['TARGET'] == 1 else 'red'
    folium.CircleMarker(
        location=[lat, lon],
        radius=5,
        color=color,
        fill=True,
        fill_color=color,
        fill_opacity=0.8,
        popup=f"ID: {row['TIENDA_ID']}<br>Performance: {row['PERFORMANCE']:.2f}"
    ).add_to(m)

# Display map (works in notebooks)
m.save("store_performance_map.html")
m

# ========================================
# 0. Imports
# ========================================
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import folium

from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

import xgboost as xgb

# ========================================
# 1. Load Data
# ========================================
df_test = pd.read_csv('DIM_TIENDA.csv')         # Combined train + test dataset
df_meta = pd.read_csv('Meta_venta.csv')
df_venta = pd.read_csv('Venta.csv')

df_venta['VENTA_TOTAL'] = pd.to_numeric(df_venta['VENTA_TOTAL'], errors='coerce')
df_meta.columns = ['ENTORNO_DES', 'META_VENTA']

# ========================================
# 2. Preprocessing + Feature Engineering
# ========================================

# One-hot encode
categorical_cols = ['NIVELSOCIOECONOMICO_DES', 'ENTORNO_DES',
                    'SEGMENTO_MAESTRO_DESC', 'LID_UBICACION_TIENDA']
df_encoded = pd.get_dummies(df_test, columns=categorical_cols)

# Merge in average monthly revenue
valid_ids = df_encoded['TIENDA_ID'].unique()
df_venta_filtered = df_venta[df_venta['TIENDA_ID'].isin(valid_ids)]
df_venta_avg = df_venta_filtered.groupby('TIENDA_ID')['VENTA_TOTAL'].mean().reset_index()

df_merged = pd.merge(df_encoded, df_venta_avg, on='TIENDA_ID', how='left')
df_merged = pd.merge(df_merged, df_test[['TIENDA_ID', 'ENTORNO_DES']], on='TIENDA_ID', how='left')
df_merged = pd.merge(df_merged, df_meta, on='ENTORNO_DES', how='left')

# Label: did the store meet the benchmark?
df_merged['TARGET'] = (df_merged['VENTA_TOTAL'] >= df_merged['META_VENTA']).astype(int)

# Optional: Store performance ratio
df_merged['PERFORMANCE'] = df_merged['VENTA_TOTAL'] / df_merged['META_VENTA']

# ========================================
# 3. Prepare Data for ML
# ========================================

# Drop all columns that aren't usable features
X = df_merged.drop(columns=['TIENDA_ID', 'VENTA_TOTAL', 'META_VENTA',
                            'TARGET', 'ENTORNO_DES', 'PERFORMANCE', 'DATASET'], errors='ignore')
y = df_merged['TARGET']

# Scale features
scaler = MinMaxScaler()
X_scaled = scaler.fit_transform(X)

# ========================================
# 4. Train/Test Split and Model Training
# ========================================
X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y, test_size=0.3, random_state=42)

model = xgb.XGBClassifier(use_label_encoder=False, eval_metric='logloss')
model.fit(X_train, y_train)

# ========================================
# 5. Evaluate
# ========================================
y_pred = model.predict(X_test)
print(classification_report(y_test, y_pred))

# ========================================
# 0. Imports
# ========================================
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import folium

from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

import xgboost as xgb
from imblearn.over_sampling import SMOTE

# ========================================
# 1. Load Data
# ========================================
df_test = pd.read_csv('DIM_TIENDA_TEST.csv')
df_train = pd.read_csv('DIM_TIENDA.csv')
df_meta = pd.read_csv('Meta_venta.csv')
df_venta = pd.read_csv('Venta.csv')

df_venta['VENTA_TOTAL'] = pd.to_numeric(df_venta['VENTA_TOTAL'], errors='coerce')
df_meta.columns = ['ENTORNO_DES', 'META_VENTA']

# ========================================
# 2. Preprocessing + Feature Engineering
# ========================================

def preprocess(df_base, venta_df, meta_df):
    categorical_cols = ['NIVELSOCIOECONOMICO_DES', 'ENTORNO_DES',
                        'SEGMENTO_MAESTRO_DESC', 'LID_UBICACION_TIENDA']
    df_encoded = pd.get_dummies(df_base, columns=categorical_cols)

    valid_ids = df_encoded['TIENDA_ID'].unique()
    venta_filtered = venta_df[venta_df['TIENDA_ID'].isin(valid_ids)]
    venta_avg = venta_filtered.groupby('TIENDA_ID')['VENTA_TOTAL'].mean().reset_index()

    df_merged = pd.merge(df_encoded, venta_avg, on='TIENDA_ID', how='left')
    df_merged = pd.merge(df_merged, df_base[['TIENDA_ID', 'ENTORNO_DES']], on='TIENDA_ID', how='left')
    df_merged = pd.merge(df_merged, meta_df, on='ENTORNO_DES', how='left')

    df_merged['TARGET'] = (df_merged['VENTA_TOTAL'] >= df_merged['META_VENTA']).astype(int)
    df_merged['PERFORMANCE'] = df_merged['VENTA_TOTAL'] / df_merged['META_VENTA']

    return df_merged

df_merged_train = preprocess(df_train, df_venta, df_meta)
df_merged_test  = preprocess(df_test,  df_venta, df_meta)

# ========================================
# 3. Feature Selection
# ========================================
drop_cols = ['TIENDA_ID', 'VENTA_TOTAL', 'META_VENTA', 'TARGET',
             'ENTORNO_DES', 'PERFORMANCE', 'DATASET']

X = df_merged_train.drop(columns=drop_cols, errors='ignore')
y = df_merged_train['TARGET']

X_test = df_merged_test.drop(columns=drop_cols, errors='ignore')
y_test = df_merged_test['TARGET']

# Align columns to ensure matching one-hot encoding
X, X_test = X.align(X_test, join='left', axis=1, fill_value=0)

# ========================================
# 4. Scale + Balance Training Data
# ========================================
scaler = MinMaxScaler()
X_scaled = scaler.fit_transform(X)

# Split before SMOTE (train/val)
X_train, X_val, y_train, y_val = train_test_split(X_scaled, y, test_size=0.3, random_state=42, stratify=y)

# Apply SMOTE to training set only
smote = SMOTE(random_state=42)
X_train_res, y_train_res = smote.fit_resample(X_train, y_train)

# ========================================
# 5. Train + Evaluate
# ========================================
model = xgb.XGBClassifier(use_label_encoder=False, eval_metric='logloss')
model.fit(X_train_res, y_train_res)

y_pred = model.predict(scaler.transform(X_test))  # use same scaler for test set
print(classification_report(y_test, y_pred))

# ========================================
# 0. Imports
# ========================================
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import folium

from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

import xgboost as xgb
from imblearn.over_sampling import SMOTE

# ========================================
# 1. Load Data
# ========================================
df_test = pd.read_csv('DIM_TIENDA_TEST.csv')
df_train = pd.read_csv('DIM_TIENDA.csv')
df_meta = pd.read_csv('Meta_venta.csv')
df_venta = pd.read_csv('Venta.csv')

df_venta['VENTA_TOTAL'] = pd.to_numeric(df_venta['VENTA_TOTAL'], errors='coerce')
df_meta.columns = ['ENTORNO_DES', 'META_VENTA']

# ========================================
# 2. Preprocessing + Feature Engineering
# ========================================

def preprocess(df_base, venta_df, meta_df):
    categorical_cols = ['NIVELSOCIOECONOMICO_DES', 'ENTORNO_DES',
                        'SEGMENTO_MAESTRO_DESC', 'LID_UBICACION_TIENDA']
    df_encoded = pd.get_dummies(df_base, columns=categorical_cols)

    valid_ids = df_encoded['TIENDA_ID'].unique()
    venta_filtered = venta_df[venta_df['TIENDA_ID'].isin(valid_ids)]
    venta_avg = venta_filtered.groupby('TIENDA_ID')['VENTA_TOTAL'].mean().reset_index()

    df_merged = pd.merge(df_encoded, venta_avg, on='TIENDA_ID', how='left')
    df_merged = pd.merge(df_merged, df_base[['TIENDA_ID', 'ENTORNO_DES']], on='TIENDA_ID', how='left')
    df_merged = pd.merge(df_merged, meta_df, on='ENTORNO_DES', how='left')

    df_merged['TARGET'] = (df_merged['VENTA_TOTAL'] >= df_merged['META_VENTA']).astype(int)
    df_merged['PERFORMANCE'] = df_merged['VENTA_TOTAL'] / df_merged['META_VENTA']

    return df_merged

df_merged_train = preprocess(df_train, df_venta, df_meta)
df_merged_test  = preprocess(df_test,  df_venta, df_meta)

# ========================================
# 3. Feature Selection
# ========================================
drop_cols = ['TIENDA_ID', 'VENTA_TOTAL', 'META_VENTA', 'TARGET',
             'ENTORNO_DES', 'PERFORMANCE', 'DATASET']

X = df_merged_train.drop(columns=drop_cols, errors='ignore')
y = df_merged_train['TARGET']

X_test = df_merged_test.drop(columns=drop_cols, errors='ignore')
y_test = df_merged_test['TARGET']

# Align columns to ensure matching one-hot encoding
X, X_test = X.align(X_test, join='left', axis=1, fill_value=0)

# ========================================
# 4. Scale + Balance Training Data
# ========================================
scaler = MinMaxScaler()
X_scaled = scaler.fit_transform(X)

# Split before SMOTE (train/val)
X_train, X_val, y_train, y_val = train_test_split(X_scaled, y, test_size=0.3, random_state=42, stratify=y)

# Apply SMOTE to training set only
smote = SMOTE(random_state=42)
X_train_res, y_train_res = smote.fit_resample(X_train, y_train)

# ========================================
# 5. Train + Evaluate
# ========================================
model = xgb.XGBClassifier(use_label_encoder=False, eval_metric='logloss')
model.fit(X_train_res, y_train_res)

y_pred = model.predict(scaler.transform(X_test))  # use same scaler for test set
#print(classification_report(y_test, y_pred))


#df_merged_train.head()

import seaborn as sns
import matplotlib.pyplot as plt

# Calculate mean and std
mu = df_merged_train['PERFORMANCE'].mean()
sigma = df_merged_train['PERFORMANCE'].std()

# Plot
plt.figure(figsize=(12, 6))
sns.histplot(df_merged_train['PERFORMANCE'], bins=30, kde=False, color='skyblue', edgecolor='black')

# Add standard deviation lines and labels
for i in range(-3, 4):
    x = mu + i * sigma
    if i == 0:
        plt.axvline(x, color='red', linestyle='-', linewidth=2)
        label = r'$\mu$'
        label_color = 'red'
    else:
        plt.axvline(x, color='gray', linestyle='--', linewidth=1)
        label = rf'$\mu {"+" if i > 0 else "-"} {abs(i)}\sigma$'
        label_color = 'black'

    # Add label at bottom just above x-axis
    plt.text(x, plt.ylim()[1]*0.05, label, ha='center', fontsize=10, color=label_color)

# Titles and labels
plt.title("Distribución del Rendimiento por Tienda con Desviaciones Estándar", fontsize=14, pad=20)
plt.xlabel("Performance (VENTA_TOTAL / META_VENTA)", fontsize=12)
plt.ylabel("Frecuencia", fontsize=12)
plt.grid(True, linestyle='--', alpha=0.5)
plt.tight_layout()
plt.show()

# ========================================
# 0. Imports
# ========================================
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import folium

from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

import xgboost as xgb

# ========================================
# 1. Load Data
# ========================================
df_test = pd.read_csv('DIM_TIENDA_TEST.csv')
df_train = pd.read_csv('DIM_TIENDA.csv')
df_meta = pd.read_csv('Meta_venta.csv')
df_venta = pd.read_csv('Venta.csv')

df_venta['VENTA_TOTAL'] = pd.to_numeric(df_venta['VENTA_TOTAL'], errors='coerce')
df_meta.columns = ['ENTORNO_DES', 'META_VENTA']

# ========================================
# 2. Preprocessing + Feature Engineering
# ========================================
def preprocess(df_base, venta_df, meta_df, threshold_mean=None):
    categorical_cols = ['NIVELSOCIOECONOMICO_DES', 'ENTORNO_DES',
                        'SEGMENTO_MAESTRO_DESC', 'LID_UBICACION_TIENDA']
    df_encoded = pd.get_dummies(df_base, columns=categorical_cols)

    valid_ids = df_encoded['TIENDA_ID'].unique()
    venta_filtered = venta_df[venta_df['TIENDA_ID'].isin(valid_ids)]
    venta_avg = venta_filtered.groupby('TIENDA_ID')['VENTA_TOTAL'].mean().reset_index()

    df_merged = pd.merge(df_encoded, venta_avg, on='TIENDA_ID', how='left')
    df_merged = pd.merge(df_merged, df_base[['TIENDA_ID', 'ENTORNO_DES']], on='TIENDA_ID', how='left')
    df_merged = pd.merge(df_merged, meta_df, on='ENTORNO_DES', how='left')

    # Performance = how well it exceeded the benchmark
    df_merged['PERFORMANCE'] = df_merged['VENTA_TOTAL'] / df_merged['META_VENTA']

    # Redefine TARGET using threshold (mean-based logic)
    if threshold_mean is None:
        threshold_mean = df_merged['PERFORMANCE'].mean()
    df_merged['TARGET'] = (df_merged['PERFORMANCE'] >= threshold_mean).astype(int)

    return df_merged, threshold_mean

# First pass to compute mean on train
df_merged_train, train_mean = preprocess(df_train, df_venta, df_meta)

# Use same mean for test
df_merged_test, _ = preprocess(df_test, df_venta, df_meta, threshold_mean=train_mean)

# ========================================
# 3. Feature Selection
# ========================================
drop_cols = ['TIENDA_ID', 'VENTA_TOTAL', 'META_VENTA', 'TARGET',
             'ENTORNO_DES', 'PERFORMANCE', 'DATASET']

X_train = df_merged_train.drop(columns=drop_cols, errors='ignore')
y_train = df_merged_train['TARGET']

X_test = df_merged_test.drop(columns=drop_cols, errors='ignore')
y_test = df_merged_test['TARGET']

# Align one-hot encoded columns
X_train, X_test = X_train.align(X_test, join='left', axis=1, fill_value=0)

# ========================================
# 4. Scale + Train/Test Split
# ========================================
scaler = MinMaxScaler()
X_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

X_train, X_val, y_train, y_val = train_test_split(
    X_scaled, y_train, test_size=0.3, random_state=13, stratify=y_train, shuffle=True)

# ========================================
# 5. Train + Evaluate
# ========================================
model = xgb.XGBClassifier(use_label_encoder=False, eval_metric='logloss')
model.fit(X_train, y_train)

y_pred = model.predict(X_test_scaled)
print(classification_report(y_test, y_pred))