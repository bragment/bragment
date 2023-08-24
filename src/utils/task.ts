export function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function autoRetryExecute(
  task: () => Promise<boolean> | boolean,
  interval = 1,
  max = 6,
  count = 0
) {
  while (count++ < max) {
    await sleep(interval);
    const result = await task();
    if (result) {
      return true;
    }
  }
  return false;
}
