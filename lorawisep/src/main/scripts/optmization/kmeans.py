import csv
import pandas as pd
from yellowbrick.cluster import KElbowVisualizer
from sklearn.cluster import KMeans
import sys

def read_coordinates_from_csv(file_path):
    data = pd.read_csv(file_path, names=['X', 'Y'], delimiter=",")
    return pd.DataFrame(data)

def find_optimal_clusters(df, maxCluster):
    kmeans = KMeans()
    visualizer = KElbowVisualizer(kmeans, k=(1, maxCluster), timings=False)
    visualizer.fit(df)
    return visualizer.elbow_value_

def perform_clustering(df, num_clusters):
    kmeans = KMeans(n_clusters=num_clusters)
    kmeans.fit(df)
    return kmeans.cluster_centers_

def save_gateways_to_csv(gateways, file_path):
    with open(file_path, mode='w', newline='') as f:
        writer = csv.writer(f)
        for gateway in gateways:
            writer.writerow([gateway[0], gateway[1]])

def main():
    # input_file_path = "input/endevices.csv"
    input_file_path = sys.argv[1]
    print(f'Input file path: {input_file_path}')

    devices_df = read_coordinates_from_csv(input_file_path)
    print(devices_df)

    print(f'Number of devices: {devices_df.shape[0]}')

    n_clusters = find_optimal_clusters(devices_df, devices_df.shape[0])
    # n_clusters = 5
    print(f'Optimal number of clusters: {n_clusters}')

    gateways = perform_clustering(devices_df, n_clusters)
    output_file_path = "./src/main/output/gateways.csv"

    save_gateways_to_csv(gateways, output_file_path)
    print("Gateways saved to CSV.")

if __name__ == "__main__":
    main()