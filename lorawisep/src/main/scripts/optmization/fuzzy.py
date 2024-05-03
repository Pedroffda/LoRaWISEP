import csv
import pandas as pd
import matplotlib.pyplot as plt
from yellowbrick.cluster import KElbowVisualizer
from sklearn.cluster import KMeans
import skfuzzy as fuzz
import sys

def read_coordinates_from_csv(file_path):
    data = pd.read_csv(file_path, names=['X', 'Y'], delimiter=",")
    return pd.DataFrame(data)

def find_optimal_clusters(df, maxCluster):
    kmeans = KMeans()
    visualizer = KElbowVisualizer(kmeans, k=(1, maxCluster), timings=False)
    visualizer.fit(df)
    return visualizer.elbow_value_

def perform_fuzzy_clustering(df, num_clusters):
    cntr, u, _, _, _, _, _ = fuzz.cluster.cmeans(df.T.values, num_clusters, 2, error=0.005, maxiter=1000, init=None)
    return cntr.T

def save_gateways_to_csv(gateways, file_path):
    with open(file_path, mode='w', newline='') as f:
        writer = csv.writer(f)
        X = []
        Y = []
        # x
        for gateway in gateways[0]:
            X.append(gateway)
            # print(gateway)
        # y
        for gateway in gateways[1]:
            Y.append(gateway)
            # writer.writerow(gateway)
        
        for i in range(len(X)):
            writer.writerow([X[i], Y[i]])

def main():
    # input_file_path = "input/endevices.csv"
    input_file_path = sys.argv[1]
    print(f'Input file path: {input_file_path}')

    devices_df = read_coordinates_from_csv(input_file_path)
    print(devices_df)

    # Realizar agrupamento K-Means

    print(f'Number of devices: {devices_df.shape[0]}')

    n_clusters = find_optimal_clusters(devices_df, devices_df.shape[0])
    print(f'Optimal number of clusters (K-Means): {n_clusters}')

    # Realizar agrupamento Fuzzy C-Means
    gateways_fuzzy = perform_fuzzy_clustering(devices_df, n_clusters)
    print(f'Fuzzy C-Means Gateways: {gateways_fuzzy}')
    output_file_path_fuzzy = "input/gateways.csv"
    save_gateways_to_csv(gateways_fuzzy, output_file_path_fuzzy)
    print("Fuzzy C-Means Gateways saved to CSV.")

if __name__ == "__main__":
    main()