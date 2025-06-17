
const scrapeSite = async (url: string): Promise<void> => {
  const scrapeResponse = await fetch(`http://localhost:3000/job-scraper`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8'},
    body: JSON.stringify({ jobDescriptionLink: url }),
  });
  console.log(scrapeResponse);
}

export { scrapeSite };
