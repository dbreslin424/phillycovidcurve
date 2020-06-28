export const get = async (url: string) => {
  const response = await fetch(url);

  try {
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
  } catch {
    console.error(response);
  }
};

export const post = async (url: string, data: any) => {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  });

  try {
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
  } catch {
    console.error(response);
  }
};
