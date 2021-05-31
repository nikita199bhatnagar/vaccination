import requests, bs4

res = requests.get('https://www.google.com/search?q=lat+and+long+of+202001')
res.raise_for_status
soup = bs4.BeautifulSoup(res.text, "html.parser")
coordinates = soup.select('div')
print(coordinates[29].text)

    














