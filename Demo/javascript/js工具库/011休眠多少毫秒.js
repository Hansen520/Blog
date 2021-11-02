function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const fetchData = async () => {
  await sleep(1000);
};

fetchData();
