import requests, bs4, json, re, time
f = open('break_534475.json','r')
data = json.load(f)
counter = 0
failed = []

for i in data['data']:
	counter = counter + 1
	url = ("https://www.google.com/search?q=lat+and+long+of+" + str(i['Pincode']))
	if counter % 300 == 0:
		time.sleep(20) # 1 sec delay
	res = requests.get(url)
	soup = bs4.BeautifulSoup(res.text, "html.parser")
	try:
		coordinates = soup.select('div')
		myStr = coordinates[29].text
		location = re.findall("\d+\.\d+", myStr)
		print(i['Pincode'], location[0], location[1])
	except:
		failed.append(i['Pincode'])
		
f.close()
print(failed)















