async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  console.log(chrome)
  // let [tab] = await chrome.tabs.query(queryOptions);
  // return tab;
}

// chrome.runtime.onInstalled.addListener(async () => {
//   console.log(await getCurrentTab());
// });

chrome.runtime.onInstalled.addListener(getCurrentTab)