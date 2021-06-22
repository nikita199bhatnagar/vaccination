import pandas as pd
df = pd.read_csv('input.csv') # can replace with df = pd.read_table('input.txt') for '\t'
df.to_excel('output.xlsx', 'Sheet1', index=False)

# A,B,C
# 1,2,3
# 4,5,6
# 7,8,9