# import requests, bs4, json
# with open("pincodeList.json", "w") as write_file:
#     json.dump(data, write_file)


import json

f = open('pincodeList.json','r')
data = json.load(f)
for i in data['data']:
	print(i)
f.close()

# x = '{ "name":"John", "age":30, "city":"New York"}'
# y = json.loads(x)
# print(y["age"])











# pincode = 244713
# url = ("https://www.google.com/search?q=lat+and+long+of+" + str(pincode))
# res = requests.get(url)
# res.raise_for_status
# soup = bs4.BeautifulSoup(res.text, "html.parser")
# coordinates = soup.select('div')
# print(coordinates[29].text)


    














