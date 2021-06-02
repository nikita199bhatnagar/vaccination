import pandas as pd
import json

df = pd.read_excel('pseudoRepo.xlsx', engine='openpyxl')
result = df.to_json(orient="table")
text_file = open("pseudoRepo.json", "w")
text_file.write(result)
text_file.close()
# df.to_json(r'.txt', header=None, index=None, sep='\t', mode='r+')