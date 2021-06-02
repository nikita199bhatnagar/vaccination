import requests, bs4, json, re, time
f = open('pincodeList.json','r')
data = json.load(f)
counter = 0
failed = []
# load pseudoRepo
#################################################################################################################################################
# preLoad = open('pseudoRepo.json','r')
# preData = json.load(preLoad)
# preFailed = []

for i in data['data']:
	counter = counter + 1
	url = ("https://www.google.com/search?q=lat+and+long+of+" + str(i['Pincode']))
	# if pincode exist in pseudoRepo then continue (Move to next pincode)
#################################################################################################################################################
	# for j in preData['data']:
	# 	if j['Pincode'] == i['Pincode']:
	# 		break
	time.sleep(1) # 1 sec delay
	res = requests.get(url)
	soup = bs4.BeautifulSoup(res.text, "html.parser")
	try:
		coordinates = soup.select('div')
		myStr = coordinates[29].text
		location = re.findall("\d+\.\d+", myStr)
		print("Pincode:",i['Pincode'],"Latitude:",location[0],"Longitude:",location[1])
	except:
		failed.append(i['Pincode'])
		
# preLoad.close()
f.close()
print(failed)


    














