import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
from yellowbrick.cluster import KElbowVisualizer
import csv
import sys

# python3 gerar_dispositivos_e_gateways.py 10 10 10

def gerar_coordenadas_aleatorias(n, min_x, max_x, min_y, max_y):
    random_coords = []
    for _ in range(n):
        x = np.random.uniform(low=min_x, high=max_x)
        y = np.random.uniform(low=min_y, high=max_y)
        random_coords.append([x, y])
    return random_coords

def salvar_coordenadas_em_csv(coordenadas, nome_arquivo):
    df = pd.DataFrame(coordenadas, columns=['x', 'y'])
    df.to_csv(nome_arquivo, header=False, index=False)

def main():
    np.random.seed(42)
    # min_x, max_x = 0.0, 10000
    # min_y, max_y = 0.0, 10000
    # n_dispositivos = 1000

    n_dispositivos = int(sys.argv[1])
    print(f'Gerando {n_dispositivos} dispositivos...')
    min_x, max_x = 0.0, float(sys.argv[2]) * 1000
    print(f'Gerando dispositivos com coordenadas x entre {min_x} e {max_x}...')
    min_y, max_y = 0.0, float(sys.argv[3]) * 1000
    print(f'Gerando dispositivos com coordenadas y entre {min_y} e {max_y}...')

    coordenadas_dispositivos = gerar_coordenadas_aleatorias(n_dispositivos, min_x, max_x, min_y, max_y)
    salvar_coordenadas_em_csv(coordenadas_dispositivos, './src/main/output/endevices.csv')

    df = pd.DataFrame(coordenadas_dispositivos, columns=['x', 'y'])
    num_dispositivos = len(df.index)
    # print(f'O arquivo contém {num_dispositivos} dispositivos.')

if __name__ == "__main__":
    main()