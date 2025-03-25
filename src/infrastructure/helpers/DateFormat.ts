import moment from "moment";

moment().locale("fr");

export default {
  date(date: Date): string {
    return moment(date).format("DD/MM/YYYY");
  },
  datetime(date: Date): string {
    return moment(date).format("DD/MM/YYYY HH:mm");
  },
};
