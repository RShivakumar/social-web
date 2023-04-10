export const formatDOB = (input) => {
  let date = new Date(input);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }

  return [month, day, year].join("/");
};
export const profileDOB = (input) => {
  let date = new Date(input);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  console.log(month);
  let day = date.getDate();
  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }

  return [year, month, day].join("-");
};

export const getPostDate = (input) => {
  if (
    input !== null &&
    input !== "" &&
    input !== undefined &&
    input !== "NA" &&
    input !== "N/A"
  ) {
    const date = new Date(input);
    let month = date.toLocaleString("default", { month: "short" });
    let day = date.getDate();

    let time = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
      minute: "numeric",
    });
    if (day.length < 2) day = "0" + day;

    return `${time},${day} ${month}`;
  }
};
