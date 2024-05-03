import sys
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.offsetbox as offsetbox
from PIL import Image

# root = sys.argv[1]
# file_path = sys.argv[1]
ed_file_path = "./src/main/output/endevices.csv"  
gw_file_path = "./src/main/output/gateways.csv"
icon_path = "./resources/tower.png"

marker_img = Image.open(icon_path).convert("RGBA")
marker_size = 0.005  # Tamanho do marker em relação aos eixos
icon_zoom = 0.7  # Zoom do ícone (ajuste conforme necessário)

def plot_gateway_positions(ed_file_path, gw_file_path):
    # Lendo o arquivo CSV
    ed_positions = pd.read_csv(ed_file_path, names=['edx', 'edy'])
    gw_positions = pd.read_csv(gw_file_path, names=['gwx', 'gwy'])

    # print(ed_positions)
    plt.title(f"Posicionamento dos Dispositivos e dos Gateways")
    plt.scatter(x=ed_positions['edx'], y=ed_positions['edy'], marker='o', alpha=0.3, color='#1f77b4')
    # Usando Bbox para plotar a imagem como marker
    for x, y in zip(gw_positions['gwx'], gw_positions['gwy']):
        bbox = offsetbox.Bbox.from_bounds(x - marker_size / 2, y - marker_size / 2, marker_size, marker_size)
        imagebox = offsetbox.OffsetImage(marker_img, cmap=plt.cm.gray, origin='upper', zoom=icon_zoom)
        imagebox.image.axes = plt.gca()
        plt.gca().add_artist(offsetbox.AnnotationBbox(imagebox, (x, y), frameon=False, xycoords='data', boxcoords="data"))

    plt.savefig('./src/main/output/complete-positions.png')

def execute():
    # file_path = "/home/pedro/Documentos/app-ns3/my-electron-app/input/endevices.csv"
    plot_gateway_positions(ed_file_path, gw_file_path)

if __name__ == "__main__":
    execute() 
