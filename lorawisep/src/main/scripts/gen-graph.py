import sys
import pandas as pd
import matplotlib.pyplot as plt


# root = sys.argv[1]
file_path = sys.argv[1]

def plot_gateway_positions(file_path):
    # Lendo o arquivo CSV
    ed_positions = pd.read_csv(file_path, names=['edx', 'edy'])

    # print(ed_positions)
    plt.title(f"Posicionamento dos End Devices")
    plt.scatter(x=ed_positions['edx'], y=ed_positions['edy'], marker='o', alpha=0.3, color='#1f77b4')
    plt.savefig('./src/main/output/positions.png')

def execute():
    # file_path = "/home/pedro/Documentos/app-ns3/my-electron-app/input/endevices.csv"
    plot_gateway_positions(file_path)

if __name__ == "__main__":
    execute()    