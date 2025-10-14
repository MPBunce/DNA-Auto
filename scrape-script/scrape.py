import requests
from bs4 import BeautifulSoup

dna_auto = 'https://www.instagram.com/dnaautosource/'


# Send a GET request
response = requests.get(dna_auto)

# Parse the HTML
soup = BeautifulSoup(response.content, 'html.parser')

# Now you can scrape the page
print(soup.title.string)
print(soup.prettify())