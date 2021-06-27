import pandas as pd
df = pd.read_excel('pincode.xlsx', engine='openpyxl')
df.to_csv(r'pincodeList.txt', header=None, index=None, sep='\t', mode='r+')