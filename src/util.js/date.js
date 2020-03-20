const DateManager = {
  getTodayChinese() {
    let time = new Date();
    // console.log(
    //   `${time.getFullYear()}年${time.getMonth()+1}月${time.getDate()}日`
    // );
    return `${time.getFullYear()}年${time.getMonth()+1}月${time.getDate()}日`;
  },
  getTodayFormat() {
    let time = new Date();
    // console.log(
    //   `${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()}`
    // );
    return `${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()}`;
  },

  getDayChinese(time) {   //2020-2-3  => 2020年2月3日
    let date = new Date(time);
    // console.log(
    //   `${time.getFullYear()}年${time.getMonth()+1}月${time.getDate()}日`
    // );
    return `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日`;
  },
  getDayFormat(time) {    //2020-2-3  => 2020-2-3 
    let date = new Date(time);
    // console.log(
    //   `${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()}`
    // );
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
  },

  getBackDay(time) { //time YYYY-MM-DD   String
    let hd = new Date(time);

    hd.setTime(hd.getTime() - 3600 * 1000 * 24);
    // console.log(this.getDayFormat(hd));
    return this.getDayFormat(hd);
  },

  getForwardDay(time) { //time YYYY-MM-DD   String
    let hd = new Date(time);

    hd.setTime(hd.getTime() + 3600 * 1000 * 24);
    // console.log(this.getDayFormat(hd));
    return this.getDayFormat(hd);
  },

  chineseToFormat(date){
      return date.replace("年","-").replace("月","-").replace("日","")
  },
  chineseToDate(chinese){
    return new Date(this.chineseToFormat(chinese));
  }

};

DateManager.getBackDay();

export default DateManager;
