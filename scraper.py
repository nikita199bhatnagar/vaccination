import requests, bs4, json, re, time
f = open('pincodeList.json','r')
data = json.load(f)
counter = 0
failed = []

fa = open('failed.txt','a')


for i in data['data']:
	counter = counter + 1
	url = ("https://www.google.com/search?q=lat+and+long+of+" + str(i['Pincode']))
	# if counter % 30 == 0:
	time.sleep(1) # 1 sec delay
	res = requests.get(url)
	soup = bs4.BeautifulSoup(res.text, "html.parser")
	try:
		coordinates = soup.select('div')
		myStr = coordinates[29].text
		location = re.findall("\d+\.\d+", myStr)
		print(i['Pincode'], location[0], location[1])
	except:
		failed.append(i['Pincode'])
		line = str(i['Pincode']) + "\n"
		fa.write(line)
f.close()
fa.close()
print(failed)















