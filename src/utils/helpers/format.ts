import moment from "moment";
class Format {
  public static formatToCurrencyKo(value: number) {
    if (value) {
      return new Intl.NumberFormat("ko-KR", {
        style: "currency",
        currency: "KRW",
      }).format(value);
    }

    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(0);
  }

  public static formatDate(value: any) {
    moment(value).format("YYYY[.]MMMM[.]DDDD");
  }
}

export default Format;
