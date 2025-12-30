const getTime = () => {
  const date = new Date();
  const formatedDate = date.toLocaleString('en-PH', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: 'Asia/Manila',
  });

  return formatedDate;
};

export default getTime;
