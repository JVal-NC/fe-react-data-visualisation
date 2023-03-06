import axios from "axios";

const api = axios.create({ baseURL: "https://api.carbonintensity.org.uk" });

export const get24HrIntensityData = () => {
  const nowsDate = new Date();
  let nowsDay: string | number = nowsDate.getDate();
  let nowsMonth: string | number = nowsDate.getMonth() + 1;
  const nowsYear = nowsDate.getFullYear();

  if (nowsDay < 10) {
    nowsDay = "0" + nowsDay;
  }
  if (nowsMonth < 10) {
    nowsMonth = "0" + nowsMonth;
  }

  const promiseArr = [];

  for (let i = 1; i <= 47; i++) {
    promiseArr.push(
      api
        .get(`/intensity/date/${nowsYear}-${nowsMonth}-${nowsDay}/${i}`)
        .then((x) => {
          return x.data.data;
        })
    );
  }

  return Promise.all(promiseArr).then((x) => {
    return x.map((x) => x[0].intensity);
  });
};
