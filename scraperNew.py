import requests, bs4, json, re
f = open('pincodeList.json','r')
data = json.load(f)
counter = 0
failed = []
for i in data['data']:
    counter = counter + 1
    if counter < 6:
        url = ("https://www.google.com/search?q=lat+and+long+of+" + str(i['Pincode']))
        print(url)
        res = requests.get(url)
        soup = bs4.BeautifulSoup(res.text, "html.parser")
        
        try:
            print('pre')
            coordinates = soup.select('div')
            myStr = coordinates[29].text
            print('post')
            location = re.findall("\d+\.\d+", myStr)
            print("Pincode:",i['Pincode'],"Latitude:",location[0],"Longitude:",location[1])
        except:
            failed.append(i['Pincode'])
f.close()
print(failed)


    














